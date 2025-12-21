import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { resend, EMAIL_FROM } from '@/lib/resend';
import { getOtpTemplate } from '@/lib/email-templates';

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

    await resend.emails.send({
      from: EMAIL_FROM,
      to: user.email,
      subject: "Your Admin Login OTP",
      html: getOtpTemplate(otp),
    });

    return NextResponse.json({ success: true, message: "OTP sent to email" });

  } catch (error) {
    console.error("OTP Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}