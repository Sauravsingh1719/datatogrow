import dbConnect from "@/lib/dbConnect";
import ProjectModel from "@/models/Projects";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export async function GET(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const params = await props.params;
    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid Project ID' }, { status: 400 });
    }

    const project = await ProjectModel.findById(id);

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching project:', error);
    return NextResponse.json({ message: 'Error fetching project' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const params = await props.params;
    const id = params.id;
    
    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const updates = await req.json();
    const project = await ProjectModel.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Project updated successfully',
      project
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating project:', error);
    return NextResponse.json({ message: 'Error updating project' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  try {
    const params = await props.params;
    const id = params.id;

    if (!isValidObjectId(id)) {
      return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
    }

    const project = await ProjectModel.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Project deleted successfully'
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ message: 'Error deleting project' }, { status: 500 });
  }
}