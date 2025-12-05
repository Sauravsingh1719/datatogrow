import { config } from 'dotenv';


config({ path: '.env' });


config();

const staticProjects = [
  {
    title: 'E-commerce Sales Dashboard',
    description: 'Real-time sales analytics dashboard that increased conversion rate by 28% through actionable insights.',
    technologies: ['Tableau', 'Python', 'SQL', 'AWS'],
    results: ['28% increase in conversion', '15% reduction in cart abandonment', 'Real-time inventory tracking'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
    category: 'Dashboard',
    order: 1
  },
  {
    title: 'Customer Churn Prediction',
    description: 'Machine learning model that predicts customer churn with 94% accuracy, saving $2M annually.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'Flask'],
    results: ['94% prediction accuracy', '$2M annual savings', '30% improvement in retention'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
    category: 'Machine Learning',
    order: 2
  },
  {
    title: 'Supply Chain Optimization',
    description: 'Data-driven optimization model that reduced logistics costs by 22% and improved delivery times.',
    technologies: ['R', 'Power BI', 'Azure', 'SQL Server'],
    results: ['22% cost reduction', '18% faster delivery', '99.8% on-time rate'],
    liveLink: '#',
    githubLink: '#',
    featured: true,
    category: 'Optimization',
    order: 3
  }
];

async function seedProjects() {
  try {
    
    const { default: dbConnect } = await import("@/lib/dbConnect");
    const { default: ProjectModel } = await import("@/models/Projects");

    console.log('Connecting to database...');
    await dbConnect();
    console.log('Connected to database.');
    
    console.log('Clearing existing projects...');
    await ProjectModel.deleteMany({});
    
    console.log('Seeding new projects...');
    await ProjectModel.insertMany(staticProjects);
    
    console.log('Projects seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();