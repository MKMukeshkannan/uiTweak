import React, { forwardRef, useState } from "react";
import { useSession } from "next-auth/react";
import { uploadScreenshot } from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
interface State {
  [key: string]: { current: string; max: string; min: string } | any;
}

interface Props {
  state: State;
  content: string;
  baseTemplate: string;
  changeColor(obj: { target: string; color: string }): {};
  changeLength(obj?: { target: string; len: string }): {};
  changeCss(obj?: { target: string; css: string }): {};
  dispatch(action: {}): {};
}

function UploadSVG(uploading: string, saveHandler: () => void) {
  switch (uploading) {
    case "":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 512.022 512.022"
          xmlSpace="preserve"
          className="h-7 w-7 cursor-pointer "
          onClick={saveHandler}
          width="512"
          height="512"
        >
          <g>
            <path d="M165.558,141.889l59.328-59.349l0.448,290.816c0,17.673,14.327,32,32,32l0,0c17.673,0,32-14.327,32-32l-0.448-290.453   l58.987,58.987c12.278,12.712,32.536,13.064,45.248,0.786s13.064-32.536,0.786-45.248c-0.258-0.267-0.52-0.529-0.786-0.786   l-68.523-68.523c-37.49-37.491-98.274-37.491-135.765-0.001c0,0-0.001,0.001-0.001,0.001L120.31,96.641   c-12.278,12.712-11.926,32.97,0.786,45.248C133.497,153.866,153.157,153.866,165.558,141.889z" />
            <path d="M480.011,309.355c-17.673,0-32,14.327-32,32v97.941c-0.012,4.814-3.911,8.714-8.725,8.725H72.736   c-4.814-0.012-8.714-3.911-8.725-8.725v-97.941c0-17.673-14.327-32-32-32s-32,14.327-32,32v97.941   c0.047,40.146,32.58,72.678,72.725,72.725h366.549c40.146-0.047,72.678-32.58,72.725-72.725v-97.941   C512.011,323.682,497.684,309.355,480.011,309.355z" />
          </g>
        </svg>
      );
    case "success":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 507.506 507.506"
          className="h-7 w-7 cursor-pointer  animate-bounce"
          width="512"
          height="512"
        >
          <g>
            <path d="M163.865,436.934c-14.406,0.006-28.222-5.72-38.4-15.915L9.369,304.966c-12.492-12.496-12.492-32.752,0-45.248l0,0   c12.496-12.492,32.752-12.492,45.248,0l109.248,109.248L452.889,79.942c12.496-12.492,32.752-12.492,45.248,0l0,0   c12.492,12.496,12.492,32.752,0,45.248L202.265,421.019C192.087,431.214,178.271,436.94,163.865,436.934z" />
          </g>
        </svg>
      );
    case "failed":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          className="h-7 w-7 cursor-pointer "
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          width="512"
          height="512"
        >
          <g>
            <path d="M342.635,169.365c-12.493-12.501-32.754-12.507-45.255-0.014c-0.005,0.005-0.01,0.01-0.015,0.014L256,210.752   l-41.365-41.387c-12.501-12.501-32.769-12.501-45.269,0s-12.501,32.769,0,45.269L210.752,256l-41.387,41.365   c-12.501,12.501-12.501,32.769,0,45.269c12.501,12.501,32.769,12.501,45.269,0l0,0L256,301.248l41.365,41.387   c12.501,12.501,32.769,12.501,45.269,0c12.501-12.501,12.501-32.769,0-45.269L301.248,256l41.387-41.365   c12.501-12.493,12.507-32.754,0.014-45.255C342.644,169.375,342.64,169.37,342.635,169.365z" />
            <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256C511.847,114.678,397.322,0.153,256,0z M256,448   c-106.039,0-192-85.961-192-192S149.961,64,256,64s192,85.961,192,192C447.882,361.99,361.99,447.882,256,448z" />
          </g>
        </svg>
      );
    case "uploading":
      return (
        <svg
          id="Layer_1"
          height="512"
          viewBox="0 0 24 24"
          width="512"
          className="h-7 w-7 cursor-pointer animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 1"
        >
          <path d="m12 5a1.5 1.5 0 0 1 -1.5-1.5v-2a1.5 1.5 0 0 1 3 0v2a1.5 1.5 0 0 1 -1.5 1.5zm1.5 17.5v-2a1.5 1.5 0 0 0 -3 0v2a1.5 1.5 0 0 0 3 0zm-8.5-10.5a1.5 1.5 0 0 0 -1.5-1.5h-2a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 0 1.5-1.5zm19 0a1.5 1.5 0 0 0 -1.5-1.5h-2a1.5 1.5 0 0 0 0 3h2a1.5 1.5 0 0 0 1.5-1.5zm-6.524-6.671.981-1.743a1.5 1.5 0 0 0 -2.613-1.473l-.982 1.743a1.5 1.5 0 0 0 .571 2.044 1.484 1.484 0 0 0 .735.194 1.5 1.5 0 0 0 1.308-.765zm-9.32 16.558.982-1.743a1.5 1.5 0 0 0 -2.614-1.473l-.981 1.743a1.5 1.5 0 0 0 2.613 1.473zm-2.256-13.32a1.5 1.5 0 0 0 -.57-2.043l-1.744-.981a1.5 1.5 0 0 0 -1.473 2.613l1.743.982a1.5 1.5 0 0 0 2.044-.571zm16.558 9.32a1.5 1.5 0 0 0 -.57-2.043l-1.743-.982a1.5 1.5 0 0 0 -1.473 2.614l1.743.981a1.5 1.5 0 0 0 2.043-.57zm-13.891-11.987a1.5 1.5 0 0 0 .571-2.043l-.982-1.744a1.5 1.5 0 0 0 -2.613 1.473l.981 1.743a1.5 1.5 0 0 0 1.308.764 1.484 1.484 0 0 0 .735-.193zm9.32 16.558a1.5 1.5 0 0 0 .57-2.043l-.981-1.743a1.5 1.5 0 0 0 -2.614 1.473l.982 1.743a1.5 1.5 0 0 0 2.043.57zm2.257-13.32 1.743-.982a1.5 1.5 0 0 0 -1.473-2.613l-1.743.981a1.5 1.5 0 0 0 1.473 2.614zm-16.558 9.319 1.743-.981a1.5 1.5 0 0 0 -1.473-2.614l-1.743.982a1.5 1.5 0 0 0 .738 2.806 1.483 1.483 0 0 0 .735-.193z" />
        </svg>
      );
  }
}

