import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  read: boolean;
  responded: boolean;
}

const ContactSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: false },
    read: { type: Boolean, default: false },
    responded: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const ContactModel: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);
export default ContactModel;