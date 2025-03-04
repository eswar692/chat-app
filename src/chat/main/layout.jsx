import React from 'react'
import Contact from './contact'
import DefualtMessage from './other/defualtMessage'
import Message from './MessageComponent/message'

const ChatLayout = () => {
  return (
    <div className='flex '>
        <Contact/>
        {/* <DefualtMessage/> */}
        <Message hidden='hidden'/>
    </div>
  )
}

export default ChatLayout