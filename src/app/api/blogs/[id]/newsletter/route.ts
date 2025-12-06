import dbConnect from "@/lib/dbConnect";
import NewsletterModel from "@/models/NewsLetter";
import BlogModel from "@/models/Blog";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  await dbConnect();

  try {    
    const blog = await BlogModel.findById(id);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    if (!blog.published) {
      return NextResponse.json(
        { message: "Cannot send newsletter for unpublished blog" },
        { status: 400 }
      );
    }

    const subscribers = await NewsletterModel.find({ active: true });
    
    if (subscribers.length === 0) {
      return NextResponse.json(
        { message: "No active subscribers found" },
        { status: 400 }
      );
    }

    const result = await sendNewsletterEmail(blog, subscribers);

    return NextResponse.json({
      message: "Newsletter sent successfully",
      sentTo: subscribers.length,
      blogTitle: blog.title
    }, { status: 200 });

  } catch (error) {
    console.error("Error sending newsletter:", error);
    return NextResponse.json(
      { message: "Error sending newsletter" },
      { status: 500 }
    );
  }
}

async function sendNewsletterEmail(blog: any, subscribers: any[]) {
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

    const templatePath = path.join(process.cwd(), "emails", "blog-notification.html");
    const templateSource = fs.readFileSync(templatePath, "utf8");
    const template = Handlebars.compile(templateSource);

    const templateData = {
      blogTitle: blog.title,
      blogExcerpt: blog.excerpt || blog.description,
      blogUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/blog/${blog.slug || blog._id}`,
      blogImage: blog.image || null,
      blogDate: new Date(blog.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      authorName: blog.author || "Admin",
      currentYear: new Date().getFullYear(),
      unsubscribeUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/unsubscribe`,
      siteName: "Data to Grow"
    };

    const emailPromises = subscribers.map(async (subscriber) => {
      const personalizedData = {
        ...templateData,
        subscriberName: subscriber.name || "there",
        subscriberEmail: subscriber.email
      };

      const htmlContent = template(personalizedData);

      return transporter.sendMail({
        from: `"Data to Grow" <${process.env.EMAIL_USER}>`,
        to: subscriber.email,
        subject: `📢 New Blog Post: ${blog.title}`,
        html: htmlContent,
        text: `Hello ${personalizedData.subscriberName},\n\nNew Blog Post: ${blog.title}\n\n${blog.excerpt}\n\nRead more: ${templateData.blogUrl}\n\nBest regards,\n${templateData.siteName}\n\nUnsubscribe: ${templateData.unsubscribeUrl}`
      });
    });

    await Promise.all(emailPromises);

    return {
      success: true,
      count: subscribers.length
    };

  } catch (error) {
    console.error("Error in sendNewsletterEmail:", error);
    throw error;
  }
}