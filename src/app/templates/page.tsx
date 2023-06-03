"use client";
import React, { useEffect, useState } from "react";
import { fetchall } from "@/lib/supabase";

function Templates() {
  const [data, setData] = useState();
  useEffect(() => {
    fetchall(setData);
  }, []);
  console.log(data);
  return <div>Templates</div>;
}

export default Templates;
