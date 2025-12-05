import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/Projects";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  await dbConnect();
  
  try {
    const { searchParams } = new URL(req.url);
    const featured = searchParams.get('featured');
    const category = searchParams.get('category');
    
    let query = {};
    
    if (featured === 'true') {
      query = { ...query, featured: true };
    }
    
    if (category) {
      query = { ...query, category };
    }

    const projects = await ProjectModel.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 });
    
    return NextResponse.json(projects, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ message: 'Error fetching projects' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  
  try {
    const data = await req.json();
    
    const project = new ProjectModel({
      ...data,
      order: data.order || 0,
      featured: data.featured || false,
      category: data.category || 'Analytics'
    });

    await project.save();
    
    return NextResponse.json({ 
      message: 'Project created successfully', 
      project 
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating project:', error);
    return NextResponse.json({ message: 'Error creating project' }, { status: 500 });
  }
}