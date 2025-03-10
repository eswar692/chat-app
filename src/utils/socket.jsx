import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {addMessage} from '@/srtores/chat-slice'

const SocketContext = createContext(null);
export const useSocket = ()=>{
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }) => {
    const { loading, userInfo, selectedChatType, selectedChatData } = useSelector((state) => ({
        ...state.auth,
        ...state.chat
    }));
    

    const socket = useSocket()
    const dispatch = useDispatch()
    

    const socketRef = useRef(null)
    useEffect(() => {
        if(!loading && userInfo){
            socketRef.current = io("http://localhost:3000", {
                withCredentials: true,
                query: { userId: userInfo.id }
            });
            socketRef.current.on("connect", () => console.log("✅ Socket Connected"));
            socketRef.current.on("disconnect", () => console.log("❌ Socket Disconnected"));

            const recieveMessage = (message)=>{
                console.log(message)
                console.log(selectedChatData)
                console.log(selectedChatType)
               if(selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)){
                dispatch(addMessage(message))
                console.log("hi modda")
               }
               

            }

            socketRef.current.on('recieveMessage',(message)=>{if(message){recieveMessage(message)}})

            return () => socketRef.current.disconnect();
        }
        


        
    },[userInfo])

    return (
        <SocketContext.Provider value={socketRef.current} >
            {children}
        </SocketContext.Provider>
    );
}