import Layout from "@/app/layout";
import CardTemplate from "@/app/components/CardDetailPost";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Detail Posts",
  description: "Posts Apps",
  icons: {
    icon: "/images/IconPost.webp",
  },
};
async function getDetailPost(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const ShowPost = async ({ params }: { params: { id: string } }) => {
  try {
    const data = await getDetailPost(params.id);
    const { title, content, createdAt } = data;

    return (
      <Layout>
        <CardTemplate
          title="Detail Data Postingan"
          titleContent={title}
          content={content}
          createdAt={new Date(createdAt).toLocaleDateString("id-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          btn={"Kembali"}
        />
      </Layout>
    );
  } catch (error) {
    return console.log("Error Showing Data", error);
  }
};

export default ShowPost;