const Selector = forwardRef<HTMLDivElement, Props>(
  (
    {
      state,
      content,
      baseTemplate = "login",
      dispatch,
      changeColor,
      changeLength,
      changeCss,
    },
    Pref
  ) => {
    const ref = Pref as React.MutableRefObject<HTMLDivElement>;
    const [isUploading, setUploading] = useState("");
    const [isControlOpen, setControlOpen] = useState(true);
    const [isCssOpen, setCssOpen] = useState(false);

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
      const id = uuidv4();
      if (!session?.user) {
        alert("SIGN IN FIRST");
        return;
      }
      setUploading("uploading");

      const uploadRes = await uploadScreenshot(
        ref.current,
        session?.user.id,
        id
      );

      if (uploadRes === "error") {
        setUploading("failed");

        setTimeout(() => {
          setUploading("");
        }, 1000);
        return;
      }

      const bodyData = {
        id,
        templatename: Math.random().toString(36).substring(2, 7),
        basetemplate: baseTemplate,
        imgurl: uploadRes,
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
        setUploading("success");

        setTimeout(() => {
          setUploading("");
        }, 2000);
        return;
      }
      setUploading("failed");
      setTimeout(() => {
        setUploading("");
      }, 1000);
      return;
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
              <section className="w-full px-8 mb-3 flex flex-row justify-center gap-3 absolute top-5 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Bold"
                  viewBox="0 0 24 24"
                  width="512"
                  height="512"
                  className="h-7 w-7 cursor-pointer "
                  onClick={toggleController}
                >
                  <path d="M22.5,18a1.5,1.5,0,0,1-1.061-.44L13.768,9.889a2.5,2.5,0,0,0-3.536,0L2.57,17.551A1.5,1.5,0,0,1,.449,15.43L8.111,7.768a5.505,5.505,0,0,1,7.778,0l7.672,7.672A1.5,1.5,0,0,1,22.5,18Z" />
                </svg>

                {UploadSVG(isUploading, saveHandler)}

                <Link href={"/"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id="Layer_1"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    className="h-7 w-7 cursor-pointer "
                    width="512"
                    height="512"
                  >
                    <path d="M11.5,16A1.5,1.5,0,0,0,10,17.5v.8A2.7,2.7,0,0,1,7.3,21H5.7A2.7,2.7,0,0,1,3,18.3V5.7A2.7,2.7,0,0,1,5.7,3H7.3A2.7,2.7,0,0,1,10,5.7v.8a1.5,1.5,0,0,0,3,0V5.7A5.706,5.706,0,0,0,7.3,0H5.7A5.706,5.706,0,0,0,0,5.7V18.3A5.706,5.706,0,0,0,5.7,24H7.3A5.706,5.706,0,0,0,13,18.3v-.8A1.5,1.5,0,0,0,11.5,16Z" />
                    <path d="M22.561,9.525,17.975,4.939a1.5,1.5,0,0,0-2.121,2.122l3.411,3.411L7,10.5a1.5,1.5,0,0,0,0,3H7l12.318-.028-3.467,3.467a1.5,1.5,0,0,0,2.121,2.122l4.586-4.586A3.505,3.505,0,0,0,22.561,9.525Z" />
                  </svg>
                </Link>
              </section>
              {title}
              <hr />
              {optionsMarkup}
            </div>
          </>
        ) : (
          <div className="left-5 top-28 absolute w-[12%] h-20 bg-gray-50 border rounded-md shadow-lg	">
            <section className="w-full px-8 mb-3 flex flex-row justify-center gap-3 absolute top-5 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="Bold"
                viewBox="0 0 24 24"
                className="h-7 w-7 cursor-pointer "
                onClick={toggleController}
                width="512"
                height="512"
              >
                <path d="M1.51,6.079a1.492,1.492,0,0,1,1.06.44l7.673,7.672a2.5,2.5,0,0,0,3.536,0L21.44,6.529A1.5,1.5,0,1,1,23.561,8.65L15.9,16.312a5.505,5.505,0,0,1-7.778,0L.449,8.64A1.5,1.5,0,0,1,1.51,6.079Z" />
              </svg>

              {UploadSVG(isUploading, saveHandler)}
              <Link href={"/"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  id="Layer_1"
                  data-name="Layer 1"
                  viewBox="0 0 24 24"
                  className="h-7 w-7 cursor-pointer "
                  width="512"
                  height="512"
                >
                  <path d="M11.5,16A1.5,1.5,0,0,0,10,17.5v.8A2.7,2.7,0,0,1,7.3,21H5.7A2.7,2.7,0,0,1,3,18.3V5.7A2.7,2.7,0,0,1,5.7,3H7.3A2.7,2.7,0,0,1,10,5.7v.8a1.5,1.5,0,0,0,3,0V5.7A5.706,5.706,0,0,0,7.3,0H5.7A5.706,5.706,0,0,0,0,5.7V18.3A5.706,5.706,0,0,0,5.7,24H7.3A5.706,5.706,0,0,0,13,18.3v-.8A1.5,1.5,0,0,0,11.5,16Z" />
                  <path d="M22.561,9.525,17.975,4.939a1.5,1.5,0,0,0-2.121,2.122l3.411,3.411L7,10.5a1.5,1.5,0,0,0,0,3H7l12.318-.028-3.467,3.467a1.5,1.5,0,0,0,2.121,2.122l4.586-4.586A3.505,3.505,0,0,0,22.561,9.525Z" />
                </svg>
              </Link>
            </section>
          </div>
        )}
      </>
    );
  }
);

export default Selector;
