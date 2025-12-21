import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/models/Contact";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { getContactAdminTemplate, getContactUserTemplate } from "@/lib/email-templates";

export async function GET() {
  await dbConnect();
  try {
    const messages = await ContactModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json({ message: "Error fetching contact messages" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, email, message } = await req.json();

    const contact = new ContactModel({
      name,
      email,
      message: message || "",
    });
    await contact.save();

    const emailData = {
      name,
      email,
      message,
      referenceId: contact._id.toString().slice(-8).toUpperCase(),
      submissionDate: new Date().toLocaleString(),
    };

    await Promise.all([
      resend.emails.send({
        from: EMAIL_FROM,
        to: process.env.ADMIN_EMAIL || 'vikram1840@gmail.com',
        subject: `New Project Inquiry: ${name}`,
        html: getContactAdminTemplate(emailData),
        reply_to: email,
      }),

      resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: `Thank you for your inquiry, ${name}!`,
        html: getContactUserTemplate(emailData),
      })
    ]);

    return NextResponse.json(
      { message: "Contact message sent successfully", contact },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating contact message:", error);
    return NextResponse.json({ message: "Error sending message" }, { status: 500 });
  }
}