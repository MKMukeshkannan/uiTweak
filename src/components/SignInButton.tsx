"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function SignInButton() {
  const { data: session } = useSession();

  if (session && session?.user) {
    return (
      <>
        <div className="flex flex-row gap-8 items-center">
          <p className="block cursor-default	  text-2xl font-bold	text-[#7ca8a2]">
            Welcome !!
            <Link href="/profile" className="pl-2 hover:text-[#077b79]">
              {session?.user?.name.toUpperCase()}
            </Link>
          </p>
          <button
            onClick={() => signOut()}
            className=" text-[#d3f1e9] bg-[#077b79] focus:ring-4 focus:ring-[#7ca8a2] font-medium rounded-lg text-sm px-5 py-2.5 "
          >
            SignOut
          </button>
        </div>
      </>
    );
  }
  return (
    <div>
      <button
        onClick={() => signIn()}
        className=" text-[#d3f1e9] bg-[#077b79] focus:ring-4 focus:ring-[#7ca8a2] ont-medium rounded-lg text-sm px-5 py-2.5 "
      >
        SignIn
      </button>
    </div>
  );
}

export default SignInButton;
