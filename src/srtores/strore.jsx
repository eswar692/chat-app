import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./apiSlice";
import socketSlice from './soketSlice'
import chatSlice from './chat-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket:socketSlice,
    chat:chatSlice,
  },
});
