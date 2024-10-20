import Layout from "@/app/layout";
import CardTemplate from "@/app/components/CardHomeTemplate";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Home",
  description: "Posts Apps",
  icons: {
    icon: "/images/IconPost.webp",
  },
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <Layout>
      <CardTemplate
        title="Selamat Datang!"
        body="Anda bisa membuat postinganmu di sini."
        enter="Mulai Buat"
        image={session?.user?.image}
      />
    </Layout>
  );
}
