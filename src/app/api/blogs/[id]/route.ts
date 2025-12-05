  import dbConnect from "@/lib/dbConnect";
  import BlogModel from "@/models/Blog";
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

      console.log("Fetching blog with ID:", id);

      if (!isValidObjectId(id)) {
        console.log("Invalid Object ID format");
        return NextResponse.json({ message: 'Invalid Blog ID format' }, { status: 400 });
      }

      const blog = await BlogModel.findById(id);

      if (!blog) {
        console.log("Blog not found in DB");
        return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
      }

      return NextResponse.json(blog, { status: 200 });

    } catch (error: any) {
      console.error('SERVER ERROR fetching blog:', error);
      return NextResponse.json({ message: 'Error fetching blog' }, { status: 500 });
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
      const blog = await BlogModel.findByIdAndUpdate(
        id,
        updates,
        { new: true, runValidators: true }
      );

      if (!blog) {
        return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
      }

      return NextResponse.json({
        message: 'Blog updated successfully',
        blog
      }, { status: 200 });
    } catch (error: any) {
      console.error('Error updating blog:', error);
      return NextResponse.json({ message: 'Error updating blog' }, { status: 500 });
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

      const blog = await BlogModel.findByIdAndDelete(id);

      if (!blog) {
        return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
      }

      return NextResponse.json({
        message: 'Blog deleted successfully'
      }, { status: 200 });
    } catch (error: any) {
      console.error('Error deleting blog:', error);
      return NextResponse.json({ message: 'Error deleting blog' }, { status: 500 });
    }
  }