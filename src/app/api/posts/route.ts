import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";
const prisma = new PrismaClient();

// Create data
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, content } = await request.json();
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { email: session.user.email as string } },
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

// Tampilkan semua data berdasarkan email
export async function GET() {
  console.log("GET request diterima di /api/posts");
  const headersList = headers();
  console.log(
    "Headers:",
    JSON.stringify(Object.fromEntries(headersList), null, 2)
  );
  try {
    const session = await getServerSession(authOptions);
    console.log("Session lengkap:", JSON.stringify(session, null, 2));

    if (!session) {
      console.log("Tidak ada sesi");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user) {
      console.log("Sesi tidak memiliki informasi pengguna");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!session.user.email) {
      console.log("Sesi pengguna tidak memiliki email");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("Email pengguna:", session.user.email);

    const posts = await prisma.post.findMany({
      where: {
        author: {
          email: session.user.email,
        },
      },
    });

    console.log("Posts ditemukan:", posts.length);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error di GET /api/posts:", error);
    return NextResponse.json(
      { error: "Error fetching posts" },
      { status: 500 }
    );
  }
}
