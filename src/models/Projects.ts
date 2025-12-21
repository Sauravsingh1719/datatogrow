import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  results: string[];
  liveLink: string;
  githubLink: string;
  imageUrl: string;
  featured: boolean;
  category: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    shortDescription: { 
      type: String,
      default: ''
    },
    technologies: [{ 
      type: String 
    }],
    results: [{ 
      type: String 
    }],
    liveLink: { 
      type: String,
      default: '#'
    },
    githubLink: { 
      type: String,
      default: '#'
    },
    imageUrl: { 
      type: String,
      default: '/api/placeholder/600/400'
    },
    featured: { 
      type: Boolean, 
      default: false 
    },
    category: {
      type: String,
      enum: ['Dashboard', 'Data Quality', 'Machine Learning', 'Optimization', 'Visualization', 'Analytics'],
      default: 'Analytics'
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { 
    timestamps: true 
  }
);


ProjectSchema.index({ featured: -1, order: 1, createdAt: -1 });

const ProjectModel: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
export default ProjectModel;