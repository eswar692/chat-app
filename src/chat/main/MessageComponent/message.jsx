import React from 'react'
import ChatHeader from './ChatHeader'
import MessageContainer from './MessageContainer'
import MessageBar from './MessageBar'


const Message = ({hidden}) => {
  return (
    <div className={`w-full bg-[url('/images/b6384cc0c8b9999c7e7d260b9c21bb5f.jpg')] bg-contain  filter  brightness-75 ${hidden} md:flex md:flex-col`} >
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}

export default Message
