import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  otpToken?: string;
  otpExpires?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  otpToken: { type: String },
  otpExpires: { type: Date },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;