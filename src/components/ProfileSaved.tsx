import React from "react";
interface State {
  [key: string]: { current: string; max: string; min: string } | any;
}

interface Props {
  title: string;
  image: string;
  style: State;
}

interface obj {}

export default function ProfileSaved({ title, image, style }: Props) {
  const arrOfSections: string[] = Object.keys(style);
  const colors = arrOfSections.map((val) => (
    <div
      style={{ background: style[val].background }}
      className="w-8 h-8 mx-1 border rounded-full	 border-black "
    />
  ));
  console.log(colors);
  return (
    <div className="max-w-sm bg-white border border-gray-200 bg-opacity-30 backdrop-filter backdrop-blur-3xl rounded-lg shadow">
      <a href="#">
        <img className="rounded-t-lg" src={image} alt="" />
      </a>
      <div className="p-5 flex flex-row justify-between">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
        </a>

        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#077B79] rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
        >
          Tweak
        </a>
      </div>
      <div className="flex flex-row mx-4 mb-4">{colors}</div>
    </div>
  );
}
