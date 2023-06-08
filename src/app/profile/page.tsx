"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileDetails from "@/components/ProfileDetails";
import ProfileSaved from "@/components/ProfileSaved";
import NavBar from "@/components/NavBar";

interface Template {
  id: string;
  templatename: string;
  imgurl: string;
  style: {};
}

function page() {
  const { data: session } = useSession();
  const token = session?.user.accesstoken;
  const [template, setTemplate] = useState<Template[]>([]);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(token);
    async function fetchTemplate() {
      const res = await fetch("http://localhost:3000/api/savetemplates", {
        method: "GET",
        headers: {
          authorization: `bearer ${token}`,
        },
      });

      const jsonResponse = await res.json();
      if (res.status === 401) {
        router.push("/auth/login");

        return;
      }
      if (!res.ok) {
        setError(true);
      }
      if (Array.isArray(jsonResponse)) {
        setTemplate(jsonResponse);
      }
    }

    if (session?.user.accesstoken) fetchTemplate();
  }, [session?.user.accesstoken]);

  return (
    <>
      <NavBar />

      <section className="px-20">
        <ProfileDetails name={session?.user.name ? session?.user.name : ""} />
      </section>
      <h1 className="text-4xl lg:text-5xl font-bold leading-none tracking-tight max-w-screen-xl mx-auto mb-12 text-[#077B79] max-lg:mx-20">
        YOUR SAVED FILES
      </h1>
      <main className="px-20 mb-20 flex flex-row flex-wrap gap-5 justify-center">
        {template.length === 0 && (
          <>
            <div className="flex flex-col justify-center align-middle border border-solid border-black rounded-lg	 py-48 w-full">
              {error ? (
                <h1 className="text-[#7CA8A1] text-2xl mx-auto">
                  COULDN'T REACH THE SERVER
                </h1>
              ) : (
                <>
                  <h1 className="text-[#7CA8A1] text-2xl mx-auto">
                    NO SAVES YET{" "}
                  </h1>
                  <h1 className="text-[#7CA8A1] text-2xl mx-auto mt-5">
                    Wanna Browse ?{" "}
                    <button
                      type="button"
                      className="text-white bg-[#077B79] w-48 font-medium rounded-lg text-sm px-2 py-2.5 "
                    >
                      Look at your saved tweaks
                    </button>
                  </h1>
                </>
              )}
            </div>
          </>
        )}
        {template.map((val) => (
          <ProfileSaved
            key={val.id}
            base="login"
            id={val.id}
            title={val.templatename}
            image={val.imgurl}
            style={val.style}
          />
        ))}
      </main>
    </>
  );
}

export default page;
