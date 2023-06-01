import { configureStore } from "@reduxjs/toolkit";
import styleSlice from "./styleSlice";

const store = configureStore({
  reducer: {
    styleSlice,
  },
});

export default store;
