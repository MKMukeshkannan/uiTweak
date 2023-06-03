import React, { forwardRef, useRef, useState } from "react";
import { changeCss } from "@/app/templates/login/styleSlice";
import { useSession } from "next-auth/react";
import { uploadScreenshot } from "@/lib/supabase";

interface State {
  [key: string]: { current: string; max: string; min: string } | any;
}

interface Props {
  state: State;
  content: string;
  ref: React.MutableRefObject<null>;
  changeColor(obj: { target: string; color: string }): {};
  changeLength(obj?: { target: string; len: string }): {};
  changeCss(obj?: { target: string; css: string }): {};
  dispatch(action: {}): {};
}

const Selector = forwardRef<HTMLDivElement, Props>(
  ({ state, content, dispatch, changeColor, changeLength }, ref) => {
    const [isControlOpen, setControlOpen] = useState(true);
    const [isCssOpen, setCssOpen] = useState(false);
    // console.log(ref !== null && ref.current);

    const { data: session } = useSession();

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

    async function saveHandler() {
      const bodyData = {
        templatename: Math.random().toString(36).substring(2, 7),
        state,
      };
      const res = await fetch("http://localhost:3000/api/savetemplates", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          authorization: `bearer ${session?.user.accesstoken}`,
        },
      });
      const savedData = await res.json();
      if (res.ok && savedData) {
        uploadScreenshot(ref, session?.user.id, bodyData.templatename);
        return savedData;
      }
      return null;
    }

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
            <div className="flex flex-col items-center left-5 top-28 absolute py-16 w-[12%] h-[80%] bg-gray-50 text-slate-600	 border	rounded-md shadow-lg	">
              <section className="w-full px-8 mb-3 flex flex-row justify-center gap-2 absolute top-5 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="1"
                  viewBox="0 0 128 128"
                  id="up"
                  className="h-8 w-8 cursor-pointer "
                  onClick={toggleController}
                >
                  <path d="M64 128a64 64 0 1 1 64-64 64.07 64.07 0 0 1-64 64ZM64 4a60 60 0 1 0 60 60A60.07 60.07 0 0 0 64 4Z"></path>
                  <path d="M97.63 76.38a2 2 0 0 1-1.42-.59L64 43.58 31.79 75.79A2 2 0 0 1 29 73l33.59-33.66a2 2 0 0 1 2.82 0L99 73a2 2 0 0 1-1.41 3.42Z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="1"
                  viewBox="0 0 128 128"
                  className="h-8 w-8 cursor-pointer "
                  onClick={saveHandler}
                  id="upload"
                >
                  <path d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 124a60 60 0 1 1 60-60 60.07 60.07 0 0 1-60 60Z"></path>
                  <path d="M65.42 45.09a1.79 1.79 0 0 0-.31-.25.55.55 0 0 0-.15-.08l-.2-.11-.2-.06-.17-.05a2 2 0 0 0-.78 0l-.17.05-.2.06-.2.11a.55.55 0 0 0-.15.08 1.79 1.79 0 0 0-.31.25l-30 30a2 2 0 0 0 2.82 2.82L62 51.33v52.17a2 2 0 0 0 4 0V51.33l26.59 26.58a2 2 0 0 0 2.82-2.82zM94 32H34a2 2 0 0 0 0 4h60a2 2 0 0 0 0-4z"></path>
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  data-name="1"
                  viewBox="0 0 128 128"
                  className="h-8 w-8 cursor-pointer "
                  id="left"
                >
                  <path d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 124a60 60 0 1 1 60-60 60.07 60.07 0 0 1-60 60Z"></path>
                  <path d="M102.5 62H30.33l26.58-26.59a2 2 0 0 0-2.82-2.82l-30 30a1.79 1.79 0 0 0-.25.31.55.55 0 0 0-.08.15 1.28 1.28 0 0 0-.11.2l-.06.2a.84.84 0 0 0-.05.17 2 2 0 0 0 0 .78.84.84 0 0 0 .05.17l.06.2a1.28 1.28 0 0 0 .11.2.55.55 0 0 0 .08.15 1.79 1.79 0 0 0 .25.31l30 30a2 2 0 0 0 2.82-2.82L30.33 66h72.17a2 2 0 0 0 0-4Z"></path>
                </svg>
              </section>
              {title}
              <hr />
              {optionsMarkup}
            </div>
          </>
        ) : (
          <div className="left-5 top-28 absolute w-[12%] h-20 bg-gray-50 border rounded-md shadow-lg	">
            <section className="w-full px-8 mb-3 flex flex-row justify-center gap-2 absolute top-5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="1"
                viewBox="0 0 128 128"
                id="down"
                className="h-8 w-8 cursor-pointer "
                onClick={toggleController}
              >
                <path d="M64 128a64 64 0 1 1 64-64 64.07 64.07 0 0 1-64 64ZM64 4a60 60 0 1 0 60 60A60.07 60.07 0 0 0 64 4Z"></path>
                <path d="M64 89.25a2 2 0 0 1-1.41-.59L29 55a2 2 0 0 1 2.83-2.83L64 84.42l32.21-32.21A2 2 0 1 1 99 55L65.41 88.66a2 2 0 0 1-1.41.59Z"></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="1"
                viewBox="0 0 128 128"
                className="h-8 w-8 cursor-pointer "
                onClick={saveHandler}
                id="upload"
              >
                <path d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 124a60 60 0 1 1 60-60 60.07 60.07 0 0 1-60 60Z"></path>
                <path d="M65.42 45.09a1.79 1.79 0 0 0-.31-.25.55.55 0 0 0-.15-.08l-.2-.11-.2-.06-.17-.05a2 2 0 0 0-.78 0l-.17.05-.2.06-.2.11a.55.55 0 0 0-.15.08 1.79 1.79 0 0 0-.31.25l-30 30a2 2 0 0 0 2.82 2.82L62 51.33v52.17a2 2 0 0 0 4 0V51.33l26.59 26.58a2 2 0 0 0 2.82-2.82zM94 32H34a2 2 0 0 0 0 4h60a2 2 0 0 0 0-4z"></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                data-name="1"
                viewBox="0 0 128 128"
                className="h-8 w-8 cursor-pointer "
                id="left"
              >
                <path d="M64 0a64 64 0 1 0 64 64A64.07 64.07 0 0 0 64 0Zm0 124a60 60 0 1 1 60-60 60.07 60.07 0 0 1-60 60Z"></path>
                <path d="M102.5 62H30.33l26.58-26.59a2 2 0 0 0-2.82-2.82l-30 30a1.79 1.79 0 0 0-.25.31.55.55 0 0 0-.08.15 1.28 1.28 0 0 0-.11.2l-.06.2a.84.84 0 0 0-.05.17 2 2 0 0 0 0 .78.84.84 0 0 0 .05.17l.06.2a1.28 1.28 0 0 0 .11.2.55.55 0 0 0 .08.15 1.79 1.79 0 0 0 .25.31l30 30a2 2 0 0 0 2.82-2.82L30.33 66h72.17a2 2 0 0 0 0-4Z"></path>
              </svg>
            </section>
          </div>
        )}
      </>
    );
  }
);

export default Selector;
