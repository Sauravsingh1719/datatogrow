import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/models/Contact";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  try {
    const params = await props.params;
    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const contact = await ContactModel.findById(id);
    
    if (!contact) {
      return NextResponse.json({ message: 'Contact message not found' }, { status: 404 });
    }
    
    return NextResponse.json(contact, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching contact message:', error);
    return NextResponse.json({ message: 'Error fetching contact message' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  try {
    const params = await props.params;
    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const updates = await req.json();
    const contact = await ContactModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return NextResponse.json({ message: 'Contact message not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'Contact message updated successfully', 
      contact 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating contact message:', error);
    return NextResponse.json({ message: 'Error updating contact message' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  try {
    const params = await props.params;
    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid ID format' }, { status: 400 });
    }

    const contact = await ContactModel.findByIdAndDelete(id);
    
    if (!contact) {
      return NextResponse.json({ message: 'Contact message not found' }, { status: 404 });
    }
    
    return NextResponse.json({ 
      message: 'Contact message deleted successfully' 
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting contact message:', error);
    return NextResponse.json({ message: 'Error deleting contact message' }, { status: 500 });
  }
}