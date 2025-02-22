import { configureStore, createSlice } from "@reduxjs/toolkit";


// User Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null, // Store user details
  },
  reducers: {
    // setUserInfo: (state, action) => {
    //   state.userInfo = action.payload;
    // },
    setUserInfo: (state, action) => {
      return { ...state, userInfo: action.payload }; // ✅ Immutable update
    }
    
  },
});

// Export actions
export const { setUserInfo }  = userSlice.actions;

// Create store
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});


