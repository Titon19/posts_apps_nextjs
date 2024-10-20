import { Metadata } from "next";
import PostsClient from "./PostsClient";

export const metadata: Metadata = {
  title: "Posts",
  description: "Data Posts",
  icons: {
    icon: "/images/IconPost.webp",
  },
};

export default async function PostsPage() {
  return <PostsClient />;
}
