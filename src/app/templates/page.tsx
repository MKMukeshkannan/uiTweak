"use client";
import React, { useEffect, useState } from "react";
import { fetchall } from "@/lib/supabase";
import NavBar from "@/components/NavBar";

function Templates() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchall(setData);
  }, []);
  console.log(data);
  return (
    <>
      <NavBar />
      <div>Templates</div>
    </>
  );
}

export default Templates;
