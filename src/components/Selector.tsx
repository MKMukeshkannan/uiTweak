import React, { useState } from "react";

interface Props {
  state: {};
  content: String;
  changeColor({}): {};
  changeLength({}): {};
  dispatch(action: any): {};
}

function Selector({
  state,
  content,
  dispatch,
  changeColor,
  changeLength,
}: Props) {
  const properties = state[content];
  const title = Object.keys(state).map(
    (val) =>
      val === content && (
        <h1 className="font-black text-3xl mb-8">{val.toUpperCase()}</h1>
      )
  );

  const options = Object.keys(properties);

  const handler = (value: string, key: string) => {
    switch (key) {
      case "height":
        dispatch(changeLength({ target: content + "-h", len: value }));
        break;
      case "width":
        dispatch(changeLength({ target: content + "-w", len: value }));
        break;
      case "color":
        dispatch(changeColor({ target: content + "-txt", color: value }));
        break;
      case "button":
        dispatch(changeColor({ target: content + "-bt", color: value }));
        break;
      case "background":
        dispatch(changeColor({ target: content + "-bg", color: value }));
        break;
    }
  };

  const optionsMarkup = options.map((val) => (
    <div className="flex flex-col items-center mb-8">
      <h1 className="font-black text-xl ">{val.toUpperCase()}</h1>
      <input
        type={val === "height" || val === "width" ? "range" : "color"}
        min={properties[val].min}
        max={properties[val].max}
        value={val === "height" || val === "width" ? null : properties[val]}
        className={
          val === "height" || val === "width"
            ? "range"
            : "cursor-pointer color primary w-16 h-16"
        }
        onChange={(e) => handler(e.target.value, val)}
      />
      <h1
        className="text-sm text-indigo-500 hover:text-indigo-600 font-medium mt-2 cursor-pointer "
        onClick={() =>
          navigator.clipboard.writeText(
            val === "height" || val === "width"
              ? properties[val].current.toUpperCase()
              : properties[val].toUpperCase()
          )
        }
      >
        {val === "height" || val === "width"
          ? properties[val].current.toUpperCase()
          : properties[val].toUpperCase()}
      </h1>
    </div>
  ));

  const [isControlOpen, setControlOpen] = useState(true);
  const toggleController = () => {
    setControlOpen(!isControlOpen);
  };

  return (
    <>
      {isControlOpen ? (
        <div className="flex flex-col items-center left-5 top-28 absolute py-20 w-[12%] h-[80%] bg-gray-50 text-slate-600	 border	rounded-md shadow-lg	">
          {title}
          <hr />
          {optionsMarkup}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 64 64"
            viewBox="0 0 64 64"
            id="arrow"
            className="w-16 h-16 absolute top-0 cursor-pointer	"
            onClick={toggleController}
          >
            <path
              fill="#134563"
              d="m-191.3-296.9-2 2-11.7-11.7-11.7 11.7-2-2 13.7-13.7 13.7 13.7"
              transform="translate(237 335)"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="left-5 top-28 absolute w-[12%] bg-gray-50 border rounded-md shadow-lg	">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 64 64"
            viewBox="0 0 64 64"
            id="arrow"
            className="w-16 h-16 mx-auto my-auto cursor-pointer	"
            onClick={toggleController}
          >
            <path
              fill="#134563"
              d="m-218.7-308.6 2-2 11.7 11.8 11.7-11.8 2 2-13.7 13.7-13.7-13.7"
              transform="translate(237 335)"
            ></path>
          </svg>
        </div>
      )}
    </>
  );
}

export default Selector;
