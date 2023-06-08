import React from "react";
import Image from "next/image";
import Link from "next/link";

function TemplateDetail() {
  return (
    <section className=" bg-white bg-opacity-30 backdrop-filter backdrop-blur-3xl rounded-lg shadow mb-10">
      <Image
        width={400}
        height={400}
        style={{ objectFit: "cover" }}
        alt="hello"
        className="rounded-t-lg w-full"
        src="/homebg1.jpg"
      />
      <section className="flex flex-row justify-between px-5 py-2 ">
        <h1 className="text-xl font-bold text-[#077B79]">LOGIN PAGE</h1>
        <Link
          href={`http://localhost:3000/templates/login/new`}
          className="px-3 py-2 text-sm font-medium text-center text-white bg-[#077B79] rounded-lg hover:bg-[#d3f1e8] focus:ring-4 focus:outline-none focus:ring-[#d3f1e8] "
        >
          Tweak
        </Link>
      </section>
    </section>
  );
}

export default TemplateDetail;
