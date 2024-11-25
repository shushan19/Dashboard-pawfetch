import { configureStore } from "@reduxjs/toolkit";
import loginStatusSlice from "./slice/loginStatusSlice";

export const store = configureStore({
  reducer: {
    loginStatus: loginStatusSlice,
  },
});
