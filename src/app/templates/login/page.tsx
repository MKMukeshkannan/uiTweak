"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

function Redirect() {
  const router = useRouter();
  useEffect(() => {
    router.push("/templates/login/new");
  }, []);

  return <div>Redirecting . . .</div>;
}

export default Redirect;
