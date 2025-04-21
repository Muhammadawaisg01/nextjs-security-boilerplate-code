"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
const Popup = () => {
  const params = useSearchParams();
  const provider = params.get("provider");
  const { data: session, status } = useSession();

  const handleSignup = async () => {
    const res = await signIn(provider, {
      callbackUrl: `${window.location.origin}/`, // or anything
    });
  };

  return <div>{handleSignup()}</div>;
};

export default Popup;
