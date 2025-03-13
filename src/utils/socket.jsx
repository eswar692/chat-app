import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {addMessage} from '@/srtores/chat-slice'
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const SocketContext = createContext(null);
const useSocket = () => {
    const socket = useContext(SocketContext);
    return useContext(SocketContext)
    
};


export const SocketProvider = ({ children }) => {
    const socketRef = useRef(null)

    const {loading, userInfo} = useSelector(state=>state.auth)
    // const selectChatProperties = createSelector(
    //     (state) => state.chat,
    //     (chat) => ({
    //       selectedChatType: chat.selectedChatType,
    //       selectedChatData: chat.selectedChatData,
    //     })
    //   );
      
      const { selectedChatType, selectedChatData } = useSelector(state=>state.chat);
      





    // const socket = useSocket()
    const dispatch = useDispatch()
    

    useEffect(() => {
        if(!loading && userInfo){
            socketRef.current = io("http://localhost:3000", {
                withCredentials: true,
                query: { userId: userInfo.id }
            });
            socketRef.current.on("connect", () => console.log("✅ Socket Connected"));
            socketRef.current.on("disconnect", () => console.log("❌ Socket Disconnected"));

            // const recieveMessage = (message)=>{ 
            //     console.log(message)
            //     if(!selectedChatData) return;
            //     console.log(selectedChatData)
            //     console.log(selectedChatType)
            //     console.log("hi modda")

            //     dispatch(addMessage(message))
               
               

            // }

            // socketRef.current.on('recieveMessage',recieveMessage)
            console.log('socket')
         return () => socketRef.current.disconnect();

        }
        


        
    },[userInfo])

    return (
        <SocketContext.Provider value={socketRef.current} >
            {children}
        </SocketContext.Provider>
    );
}




export default useSocket;