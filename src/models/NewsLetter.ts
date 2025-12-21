import mongoose, { Document, Model, Schema } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  subscribedAt: Date;
  active: boolean;
}

const NewsletterSchema: Schema = new Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
    subscribedAt: { 
      type: Date, 
      default: Date.now 
    },
    active: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);
;
NewsletterSchema.index({ active: 1 });
NewsletterSchema.index({ subscribedAt: -1 });

const NewsletterModel: Model<INewsletter> = mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);
export default NewsletterModel;