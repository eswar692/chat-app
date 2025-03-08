import React from 'react'
import Contact from './contacts/Contact'
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