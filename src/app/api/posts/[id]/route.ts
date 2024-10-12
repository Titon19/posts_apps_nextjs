import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import { NextResponse } from "next/server";

interface Params {
  params: {
    id: string;
  };
}
// Tampilkan data berdasarkan id
export async function GET(request: Request, { params }: Params) {
  const { id } = params;
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (post && Object.keys(post).length > 0) {
    return NextResponse.json(post);
  } else {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
}

// Update data
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const { title, content } = await request.json();
    const updatePost = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    return NextResponse.json(updatePost, { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// Delete data berdasarkan id
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const deletePost = await prisma.post.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletePost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ Error: error }, { status: 500 });
  }
}
