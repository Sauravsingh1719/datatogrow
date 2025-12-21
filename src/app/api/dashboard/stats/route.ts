import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import TestimonialModel from "@/models/Testimonial";
import ContactModel from "@/models/Contact";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  
  try {
    const [
      totalBlogs,
      publishedBlogs,
      totalTestimonials,
      approvedTestimonials,
      totalMessages,
      unreadMessages
    ] = await Promise.all([
      BlogModel.countDocuments(),
      BlogModel.countDocuments({ published: true }),
      TestimonialModel.countDocuments(),
      TestimonialModel.countDocuments({ approved: true }),
      ContactModel.countDocuments(),
      ContactModel.countDocuments({ read: false })
    ]);

    const stats = {
      blogs: {
        total: totalBlogs,
        published: publishedBlogs,
        draft: totalBlogs - publishedBlogs
      },
      testimonials: {
        total: totalTestimonials,
        approved: approvedTestimonials,
        pending: totalTestimonials - approvedTestimonials
      },
      messages: {
        total: totalMessages,
        unread: unreadMessages,
        read: totalMessages - unreadMessages
      }
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ message: 'Error fetching dashboard stats' }, { status: 500 });
  }
}