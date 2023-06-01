import React, { useState } from "react";
import { changeCss } from "@/app/templates/login/styleSlice";

interface State {
  [key: string]: { current: string; max: string; min: string } | any;
}

interface Props {
  state: State;
  content: string;
  changeColor(obj: { target: string; color: string }): {};
  changeLength(obj?: { target: string; len: string }): {};
  changeCss(obj?: { target: string; css: string }): {};
  dispatch(action: {}): {};
}

function Selector({
  state,
  content,
  dispatch,
  changeColor,
  changeLength,
}: Props) {
  const [isControlOpen, setControlOpen] = useState(true);
  const [isCssOpen, setCssOpen] = useState(false);

  const toggleController = () => {
    setControlOpen(!isControlOpen);
  };
  const handler = (value: string, key: string) => {
    switch (key) {
      case "css":
        dispatch(changeCss({ target: content + "-css", css: value }));
        break;
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

  const properties = state[content];

  const title = Object.keys(state).map(
    (val) =>
      val === content && (
        <h1 className="font-black text-3xl mb-8" key={val}>
          {val.toUpperCase()}
        </h1>
      )
  );

  const options = Object.keys(properties);

  const optionsMarkup = options.map((val) => (
    <div className="flex flex-col items-center mb-8" key={val}>
      <h1 className="font-black text-xl ">{val.toUpperCase()}</h1>

      {val === "css" ? (
        <>
          {isCssOpen && (
            <div className="absolute left-52 top-36  w-[200%] h-1/2">
              <textarea
                className="block p-2.5 w-full h-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 shadow-lg	"
                placeholder="YOUR CUSTOM CSS HERE ! ! !"
                value={properties[val]}
                onChange={(e) => handler(e.target.value, val)}
              ></textarea>
            </div>
          )}
          <button onClick={() => setCssOpen(!isCssOpen)}>ADD</button>
        </>
      ) : (
        <>
          <input
            type={val === "height" || val === "width" ? "range" : "color"}
            min={properties[val].min}
            max={properties[val].max}
            value={
              val === "height" || val === "width"
                ? properties[val].current.slice(0, -2)
                : properties[val]
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
        </>
      )}
    </div>
  ));

  return (
    <>
      {isControlOpen ? (
        <>
          <div className="flex flex-col items-center left-5 top-28 absolute py-20 w-[12%] h-[80%] bg-gray-50 text-slate-600	 border	rounded-md shadow-lg	">
            {title}
            <hr />
            {optionsMarkup}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 64 64"
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
        </>
      ) : (
        <div className="left-5 top-28 absolute w-[12%] bg-gray-50 border rounded-md shadow-lg	">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 64 64"
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
