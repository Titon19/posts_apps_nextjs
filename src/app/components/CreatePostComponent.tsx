"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@nextui-org/input";
import Layout from "@/app/layout";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const CreatePostComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setErrorMessage("Judul tidak boleh kosong kocak...");
      return;
    }
    if (!content) {
      setErrorMessage(
        "Content harus diisi dan tidak lebih dari 255 karakter..."
      );
      return;
    } else if (content.length > 255) {
      setErrorMessage("Content tidak boleh lebih dari 255 karakter kocak...");
      return;
    }

    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      throw new Error("Gagal membuat postingan...");
    } else {
      router.replace("/posts");
      router.refresh();
    }
  };
  return (
    <Layout>
      <div className="h-screen flex justify-center items-center">
        <Card className="setbgcard w-11/12 sm:w-10/12 md:w-1/2 h-96 p-3 bg-neutral-950 text-neutral-100">
          <CardHeader>
            <h1 className="font-bold text-xl">Create Post</h1>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleForm}>
              <div className="flex flex-col gap-2">
                <Input
                  isRequired
                  isInvalid={!!errorMessage && !title}
                  errorMessage="Judul tidak boleh kosong kocak..."
                  type="text"
                  label="Judul"
                  value={title}
                  variant="bordered"
                  className="bg-neutral-900 text-neutral-100 font-semibold"
                  placeholder="Judul..."
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
                <Textarea
                  isRequired
                  isInvalid={
                    !!errorMessage && (content.length > 255 || !content)
                  }
                  maxLength={255}
                  type="text"
                  label="Konten"
                  value={content}
                  variant="bordered"
                  errorMessage="Karakter konten maks 255 karakter kocak..."
                  placeholder="Maximum 255 karakter..."
                  className="bg-neutral-900 text-neutral-100 font-semibold"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="bg-neutral-100 text-neutral-950 font-semibold"
                  >
                    Create Posts
                  </Button>
                  <Button
                    as={Link}
                    href="/posts"
                    className="bg-neutral-100 text-neutral-950 font-semibold"
                  >
                    Back
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
};

export default CreatePostComponent;
