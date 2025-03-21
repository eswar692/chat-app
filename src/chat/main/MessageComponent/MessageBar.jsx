import { Input } from '@/components/ui/input'
import { Paperclip, SendHorizontal, SmilePlus } from 'lucide-react'
import React ,{useState,useEffect,useRef, useCallback} from 'react'
import EmojiPicker from 'emoji-picker-react'
import  useSocket  from '@/utils/socket'
import { useSelector,useDispatch } from 'react-redux'
import { Button } from '@/components/ui/button'
import { addMessage, setContactLatest } from '@/srtores/chat-slice'
import axios from 'axios'


const MessageBar = () => {
    const API = import.meta.env.VITE_backend_url 
    const fileRef = useRef(null) 
    const socket = useSocket()
    //console.log(socket)
    const dispatch = useDispatch()
   
    const {selectedChatType, selectedChatData, contact} = useSelector(state=>state.chat)
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
    //console.log(selectedChatData,selectedChatType)


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
         e.preventDefault()
      // console.log('start')
      //console.log(selectedChatData)
        if(socket?.connected && selectedChatType === 'contact' && selectedChatData){

          const contactArrayInSeperateId = contact.map((item)=>item.contactInfo._id)
         
          if(!contactArrayInSeperateId.includes(selectedChatData._id)){
            dispatch(setContactLatest({contactInfo:selectedChatData}))
          }
          socket.emit(
            'sendMessage',
            {
              sender: userInfo.id,
              recipient: selectedChatData._id,
              messageType: 'text',
              content: message,
              fileUrl: undefined,
            },
            (response) => {
              // Response vachaka dispatch call cheyyadam
              dispatch(addMessage(response));
            }
          );
          
           setMessage('')
          
          

        }
        
        
    }

    const filePickerOpenInFileMessage = ()=>{
      console.log('helloi 1')
      if (fileRef.current){
        fileRef.current.click()
      }

    }
    const fileMessageHandler = async(e)=>{
      console.log('helloi 2')
      const file = e.target.files[0]
      console.log(file)
      if(file){
        try {
            const formData = new FormData()
          formData.append('file',file)
          const response = await axios.post(`${API}message/file-image`, formData, {withCredentials:true})
          console.log(response.data?.file.fileUrl)
        } catch (error) {
          console.log(error)
        }
      }else{
        console.log('no file')
      }

    }
    
    

   

  

  return (
    <div className=' flex justify-center  bg-[#000000]  h-[10vh] items-center'>
      <div className='flex'>
        <div className='flex  rounded bg-[#373737] p-[3px]'>
            <input
            name='message'
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={e=>{if(e.key === 'Enter'){messageHandler(e)}}}
            placeholder='Enter Message'
              // onKeyDown={(e)=>{if(e.key === 'Enter'){messageHandler}}}
            className='rounded-l-md h-12 w-60 bg-[#373737] border-none focus:text-white focus:outline-none focus:p-5 placeholder:p-5 placeholder:text-white/50 placeholder:font-poppins' />
            <button className='p-2 flex h-12 items-center gap-3 bg-[#373737] rounded-r-md'> 
            <SmilePlus className='text-white' ref={emojiToggleRef} onClick={()=>setEmoji((prev)=>!prev)} />
            
            </button>
            <button className='' onClick={()=>filePickerOpenInFileMessage()} >
            <Paperclip className='text-white' />
            </button>
            <input type='file' className='hidden' name='file' ref={fileRef} onChange={fileMessageHandler} accept=".jpg,  .png, .jpeg, .webp"/>
        </div>

        <button onClick={(e)=>messageHandler(e)} className='bg-purple-700 ml-4 w-[50px] h-12 rounded-md flex items-center justify-center hover:bg-purple-500 transition-all duration-75'>
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
