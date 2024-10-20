"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";

const LoginButton = () => {
  const { data: session } = useSession();

  const labelButton = session ? "Sign out" : "Sign in";
  const handleClick = () => {
    if (session) {
      signOut();
    } else {
      signIn();
    }
  };

  return (
    <Button onClick={handleClick} className="bg-neutral-100 font-semibold">
      {labelButton}
    </Button>
  );
};

export default LoginButton;
