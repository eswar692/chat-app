import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        selectedChatType : undefined ,
        selectedChatData : undefined,
        selectedChatMessage : undefined,
    },
    reducers: {
        setSelectedChatType:(state,action)=>{
            state.selectedChatType = action.payload
        },
        setSelectedChatData:(state,action)=>{
            state.selectedChatData= action.payload
        },
        setSelectedChatMessage:(state,action)=>{
            state.selectedChatMessage = action.payload
        },
        closeChat:(state)=>{
            state.selectedChatType = undefined
            state.selectedChatData= undefined
            state.selectedChatMessage = undefined

        }

    }

})

const {setSelectedChatType, setSelectedChatData, setSelectedChatMessage, closeChat} = chatSlice.actions
export default chatSlice.reducer
