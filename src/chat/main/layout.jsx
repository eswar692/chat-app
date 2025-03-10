import React from 'react'
import Contact from './contacts/Contact'
import DefualtMessage from './other/defualtMessage'
import Message from './MessageComponent/message'
import useMediaQuery from '@/utils/useMediaQuery'
import { useSelector,useDispatch } from 'react-redux'
import { closeChat } from '@/srtores/chat-slice'
const ChatLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const {selectedChatType,selectedChatData} = useSelector(state=>state.chat)

  return (
    <div className=' md:flex '>
        {
          isMobile
          ?
          (<div className='h-[100vh]'>
             {
              selectedChatType !==undefined
              ?
              <Message/>
              :
              <Contact/>
            }
            
          </div>)
          :
          (<div className='flex w-full'>
            <Contact/>
            {
              selectedChatType !==undefined
              ?
              <Message/>
              :
              <DefualtMessage/>
            }
          </div>)
        }
    </div>
  )
}

export default ChatLayout