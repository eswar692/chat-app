import { Input } from '@/components/ui/input'
import { Paperclip, SendHorizontal, SmilePlus } from 'lucide-react'
import React ,{useState,useEffect,useRef} from 'react'
import EmojiPicker from 'emoji-picker-react'

const MessageBar = () => {
    const [Message,setMessage] = useState('')
    const [emoji,setEmoji] = useState(false)
    const emojiRef = useRef(null)
    const emojiToggleRef = useRef(null)

    useEffect(() => {
      // if(emoji){
      //   const timer = setTimeout(()=>{
      //     setEmoji(false)
      //   },3000)
      // }


      const handleClickOutside = (event) => {
        console.log('function call ayindi bro')
        if (emojiRef.current && !emojiRef.current.contains(event.target) && emojiToggleRef.current && !emojiToggleRef.current.contains(event.target)) {
          console.log('ref next ki vacha')
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

    const messageHandler = async()=>{
        console.log(Message)

        setMessage('')
    }

  return (
    <div className=' flex mx-[80px] relative'>
      <div className='flex'>
        <input
         name='message'
         value={Message}
         onChange={(e)=>setMessage(e.target.value)}
         placeholder='Enter Message'
         className='rounded-l-md h-12 w-60 bg-[#515050] border-none focus:text-white focus:outline-none focus:p-5 placeholder:p-5 placeholder:text-white/50 placeholder:font-poppins' />
        <button className='p-2 flex h-12 items-center gap-3 bg-[#515050] rounded-r-md'> 
        <SmilePlus className='text-white' ref={emojiToggleRef} onClick={()=>setEmoji((prev)=>!prev)} />
        <Paperclip className='text-white' />
        </button>
        <button onClick={messageHandler} className='bg-purple-700 ml-4 w-[50px] rounded-md flex items-center justify-center hover:bg-purple-500 transition-all duration-75'>
        <SendHorizontal className='text-white  w-8 h-7 ' />
        </button>
        <div className='absolute bottom-16 left-[100px]' ref={emojiRef}>
          <EmojiPicker  theme='dark' onEmojiClick={handleEmojiClick} open={emoji} autoFocusSearch={true}/>

        </div>
      </div>
    </div>
  )
}

export default MessageBar
