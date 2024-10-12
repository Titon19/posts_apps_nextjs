import Layout from "@/app/layout";
import CardTemplate from "@/app/components/CardHomeTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Posts Apps",
  icons: {
    icon: "/images/IconPost.webp",
  },
};
export default function Home() {
  return (
    <Layout>
      <CardTemplate
        title="Selamat Datang!"
        body="Anda bisa membuat postinganmu di sini."
        foot="Mulai Buat"
      />
    </Layout>
  );
}
