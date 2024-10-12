import EditPostComponent from "@/app/components/EditPostComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Posts",
  description: "Posts Apps",
  icons: {
    icon: "/images/IconPost.webp",
  },
};
const EditPost = ({ params }: { params: { id: string } }) => {
  return <EditPostComponent params={params} />;
};

export default EditPost;
