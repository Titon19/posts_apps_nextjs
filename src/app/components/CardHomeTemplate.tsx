import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { FaGithub } from "react-icons/fa";
import { Chip } from "@nextui-org/chip";
import "../globals.css";
export default function CardTemplate({
  title,
  body,
  foot,
}: {
  title: string;
  body: string;
  foot: string;
}) {
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
        <CardFooter className="flex flex-col gap-2 items-start">
          <Button
            as={Link}
            href={"/posts"}
            className="bg-neutral-100 font-semibold"
          >
            {foot}
          </Button>
        </CardFooter>
      </Card>
      <Chip className="bg-neutral-950 font-semibold text-neutral-100 flex lg:hidden">
        © {new Date().getFullYear()} Titon Meisya Kresna. All rights reserved.
      </Chip>
    </div>
  );
}
