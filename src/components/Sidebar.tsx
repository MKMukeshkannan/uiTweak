import Link from "next/link";
import React from "react";

function Sidebar() {
  return (
    <section className="max-md:hidden sticky top-5 bg-white bg-opacity-75 backdrop-filter backdrop-blur-3xl rounded-lg shadow mb-10 h-fit md:w-1/4">
      <h1 className="text-md text-[#077B79] font-extrabold my-3 mx-3 lg:text-xl xl:text-3xl 2xl:text-6xl 2xl:pt-8">
        SELECT CATEGORY
      </h1>
      <ul className="text-sm text-[#85A7A1] font-bold mx-8 pb-5 lg:text-lg xl:text-xl 2xl:text-4xl">
        <li className="hover:text-[#077b79]">
          <Link href="#">LOGIN</Link>
        </li>
        <li className="hover:text-[#077b79]">
          <Link href="#">SIGNUP</Link>
        </li>
        <li className="hover:text-[#077b79]">
          <Link href="#">HERO PAGE</Link>
        </li>
        <li className="hover:text-[#077b79]">
          <Link href="#">CONTACT US</Link>
        </li>
      </ul>
    </section>
  );
}

export default Sidebar;
