import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  company: string;
  subject: string;
  budget: string;
  timeline: string;
  message: string;
  read: boolean;
  responded: boolean;
}

const ContactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String, default: '' },
    subject: { type: String, required: true },
    budget: { type: String, default: '' },
    timeline: { type: String, default: '' },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    responded: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const ContactModel: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
export default ContactModel;