import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { existsSync, mkdirSync } from "fs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    const filename = Date.now() + "_" + file.name.replace(/\s/g, "_");
    
    const uploadDir = path.join(process.cwd(), "public/uploads");

    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    await writeFile(path.join(uploadDir, filename), buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}