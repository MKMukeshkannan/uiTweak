"use client";

import Selector from "@/components/Selector";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeColor, changeLength, changeCss } from "./styleSlice";
import Ping from "@/components/Ping";

function Login() {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.styleSlice);
  const { center, sidebar, main, button } = useSelector(
    (state: any) => state.styleSlice
  );
  const [content, setContent] = useState("sidebar");

  return (
    <>
      <div className="flex flex-row w-screen h-screen">
        <div
          style={{
            background: sidebar.background,
            width: sidebar.width.current,
          }}
          className="sidebar h-full relative"
        >
          <Ping content="sidebar" setDisplayContent={setContent} />
        </div>

        <div
          style={{ background: main.background }}
          className="main flex grow items-center justify-center"
        >
          <section
            style={{
              background: center.background,
              width: center.width.current,
              height: center.height.current,
              color: center.color,
            }}
            className="center relative flex flex-col px-8 py-14 rounded-2xl border"
          >
            <h1 className="mx-auto text-3xl	mb-8  font-black tracking-wider">
              LOGIN
            </h1>
            <input
              className="rounded h-10 text-lg px-3 shadow mb-3"
              placeholder="Username"
              type="text"
            />
            <input
              className="rounded h-10 text-lg px-3 shadow mb-3"
              placeholder="Password"
              type="password"
            />
            <div className="mx-auto relative">
              <button
                style={{ background: button.background, color: button.color }}
                className="rounded-lg py-3 px-20 bg-yellow-300"
              >
                LOGIN
              </button>
              <Ping content="button" setDisplayContent={setContent} />
            </div>
            <Ping content="center" setDisplayContent={setContent} />
          </section>
          <Ping content="main" setDisplayContent={setContent} />
        </div>
      </div>
      <Selector
        state={state}
        content={content}
        dispatch={dispatch}
        changeColor={changeColor}
        changeLength={changeLength}
        changeCss={changeCss}
      />
      <style jsx>{`
        .center {
          ${center.css}
        }
        .sidebar {
          ${sidebar.css}
        }
        .button {
          ${button.css}
        }
        .main {
          ${main.css}
        }
      `}</style>
    </>
  );
}

export default Login;
