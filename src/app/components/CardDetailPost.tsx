import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import "../globals.css";
export default function CardDetailPost({
  title,
  titleContent,
  content,
  createdAt,
  btn,
}: {
  title: string;
  titleContent: string;
  content: string;
  createdAt: string;
  btn: string;
}) {
  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="setbgcard w-11/12 sm:w-10/12 md:w-1/2 h-72 p-3 bg-neutral-950 text-neutral-100">
        <CardHeader>
          <h1 className="font-bold text-3xl">{title}</h1>
        </CardHeader>
        <CardBody>
          <h1 className="text-lg">{titleContent}</h1>
          <p className="text-lg">{content}</p>
          <p className="text-lg">{createdAt}</p>
        </CardBody>
        <CardFooter>
          <Button
            className="bg-neutral-100 font-semibold"
            as={Link}
            href={"/posts"}
          >
            {btn}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
