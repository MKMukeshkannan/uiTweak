import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nav: {
    height: { current: "100px", min: "50", max: "170" },
    background: "#facc14",
    color: "#262626",
  },
  center: {
    height: { current: "450px", min: "360", max: "700" },
    width: { current: "420px", min: "300", max: "700" },
    background: "#facc14",
    color: "#262626",
  },
  main: {
    background: "#fffbed",
  },
  button: {
    background: "#e8b306",
    color: "#ffffff",
  },
};

const styleSlice = createSlice({
  name: "styleSlice",
  initialState,
  reducers: {
    changeColor(state, action) {
      switch (action.payload.target) {
        case "nav-bg":
          state.nav.background = action.payload.color;
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

        case "nav-txt":
          state.nav.color = action.payload.color;
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
        case "nav-h":
          state.nav.height.current = action.payload.len.toString() + "px";
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

export const { changeColor, changeLength } = styleSlice.actions;

export default styleSlice.reducer;
