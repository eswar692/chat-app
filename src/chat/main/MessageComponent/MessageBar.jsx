import { Input } from '@/components/ui/input'
import { Paperclip, SendHorizontal, SmilePlus } from 'lucide-react'
import React ,{useState,useEffect,useRef} from 'react'
import EmojiPicker from 'emoji-picker-react'
import  useSocket  from '@/utils/socket'
import { useSelector,useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { addMessage } from '@/srtores/chat-slice'


const MessageBar = () => {

    const socket = useSocket()
    console.log(socket)
   
    const {selectedChatType, selectedChatData} = useSelector(state=>state.chat)
    const {loading, userInfo} = useSelector(state=>state.auth)


    const [message,setMessage] = useState('')
    const [emoji,setEmoji] = useState(false)
    const emojiRef = useRef(null)
    const emojiToggleRef = useRef(null)

    useEffect(() => {
      // if(emoji){
      //   const timer = setTimeout(()=>{
      //     setEmoji(false)
      //   },3000)
      // }
    console.log(selectedChatData,selectedChatType)


      const handleClickOutside = (event) => {
       // console.log('function call ayindi bro')
        if (emojiRef.current && !emojiRef.current.contains(event.target) && emojiToggleRef.current && !emojiToggleRef.current.contains(event.target)) {
         // console.log('ref next ki vacha')
          setEmoji(false);
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
    
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [emoji]);
    

    const handleEmojiClick = (emoji) => {
      setMessage((prev) => prev + emoji.emoji); // Add emoji to input field
    }

    const messageHandler = (e)=>{
      
      // console.log('start')
      //console.log(selectedChatData)
        if(selectedChatType === 'contact'){
         
          // console.log('start 2.0')
          socket.emit('sendMessage',{
            sender:userInfo.id,
            recipient:selectedChatData._id,
            messageType:"text",
            content:message,
            fileUrl:undefined
          })
        setMessage('')
          return true
          

        }
        return false
        
    }
    
      
     if(messageHandler()){
      const recieveMessage = (message)=>{ 
        console.log(message)
        if(!selectedChatData) return;
        console.log(selectedChatData)
        console.log(selectedChatType)
        console.log("hi modda")

        dispatch(addMessage(message))
       
       

    }
      socket.current.on('recieveMessage',recieveMessage)
     }

   

  

  return (
    <div className=' flex justify-center  bg-[#000000]  h-[10vh] items-center'>
      <div className='flex'>
        <input
         name='message'
         value={message}
         onChange={(e)=>setMessage(e.target.value)}
         placeholder='Enter Message'
          // onKeyDown={(e)=>{if(e.key === 'Enter'){messageHandler}}}
         className='rounded-l-md h-12 w-60 bg-[#373737] border-none focus:text-white focus:outline-none focus:p-5 placeholder:p-5 placeholder:text-white/50 placeholder:font-poppins' />
        <button className='p-2 flex h-12 items-center gap-3 bg-[#373737] rounded-r-md'> 
        <SmilePlus className='text-white' ref={emojiToggleRef} onClick={()=>setEmoji((prev)=>!prev)} />
        <Paperclip className='text-white' />
        </button>
        <button onClick={()=>messageHandler()} className='bg-purple-700 ml-4 w-[50px] h-12 rounded-md flex items-center justify-center hover:bg-purple-500 transition-all duration-75'>
        <SendHorizontal className='text-white  w-8 h-7 ' />
        </button>
        <div className='absolute bottom-16 ' ref={emojiRef}>
          <EmojiPicker  theme='dark' onEmojiClick={handleEmojiClick} open={emoji} autoFocusSearch={true} className='emoji-picker'/> 
          {/* autoFocusSearch == ante direct open ayaka seearch pi ki pothundi 
          onEmojiClick == selecte chesina emoji ni fun lo pettdaniki*/}

        </div>
      </div>
    </div>
  )
}

export default MessageBar
