import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";






const socketSlice = createSlice({
    name: "socket",
    initialState: {
        socket:null
    },
    reducers: {
        connectSoket:(state,action)=>{
            if(!state.socket){
                state.socket =  io("http://localhost:3000",{
                    withCredentials:true,
                    query:{userId:action.payload},
                });
                state.socket.on('connect',()=>{
                    console.log("connected")
                })
            }

        },
        disconnectSocket:(state)=>{
            if(state.socket){
                state.socket.disconnect()
                state.socket = null
            }
        }
    },
  });


export const {connectSoket,disconnectSocket} = socketSlice.actions 
export default socketSlice.reducer;