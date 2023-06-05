"use client";

import Selector from "@/components/Selector";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Ping from "@/components/Ping";
import { useSession } from "next-auth/react";
import {
  changeColor,
  changeCss,
  changeLength,
  fetchStyle,
} from "./StateConfig/styleSlice";
import { useAppDispatch } from "./StateConfig/store";

function Login({ params }: { params: { tempId: string } }) {
  const dispatch = useAppDispatch();
  const state = useSelector((state: any) => state.styleSlice);
  const { nav, center, main, button } = useSelector(
    (state: any) => state.styleSlice
  );
  const [content, setContent] = useState("nav");
  const pageRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const token = session?.user.accesstoken;

  useEffect(() => {
    const data = { tempId: params.tempId, token };
    dispatch(fetchStyle(data));
  }, [session?.user.accesstoken]);

  return (
    <>
      <div
        ref={pageRef}
        style={{ background: main.background }}
        className="main flex flex-col h-screen"
      >
        <nav
          style={{
            background: nav.background,
            color: nav.color,
            height: nav.height.current,
          }}
          className=" nav relative flex h-24 items-center justify-between px-20"
        >
          <h1 className=" text-xl font-black">YOUR LOGO</h1>
          <div>
            <a href="#">SIGN UP</a>
            <a href="#">CONTACT US</a>
          </div>
          <Ping content={"nav"} setDisplayContent={setContent} />
        </nav>

        <main className="w-full  flex-auto flex items-center justify-center">
          <section
            style={{
              background: center.background,
              color: center.color,
              height: center.height.current,
              width: center.width.current,
            }}
            className="center relative border flex flex-col w-2/6 h-3/6 px-8 py-14 rounded-2xl shadow-lg"
          >
            <h1 className="mx-auto font-black text-3xl	mb-8">LOGIN</h1>
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
                style={{
                  background: button.background,
                  color: button.color,
                }}
                className="button-text rounded-lg py-3 px-20 button"
              >
                LOGIN
              </button>
              <Ping content={"button"} setDisplayContent={setContent} />
            </div>
            <Ping content={"center"} setDisplayContent={setContent} />
          </section>
          <Ping content={"main"} setDisplayContent={setContent} />
        </main>
      </div>
      <Selector
        state={state}
        content={content}
        ref={pageRef}
        baseTemplate="Login"
        dispatch={dispatch}
        changeColor={changeColor}
        changeLength={changeLength}
        changeCss={changeCss}
      />
      <style jsx>{`
        .center {
          ${center.css}
        }
        .nav {
          ${nav.css}
        }
        .main {
          ${main.css}
        }
        .button {
          ${button.css}
        }
      `}</style>
    </>
  );
}

export default Login;
