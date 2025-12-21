
import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  
  try {
    const blogs = await BlogModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ message: 'Error fetching blogs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const { title, excerpt, content, category, tags, readTime, featured, published } = await req.json();
    
    const blog = new BlogModel({
      title,
      excerpt,
      content,
      category,
      tags,
      readTime,
      featured: featured || false,
      published: published || false,
      date: new Date().toISOString().split('T')[0],
      author: 'Vikram'
    });

    await blog.save();
    
    return NextResponse.json({ 
      message: 'Blog created successfully', 
      blog 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ message: 'Error creating blog' }, { status: 500 });
  }
}