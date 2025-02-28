import React from 'react'
import Contact from './contact'

const ChatLayout = () => {
  return (
    <div>
        <div className='flex w-full sm:w-[40vw] lg:w-[25vw] h-[100vh] bg-black/80'>
            <Contact/>
        </div>
        <div className='flex '></div>
    </div>
  )
}

export default ChatLayout