import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const hashedOtp = await bcrypt.hash(otp, 10);
    user.otpToken = hashedOtp;
    user.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Your Admin Login OTP",
      text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
    });

    return NextResponse.json({ success: true, message: "OTP sent to email" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}