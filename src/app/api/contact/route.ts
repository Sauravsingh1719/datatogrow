// app/api/contact/route.ts
import dbConnect from "@/lib/dbConnect";
import ContactModel from "@/models/Contact";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  
  try {
    const messages = await ContactModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json({ message: 'Error fetching contact messages' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const { name, email, company, subject, budget, timeline, message } = await req.json();
    
    const contact = new ContactModel({
      name,
      email,
      company,
      subject,
      budget,
      timeline,
      message
    });

    await contact.save();
    
    return NextResponse.json({ 
      message: 'Contact message sent successfully', 
      contact 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating contact message:', error);
    return NextResponse.json({ message: 'Error sending message' }, { status: 500 });
  }
}