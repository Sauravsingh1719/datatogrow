import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
  approved: boolean;
}

const TestimonialSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    position: { type: String, required: true },
    company: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    image: { type: String },
    featured: { type: Boolean, default: false },
    approved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const TestimonialModel: Model<ITestimonial> = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
export default TestimonialModel;