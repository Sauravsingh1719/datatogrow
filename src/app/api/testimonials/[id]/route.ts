import dbConnect from "@/lib/dbConnect";
import TestimonialModel from "@/models/Testimonial";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Validation helper
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  try {
    const params = await props.params; // 1. Await params
    const id = params.id;

    // 2. Validate ID format
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid Testimonial ID format' }, { status: 400 });
    }

    const testimonial = await TestimonialModel.findById(id);
    
    if (!testimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ message: 'Error fetching testimonial' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  try {
    const params = await props.params; // 1. Await params
    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid Testimonial ID format' }, { status: 400 });
    }

    const updates = await req.json();
    const testimonial = await TestimonialModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'Testimonial updated successfully', 
      testimonial 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ message: 'Error updating testimonial' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  try {
    const params = await props.params; // 1. Await params
    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid Testimonial ID format' }, { status: 400 });
    }

    const testimonial = await TestimonialModel.findByIdAndDelete(id);
    
    if (!testimonial) {
      return NextResponse.json({ message: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'Testimonial deleted successfully' 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ message: 'Error deleting testimonial' }, { status: 500 });
  }
}