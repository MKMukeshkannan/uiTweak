import NavBar from "@/components/NavBar";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavBar />

      <main className="flex relative mx-auto max-w-screen-xl text-center pb-32 h-[calc(100vh_-_120px)] justify-center items-center">
        <Image
          src="/homebg1.jpg"
          width={400}
          height={400}
          alt="templateSample"
          style={{
            borderRadius: "10px",
            border: "1px solid #000",
          }}
          className="absolute top-20 right-[-20px] rotate-[30deg] border drop-shadow-xl	 border-solid"
        />
        <Image
          src="/homebg6.png"
          width={400}
          height={400}
          alt="templateSample2"
          style={{
            borderRadius: "10px",
            border: "1px solid #000",
          }}
          className="absolute top-64 left-[-100px] rotate-[-25deg]	 drop-shadow-xl	"
        />
        <Image
          src="/homebg7.png"
          width={500}
          height={500}
          alt="templateSample2"
          fill={false} // {true} | {false}
          className="absolute bottom-0  drop-shadow-2xl	 right-10"
        />

        <section className="flex flex-col justify-center items-center h-fit	 w-full py-6 mx-28  bg-white rounded-xl bg-opacity-30 backdrop-filter backdrop-blur-3xl">
          <h1 className="text-7xl font-extrabold leading-none  tracking-wide text-[#077B79]">
            DESIGN. TWEAK. WOW.
          </h1>
          <p className="text-[#7CA8A1] text-xl px-28 mt-5">
            A powerful design tool that provides a wide range of customisable
            templates and tools to effortlessly create stunning webpages.
          </p>
          <Link
            href="/templates"
            className=" text-[#d3f1e9] bg-[#077b79] focus:ring-4 focus:ring-[#7ca8a2] font-medium rounded-lg text-m px-24 py-2.5 mt-10"
          >
            Explore More
          </Link>
        </section>
      </main>
    </>
  );
}
