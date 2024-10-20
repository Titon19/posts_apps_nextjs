"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Delete from "../components/DeletePosts";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Layout from "../layout";
import { Button } from "@nextui-org/button";
import { FaSearch, FaEdit, FaHome } from "react-icons/fa";
import "../globals.css";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const PostsClient = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Terjadi kesalahan yang tidak diketahui");
        }
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-3 items-center p-4 md:p-8 min-h-screen">
        <div className="w-full flex gap-3 flex-col">
          <div className="flex items-center gap-2">
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
            posts.map((post) => (
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
                  <Delete id={parseInt(post.id)} />
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

export default PostsClient;
