import Link from "next/link";
import Delete from "../components/DeletePosts";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Layout from "../layout";
import { Metadata } from "next";
import { Button } from "@nextui-org/button";
import { FaSearch, FaEdit, FaHome } from "react-icons/fa";
import "../globals.css";

export const metadata: Metadata = {
  title: "Posts",
  description: "Data Posts",
  icons: {
    icon: "/images/IconPost.webp",
  },
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch posts:", res.status, res.statusText);
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}

interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
}

const Post = async () => {
  const posts = await getData();

  return (
    <Layout>
      <div className="flex flex-col gap-3 items-center p-4 md:p-8 min-h-screen">
        <div className="w-full flex gap-3 flex-col">
          <div className="flex  items-center gap-2">
            <h1 className="font-bold text-3xl">POSTS</h1>
            <Button
              as={Link}
              href="/posts/create"
              className="bg-neutral-950 text-neutral-100 font-semibold"
            >
              Add Post +
            </Button>
            <Button
              as={Link}
              href="/"
              startContent={<FaHome />}
              className="bg-neutral-950 text-neutral-100 font-semibold"
            >
              Back
            </Button>
          </div>

          {posts.length > 0 ? (
            posts.map((post: Post) => (
              <Card
                key={post.id}
                className="setbgcard w-full p-2 md:p-3 bg-neutral-950 text-neutral-100"
              >
                <CardHeader className="flex justify-between flex-wrap md:flex-nowrap">
                  <h1 className="font-bold text-md md:text-2xl">
                    {post.title}
                  </h1>
                  <p className="text-xs md:text-base">
                    {new Date(post.createdAt).toLocaleDateString("id-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardBody>
                  <p className="text-justify text-xs md:text-base">
                    {post.content}
                  </p>
                </CardBody>
                <CardFooter className="flex gap-2">
                  <Button
                    className="bg-neutral-100 font-semibold"
                    as={Link}
                    href={`/posts/${post.id}`}
                    startContent={<FaSearch />}
                  >
                    Detail
                  </Button>
                  <Button
                    className="bg-neutral-100 font-semibold"
                    as={Link}
                    href={`/posts/${post.id}/edit`}
                    startContent={<FaEdit />}
                  >
                    Edit
                  </Button>
                  <Delete id={post.id} />
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex justify-center items-center h-screen">
              <h1 className="font-bold text-xl">Tidak ada data postingan.</h1>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Post;
