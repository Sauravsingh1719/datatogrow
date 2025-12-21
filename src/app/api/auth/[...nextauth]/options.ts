import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        otp: { label: 'OTP', type: 'text' }
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password || !credentials?.otp) {
          throw new Error('Missing credentials');
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error('User not found');

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error('Invalid Password');

        if (!user.otpToken || !user.otpExpires) throw new Error('OTP not generated');
        
        const isOtpExpired = new Date() > user.otpExpires;
        if (isOtpExpired) throw new Error('OTP Expired');

        const isOtpValid = await bcrypt.compare(credentials.otp, user.otpToken);
        if (!isOtpValid) throw new Error('Invalid OTP');

        user.otpToken = undefined;
        user.otpExpires = undefined;
        await user.save();

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  pages: {
    signIn: '/admin/signin',
  }
};