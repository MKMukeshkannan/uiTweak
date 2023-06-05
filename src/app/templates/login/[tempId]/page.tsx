"use client";
import { useSession } from "next-auth/react";
import React, { use, useEffect, useState } from "react";

function Page() {
  const { data: session } = useSession();
  const token = session?.user.accesstoken;
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchTemplate() {
      const res = await fetch(
        "http://localhost:3000/api/savetemplates/d6aa11b8-3a2a-4438-8c42-304850fb5946",
        {
          method: "GET",
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );

      const jsonResponse = await res.json();
      setData(jsonResponse);
    }

    if (session?.user.accesstoken) fetchTemplate();
  }, [session?.user.accesstoken]);

  console.log(data);
  return <h1>hello</h1>;
}

export default Page;
