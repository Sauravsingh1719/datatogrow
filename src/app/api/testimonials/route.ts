import dbConnect from "@/lib/dbConnect";
import TestimonialModel from "@/models/Testimonial";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  
  try {
    const testimonials = await TestimonialModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ message: 'Error fetching testimonials' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const { name, position, company, content, rating, featured, approved } = await req.json();
    
    const testimonial = new TestimonialModel({
      name,
      position,
      company,
      content,
      rating,
      featured: featured || false,
      approved: approved || false
    });

    await testimonial.save();
    
    return NextResponse.json({ 
      message: 'Testimonial created successfully', 
      testimonial 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ message: 'Error creating testimonial' }, { status: 500 });
  }
}