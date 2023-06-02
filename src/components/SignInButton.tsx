"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function SignInButton() {
  const { data: session } = useSession();

  if (session && session?.user) {
    return (
      <>
        <div className="flex flex-row">
          <p className="text-4xl font-medium text-gray-900 dark:text-white">
            {session?.user?.name}{" "}
          </p>{" "}
          <button
            onClick={() => signOut()}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
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
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        SignIn
      </button>
    </div>
  );
}

export default SignInButton;
