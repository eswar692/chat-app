import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./apiSlice";

import chatSlice from './chat-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat:chatSlice,
  },
});
