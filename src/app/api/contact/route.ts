import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/models/Contact";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export async function GET() {
  await dbConnect();

  try {
    const messages = await ContactModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { message: "Error fetching contact messages" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, email, company, subject, budget, timeline, message } =
      await req.json();

    const contact = new ContactModel({
      name,
      email,
      company: company || "",
      subject: subject || "",
      budget: budget || "",
      timeline: timeline || "",
      message: message || "",
    });

    await contact.save();

    await sendEmails(
      { name, email, company, subject, budget, timeline, message },
      contact._id.toString()
    );

    return NextResponse.json(
      { message: "Contact message sent successfully", contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json(
      { message: "Error sending message" },
      { status: 500 }
    );
  }
}

async function sendEmails(data: any, contactId: string) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT || 587),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const templateData = {
      ...data,
      submissionDate: new Date().toLocaleString(),
      referenceId: contactId.slice(-8).toUpperCase(),
      currentYear: new Date().getFullYear(),
    };

    const adminHtml = await compileTemplate(
      "admin-contact.html",
      templateData
    );

    await transporter.sendMail({
      from: `"DataToGrow Analytics" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      subject: `New Project Inquiry: ${data.subject || "New Contact"}`,
      html: adminHtml,
    });

    const userHtml = await compileTemplate(
      "user-thankyou.html",
      templateData
    );

    await transporter.sendMail({
      from: `"Vikram - DataToGrow" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `Thank you for your inquiry, ${data.name}!`,
      html: userHtml,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
  }
}

async function compileTemplate(templateName: string, data: any): Promise<string> {
  const templatePath = path.join(process.cwd(), "emails", templateName);
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = Handlebars.compile(templateSource);
  return template(data);
}
