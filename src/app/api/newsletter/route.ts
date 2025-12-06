import dbConnect from "@/lib/dbConnect";
import NewsletterModel from "@/models/NewsLetter";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { compileTemplate, getNewsletterStats } from "@/lib/email-utils";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, name = "" } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase();

    const existingSubscriber = await NewsletterModel.findOne({
      email: normalizedEmail,
    });

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return NextResponse.json(
          { message: "You are already subscribed to our newsletter" },
          { status: 409 }
        );
      } else {
        existingSubscriber.active = true;
        await existingSubscriber.save();

        await sendNewsletterEmails(
          normalizedEmail,
          name || normalizedEmail.split("@")[0],
          true
        );

        return NextResponse.json(
          {
            message:
              "Welcome back! You have been resubscribed to our newsletter",
            subscriber: existingSubscriber,
          },
          { status: 200 }
        );
      }
    }

    const subscriber = new NewsletterModel({
      email: normalizedEmail,
      name: name || undefined,
    });

    await subscriber.save();

    await sendNewsletterEmails(
      normalizedEmail,
      name || normalizedEmail.split("@")[0],
    );

    return NextResponse.json(
      {
        message: "Successfully subscribed to the newsletter!",
        subscriber,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error);

    if (error.code === 11000) {
      return NextResponse.json(
        { message: "You are already subscribed to our newsletter" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Error subscribing to newsletter" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const subscribers = await NewsletterModel.find({ active: true })
      .sort({ subscribedAt: -1 })
      .select("-__v");

    return NextResponse.json(
      {
        count: subscribers.length,
        subscribers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json(
      { message: "Error fetching subscribers" },
      { status: 500 }
    );
  }
}

async function sendNewsletterEmails(
  email: string,
  name: string,
  isWelcomeBack = false
) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: process.env.EMAIL_SECURE === "true",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const currentYear = new Date().getFullYear();
    const referenceId = `NL-${Date.now().toString().slice(-8)}`;
    const unsubscribeLink = `https:
      email
    )}&token=${referenceId}`;

    const stats = await getNewsletterStats();

    const userTemplateData = {
      name,
      email,
      referenceId,
      unsubscribeLink,
      currentYear,
    };

    const subject = isWelcomeBack
      ? `Welcome back to DataToGrow, ${name}!`
      : `Welcome to DataToGrow, ${name}!`;

    const userHtml = await compileTemplate(
      "newsletter-welcome",
      userTemplateData
    );

    await transporter.sendMail({
      from: `"Vikram - DataToGrow" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: userHtml,
    });

    const adminTemplateData = {
      email,
      name,
      joinedDate: new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      currentDate: new Date().toLocaleDateString(),
      totalSubscribers: stats.totalSubscribers,
      activeSubscribers: stats.activeSubscribers,
      thisMonthSubscribers: stats.thisMonthSubscribers,
      growthRate: stats.growthRate,
    };

    const adminHtml = await compileTemplate(
      "newsletter-admin",
      adminTemplateData
    );

    if (process.env.ADMIN_EMAIL) {
      await transporter.sendMail({
        from: `"DataToGrow Newsletter System" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `📬 New Newsletter Subscriber: ${name || email}`,
        html: adminHtml,
        text: `New subscriber: ${email})`,
      });
    }

    console.log(`Newsletter emails sent for ${email}`);
  } catch (error) {
    console.error("Error sending newsletter emails:", error);
  }
}
