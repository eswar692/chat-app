import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./apiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
