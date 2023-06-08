"use client";
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import TemplateBanner from "@/components/TemplateBanner";
import TemplateDetail from "@/components/TemplateDetail";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";

function Templates() {
  const { data: session } = useSession();
  return (
    <>
      <NavBar />
      <main className="mx-8">
        <TemplateBanner name={session?.user.name} />
        <h1 className="text-2xl text-[#077B79] font-bold my-5 md:text-4xl 2xl:text-8xl 2xl:py-8">
          TEMPLATES TO TWEAK
        </h1>
        <section className="flex flex-row gap-5">
          <Sidebar />
          <section className="flex flex-col w-full md:w-3/4">
            <TemplateDetail />
            <TemplateDetail />
            <TemplateDetail />
          </section>
        </section>
      </main>
    </>
  );
}

export default Templates;
