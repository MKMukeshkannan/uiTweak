import React from "react";
import Image from "next/image";
import Link from "next/link";

interface State {
  [key: string]: { current: string; max: string; min: string } | any;
}

interface Props {
  id: string;
  base: string;
  title: string;
  image: string;
  style: State;
}

export default function ProfileSaved({ title, image, style, id, base }: Props) {
  const arrOfSections: string[] = Object.keys(style);
  const colors = arrOfSections.map((val) => (
    <div
      key={val}
      style={{ background: style[val].background }}
      className="w-8 h-8 mx-1 border rounded-full	 border-black "
    />
  ));
  return (
    <div className="max-w-sm bg-white border border-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-3xl rounded-lg shadow">
      <Link href={`http://localhost:3000/templates/${base}/${id}`}>
        <Image
          width={400}
          height={400}
          style={{ objectFit: "cover" }}
          alt={title}
          className="rounded-t-lg"
          src={image}
        />
      </Link>
      <div className="p-5 flex flex-row justify-between">
        <Link href={`http://localhost:3000/templates/${base}/${id}`}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </Link>

        <Link
          href={`http://localhost:3000/templates/${base}/${id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#077B79] rounded-lg hover:bg-[#d3f1e8] focus:ring-4 focus:outline-none focus:ring-[#d3f1e8] "
        >
          Tweak
        </Link>
      </div>
      <div className="flex flex-row mx-4 mb-4">{colors}</div>
    </div>
  );
}
