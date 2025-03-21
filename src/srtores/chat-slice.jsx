import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        selectedChatType : undefined ,
        selectedChatData : undefined,
        selectedChatMessage : [],
        contact : [],
        active: undefined
    },
    reducers: {
        setSelectedChatType:(state,action)=>{
            state.selectedChatType = action.payload
        },
        setSelectedChatData:(state,action)=>{
            state.selectedChatData= action.payload
        },
        setSelectedChatMessages:(state,action)=>{
            state.selectedChatMessage =action.payload
        },
        closeChat:(state)=>{
            state.selectedChatType = undefined
            state.selectedChatData= undefined
            state.selectedChatMessage = []

        },
        addMessage:(state,action)=>{
 

                
           // }]
            state.selectedChatMessage.push({
                ...action.payload,
                // recipient: state.selectedChatType === 'channel'
                //     ? action.payload.recipient
                //     : action.payload.recipient._id,
                // sender: state.selectedChatType === 'channel'
                //     ? action.payload.sender
                //     : action.payload.sender._id
            });
        },
        setContact :(state, action)=>{
            state.contact = action.payload
        },
        setContactLatest : (state, action)=>{
            state.contact.unshift({...action.payload})
        },
        setActive:(state, action)=>{
            state.active = action.payload
        }

    }

})

export const {
    setSelectedChatType, 
    setSelectedChatData, 
    setSelectedChatMessages, 
    closeChat, 
    addMessage, 
    setContact, 
    setContactLatest,
    setActive
    } = chatSlice.actions
export default chatSlice.reducer
