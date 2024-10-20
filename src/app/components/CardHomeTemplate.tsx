import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { FaGithub } from "react-icons/fa";
import { Chip } from "@nextui-org/chip";
import "../globals.css";
import Image from "next/image";
import LoginButton from "./LoginButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
export default async function CardTemplate({
  title,
  body,
  enter,
  image,
}: {
  title: string;
  body: string;
  enter: string;
  image: string | null | undefined;
}) {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex h-screen justify-center items-center flex-col gap-2">
      <Card className="setbgcard w-11/12 sm:w-10/12 md:w-1/2 h-auto p-3 bg-neutral-950 text-neutral-100">
        <div className="w-full flex lg:justify-between justify-end items-center p-2">
          <Chip className=" bg-neutral-100 font-semibold text-neutral-950 hidden lg:flex">
            © {new Date().getFullYear()} Titon Meisya Kresna. All rights
            reserved.
          </Chip>
          <Button
            endContent={<FaGithub />}
            variant="bordered"
            className="bg-neutral-800 font-semibold text-neutral-100"
          >
            <Link href={"https://github.com/Titon19"} target="_blank">
              Github - titon19
            </Link>
          </Button>
        </div>
        <CardHeader>
          <h1 className="font-bold text-3xl">{title}</h1>
        </CardHeader>
        <CardBody>
          <p className="text-lg">{body}</p>
        </CardBody>
        <CardFooter className="flex gap-2 items-start">
          {session ? (
            <Button
              as={Link}
              href={"/posts"}
              className="bg-neutral-100 font-semibold"
            >
              {enter}
            </Button>
          ) : null}
          <LoginButton />
          <Image
            src={image || ""}
            alt="IconProfile"
            width={40}
            height={40}
            className={`${image ? "rounded-full" : "hidden"}`}
          />
        </CardFooter>
      </Card>
      <Chip className="bg-neutral-950 font-semibold text-neutral-100 flex lg:hidden">
        © {new Date().getFullYear()} Titon Meisya Kresna. All rights reserved.
      </Chip>
    </div>
  );
}
