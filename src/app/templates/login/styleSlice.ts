import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  nav: {
    height: { current: "100px", min: "50", max: "170" },
    background: "#facc14",
    color: "#262626",
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

export const fetchStyle = createAsyncThunk("style/fetch", async (thunkAPI) => {
  const res = await fetch(
    "http://localhost:3000/api/savetemplates/ecd324e5-56db-4144-9529-a571b67d4e94",
    {
      method: "GET",
      headers: {
        authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEzYzc1YThkLWU0NDMtNDFkMS1hOGEwLTlkN2I3NDFmMzU1ZSIsImVtYWlsIjoiY2hpa2FAc2VjcmF0YXJ5LmNvbSIsIm5hbWUiOiJDaGlrYSIsImlhdCI6MTY4NTk1MjgzNywiZXhwIjoxNjg1OTU2NDM3fQ.fUMyRuldNzH5vUvVynsP0JrotaP7QK2rnnZzIETEP4k`,
      },
    }
  );

  return await res.json();
});

const styleSlice = createSlice({
  name: "styleSlice",
  initialState,
  reducers: {
    changeCss(state, action) {
      switch (action.payload.target) {
        case "nav-css":
          state.nav.css = action.payload.css;
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
  extraReducers: (builder) => {
    builder.addCase(fetchStyle.fulfilled, (state, action) => {
      console.log(action.payload.style);
      state.nav = action.payload.style.nav;
      (state.button = action.payload.style.button),
        (state.center = action.payload.style.center),
        (state.main = action.payload.style.main);
    });
  },
});

export const { changeColor, changeLength, changeCss } = styleSlice.actions;

export default styleSlice.reducer;
