import CreatePostComponent from "@/app/components/CreatePostComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Posts",
  description: "Posts Apps",
  icons: {
    icon: "/images/IconPost.webp",
  },
};
const CreatePost = () => {
  return <CreatePostComponent />;
};

export default CreatePost;
