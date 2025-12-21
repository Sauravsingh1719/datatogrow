import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import NewsletterModel from "@/models/NewsLetter";
import { getNewsletterStats } from "@/lib/email-utils";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { getNewsletterWelcomeTemplate, getNewsletterAdminTemplate } from "@/lib/email-templates";

export async function POST(req: Request) {
  await dbConnect();

  try {
    const { email, name = "" } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Please provide a valid email address" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase();
    const existingSubscriber = await NewsletterModel.findOne({ email: normalizedEmail });

    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return NextResponse.json({ message: "You are already subscribed to our newsletter" }, { status: 409 });
      } else {
        existingSubscriber.active = true;
        await existingSubscriber.save();
        
        await sendNewsletterEmails(normalizedEmail, name || normalizedEmail.split("@")[0], true);
        
        return NextResponse.json({ 
          message: "Welcome back! You have been resubscribed.", 
          subscriber: existingSubscriber 
        }, { status: 200 });
      }
    }

    const subscriber = new NewsletterModel({
      email: normalizedEmail,
      name: name || undefined,
    });
    await subscriber.save();

    await sendNewsletterEmails(normalizedEmail, name || normalizedEmail.split("@")[0]);

    return NextResponse.json({ 
      message: "Successfully subscribed to the newsletter!", 
      subscriber 
    }, { status: 201 });

  } catch (error: any) {
    console.error("Error subscribing to newsletter:", error);
    if (error.code === 11000) {
      return NextResponse.json({ message: "You are already subscribed to our newsletter" }, { status: 409 });
    }
    return NextResponse.json({ message: "Error subscribing to newsletter" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  try {
    const subscribers = await NewsletterModel.find({ active: true })
      .sort({ subscribedAt: -1 })
      .select("-__v");

    return NextResponse.json({ count: subscribers.length, subscribers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching newsletter subscribers:", error);
    return NextResponse.json({ message: "Error fetching subscribers" }, { status: 500 });
  }
}

async function sendNewsletterEmails(email: string, name: string, isWelcomeBack = false) {
  try {
    const currentYear = new Date().getFullYear();
    const referenceId = `NL-${Date.now().toString().slice(-8)}`;
    
    const unsubscribeLink = `${process.env.NEXT_PUBLIC_APP_URL}/unsubscribe?email=${encodeURIComponent(email)}&token=${referenceId}`;

    const stats = await getNewsletterStats();

    const emailData = {
      name,
      email,
      referenceId,
      unsubscribeLink,
      currentYear,
      activeSubscribers: stats.activeSubscribers,
      totalSubscribers: stats.totalSubscribers,
      growthRate: stats.growthRate,
    };

    const subject = isWelcomeBack
      ? `Welcome back to DataToGrow, ${name}!`
      : `Welcome to DataToGrow, ${name}!`;

    await Promise.all([
      resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: subject,
        html: getNewsletterWelcomeTemplate(emailData),
        headers: {
          'List-Unsubscribe': `<${unsubscribeLink}>`,
        },
      }),

      process.env.ADMIN_EMAIL ? resend.emails.send({
        from: EMAIL_FROM,
        to: process.env.ADMIN_EMAIL,
        subject: `📬 New Newsletter Subscriber: ${name || email}`,
        html: getNewsletterAdminTemplate(emailData),
      }) : Promise.resolve()
    ]);

    console.log(`Newsletter emails sent for ${email}`);
  } catch (error) {
    console.error("Error sending newsletter emails:", error);
  }
}

export async function DELETE(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Subscriber ID is required" }, { status: 400 });
    }

    const deletedSubscriber = await NewsletterModel.findByIdAndDelete(id);

    if (!deletedSubscriber) {
      return NextResponse.json({ message: "Subscriber not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Subscriber deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return NextResponse.json({ message: "Error deleting subscriber" }, { status: 500 });
  }
}