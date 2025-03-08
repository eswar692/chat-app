import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./apiSlice";
import socketSlice from './soketSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket:socketSlice,
  },
});
