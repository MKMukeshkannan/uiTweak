import React from "react";

interface Props {
  name: string | null | undefined;
}

function TemplateBanner({ name }: Props) {
  return (
    <>
      <section className="flex flex-col justify-center items-center min-w-xl py-8  bg-white bg-opacity-30 backdrop-filter backdrop-blur-3xl shadow-xl md:py-24">
        <span className="block text-[#077B79] font-light text-lg px-auto mb-0 md:hidden">
          HELLO!!
        </span>
        <h1 className=" text-[#077B79] font-extrabold text-5xl md:text-7xl 2xl:text-9xl">
          <span className="max-md:hidden">HELLO!! </span>
          {name || "DESIGNER"}
        </h1>
        <h1 className="text-xl mt-2 mb-5 text-[#7CA8A1] md:text-3xl md:mb-8 2xl:text-6xl 2xl:mb-12">
          Lookin For UI
        </h1>
        <button
          type="button"
          className="text-white bg-[#077B79] font-medium rounded-lg text-sm px-10 py-2.5 md:py-6  2xl:text-4xl"
        >
          BROWSE
        </button>
      </section>
    </>
  );
}

export default TemplateBanner;
