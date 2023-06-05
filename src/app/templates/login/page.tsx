"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Redirect() {
  const router = useRouter();
  router.push("/templates/login/new");

  return <div>Redirecting . . .</div>;
}

export default Redirect;
