import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    width: { current: "400px", min: "50", max: "850" },
    background: "#facc14",
    css: "",
  },
  center: {
    height: { current: "450px", min: "360", max: "700" },
    width: { current: "420px", min: "300", max: "700" },
    background: "#facc14",
    color: "#262626",
    css: "",
  },
  main: {
    background: "#fffbed",
    css: "",
  },
  button: {
    background: "#e8b306",
    color: "#ffffff",
    css: "",
  },
};

const styleSlice = createSlice({
  name: "styleSlice",
  initialState,
  reducers: {
    changeCss(state, action) {
      switch (action.payload.target) {
        case "sidebar-css":
          state.sidebar.css = action.payload.css;
          break;

        case "center-css":
          state.center.css = action.payload.css;
          break;

        case "main-css":
          state.main.css = action.payload.css;
          break;

        case "button-css":
          state.button.css = action.payload.css;
          break;
      }
    },
    changeColor(state, action) {
      switch (action.payload.target) {
        case "sidebar-bg":
          state.sidebar.background = action.payload.color;
          break;

        case "center-bg":
          state.center.background = action.payload.color;
          break;

        case "main-bg":
          state.main.background = action.payload.color;
          break;

        case "button-bg":
          state.button.background = action.payload.color;
          break;

        case "button-txt":
          state.button.color = action.payload.color;
          break;

        case "center-txt":
          state.center.color = action.payload.color;
          break;
      }
    },

    changeLength(state, action) {
      switch (action.payload.target) {
        case "sidebar-w":
          state.sidebar.width.current = action.payload.len.toString() + "px";
          break;

        case "center-h":
          state.center.height.current = action.payload.len.toString() + "px";
          break;

        case "center-w":
          state.center.width.current = action.payload.len.toString() + "px";
          break;
      }
    },
  },
});

export const { changeColor, changeLength, changeCss } = styleSlice.actions;

export default styleSlice.reducer;
