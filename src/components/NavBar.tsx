import React from "react";
import SignInButton from "./SignInButton";
import Link from "next/link";

function NavBar() {
  return (
    <>
      <nav>
        <div className="max-w-screen-xl flex  flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <span className="self-center font-extrabold text-5xl text-[#077b79] whitespace-nowrap">
              uiTweak
            </span>
          </Link>

          <ul className="font-medium flex gap-7 flex-row p-4 mt-4 items-center">
            <li>
              <Link
                href="/templates"
                className="block 	 text-xl font-bold	 text-[#7ca8a2] hover:text-[#077b79]"
              >
                Browse
              </Link>
            </li>

            <li>
              <SignInButton />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
