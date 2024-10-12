import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create data
export async function POST(request: Request) {
  const { title, content } = await request.json();
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating post", Errornya: error },
      { status: 500 }
    );
  }
}

// Tampilkan semua data
export async function GET() {
  try {
    const posts = await prisma.post.findMany();

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching posts", Errornya: error },
      { status: 500 }
    );
  }
}
