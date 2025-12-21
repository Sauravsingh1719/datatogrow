import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing in .env");
    await mongoose.connect(process.env.MONGODB_URI);

    const adminEmail = "saurav@s.com";
    const adminPassword = "123456789";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();