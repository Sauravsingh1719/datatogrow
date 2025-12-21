import dbConnect from "@/lib/dbConnect";
import NewsletterModel from "@/models/NewsLetter";
import BlogModel from "@/models/Blog";
import { NextResponse } from "next/server";
import { resend, EMAIL_FROM } from "@/lib/resend";
import { getBlogNotificationTemplate } from "@/lib/email-templates";

interface INewsletter {
  _id?: string;
  email: string;
  name?: string | null;
  active: boolean;
}

interface IBlog {
  _id?: string;
  title: string;
  excerpt?: string | null;
  description?: string | null;
  slug?: string | null;
  image?: string | null;
  date?: Date | string | null;
  author?: string | null;
  published?: boolean;
}

interface BlogTemplateProps {
  blogTitle: string;
  blogExcerpt?: string | null;
  blogUrl: string;
  blogImage?: string | null;
  blogDate: string;
  authorName: string;
  currentYear: number;
  siteName: string;
  subscriberName?: string;
  unsubscribeUrl?: string;
}

type EmailBatchItem = {
  from: string;
  to: string;
  subject: string;
  html: string;
  headers?: Record<string, string>;
};

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  await dbConnect();

  try {
    const blog = (await BlogModel.findById(id).lean<IBlog>()) as IBlog | null;

    if (!blog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    if (!blog.published) {
      return NextResponse.json(
        { message: "Cannot send newsletter for unpublished blog" },
        { status: 400 }
      );
    }

    const subscribers = (await NewsletterModel.find({ active: true }).lean<INewsletter[]>()) as INewsletter[];

    if (!Array.isArray(subscribers) || subscribers.length === 0) {
      return NextResponse.json({ message: "No active subscribers found" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const blogDateStr = blog.date
      ? new Date(blog.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date().toLocaleDateString("en-US");

    const blogDataBase: Omit<BlogTemplateProps, "subscriberName" | "unsubscribeUrl"> = {
      blogTitle: blog.title,
      blogExcerpt: blog.excerpt ?? blog.description ?? "",
      blogUrl: `${appUrl}/blog/${blog.slug ?? blog._id}`,
      blogImage: blog.image ?? null,
      blogDate: blogDateStr,
      authorName: blog.author ?? "Admin",
      currentYear: new Date().getFullYear(),
      siteName: "Data to Grow",
    };

    const emailBatch: EmailBatchItem[] = subscribers.map((subscriber) => {
      const personalizedData: BlogTemplateProps = {
        ...blogDataBase,
        subscriberName: subscriber.name ?? "there",
        unsubscribeUrl: `${appUrl}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`,
      };

      return {
        from: EMAIL_FROM,
        to: subscriber.email,
        subject: `📢 New Blog Post: ${blog.title}`,
        html: getBlogNotificationTemplate(personalizedData),
        headers: {
          "List-Unsubscribe": `<${personalizedData.unsubscribeUrl}>`,
        },
      };
    });

    const data = await (resend.batch.send as unknown as (payload: EmailBatchItem[]) => Promise<unknown>)(emailBatch);

    return NextResponse.json(
      {
        message: "Newsletter sent successfully",
        sentTo: subscribers.length,
        blogTitle: blog.title,
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return NextResponse.json({ message: "Error sending newsletter" }, { status: 500 });
  }
}
