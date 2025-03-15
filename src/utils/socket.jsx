import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {addMessage} from '@/srtores/chat-slice'
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

const SocketContext = createContext(null);
const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket.current?.connected ? socket.current : null;
    
};


export const SocketProvider = ({ children }) => {

    const socketRef = useRef(null)

    const {loading, userInfo} = useSelector(state=>state.auth)
    console.log(socketRef,"happi holli")
    
    const dispatch = useDispatch()
    
    const {selectedChatData,selectedChatType} = useSelector(state=>state.chat)

    useEffect(() => {
        console.log("Before Connection:", socketRef.current); // Check this
        if(!loading && userInfo){
            socketRef.current = io("http://localhost:3000", {
                withCredentials: true,
                transports: ['websocket'],
                query: { userId: userInfo.id }
            });
    console.log(socketRef.current,"happi pongal")

            socketRef.current.on("connect", () => console.log("✅ Socket Connected"));
            socketRef.current.on("disconnect", () => console.log("❌ Socket Disconnected"));

            // const recieveMessage = (message)=>{ 
            //     console.log(message)
            //     if(selectedChatType !== undefined && selectedChatData._id === message.recipient._id){
            //         console.log('problem 1')
            //     dispatch(addMessage(message))
            //     console.log('problem 2')

            //     }
               
               

            // }

            // socketRef.current.on('recieveMessage',recieveMessage)
            console.log('socket')
         return () => {
           // socketRef.current.off('receiveMessage', recieveMessage);
            socketRef.current.disconnect();
         }

        }
        


        
    },[userInfo, loading])

    useEffect(() => {
        if (socketRef.current) {
            console.log('emi ra upayegam')
            const receiveMessage = (message) => {
                console.log('📩 Received Message:', message);

                // 🔥 Latest Redux state ni ikada use chestunnam
                if (selectedChatType) {
                    console.log('✅ Message Matches Current Chat');
                    dispatch(addMessage(message));
                } else {
                    console.log('❌ Message Does Not Match Current Chat');
                }
            };

            socketRef.current.on('recieveMessage', receiveMessage);

            return () => {
                socketRef.current.off('receiveMessage', receiveMessage);
            };
        }
    }, [selectedChatData, selectedChatType]);

    return (
        <SocketContext.Provider value={socketRef} >
            {children}
        </SocketContext.Provider>
    );
}




export default useSocket;