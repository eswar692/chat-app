
import { X } from 'lucide-react'
import React from 'react'

const ChatHeader = () => {
  return (
    <div className='h-[10vh] bg-[#242424] flex items-center '>
        
        <X className= 'ml-[100px] text-white w-8 h-8 cursor-pointer hover:outline-2 hover:outline-white/50 hover:rounded active:outline-2 active:outline-white' />
        

    </div>
  )
}

export default ChatHeader
