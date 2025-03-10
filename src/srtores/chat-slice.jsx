import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        selectedChatType : undefined ,
        selectedChatData : undefined,
        selectedChatMessage : [],
    },
    reducers: {
        setSelectedChatType:(state,action)=>{
            state.selectedChatType = action.payload
        },
        setSelectedChatData:(state,action)=>{
            state.selectedChatData= action.payload
        },
        closeChat:(state)=>{
            state.selectedChatType = undefined
            state.selectedChatData= undefined
            state.selectedChatMessage = []

        },
        addMessage:(state,action)=>{
            // state.selectedChatMessage = [
            //     ...state.selectedChatMessage,
            //     {
            //     ...action.payload,
            //     recipient: state.selectedChatType==='channel' ? action.payload.recipient : action.payload.recipient._id,
            //     sender: state.selectedChatType==='channel' ? action.payload.sender : action.payload.sender._id

                
           // }]
            state.selectedChatMessage.push({
                ...action.payload,
                recipient: state.selectedChatType === 'channel'
                    ? action.payload.recipient
                    : action.payload.recipient._id,
                sender: state.selectedChatType === 'channel'
                    ? action.payload.sender
                    : action.payload.sender._id
            });
            //state.selectedChatMessage.push('siva')
        }

    }

})

export const {setSelectedChatType, setSelectedChatData, setSelectedChatMessage, closeChat, addMessage} = chatSlice.actions
export default chatSlice.reducer
