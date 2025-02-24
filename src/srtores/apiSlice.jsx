import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

// API Call Using createAsyncThunk
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_,rejectWithValue) => {
  try {
    const response = await axios.get('http://localhost:3000/user/get-data-token',{ withCredentials: true })
    const data = response.data
  
    return data;
    
  } catch (error) {
    if (error.response) {
        return rejectWithValue(error.response.data?.message || "API Error: Failed to fetch user");
      } 
      // Network errors (CORS, no internet, etc.)
      else if (error.request) {
        return rejectWithValue("Network Error: Please check your connection");
      } 
      // Unknown error
      else {
        return rejectWithValue(error.message || "Something went wrong");
      }
    
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userInfo: null,
    loading:true // Initial state empty
    
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.userInfo = false;
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state,action) => {
        state.userInfo = action.payload;
        state.loading = null;

       
      });
  },
});


export default authSlice.reducer;
