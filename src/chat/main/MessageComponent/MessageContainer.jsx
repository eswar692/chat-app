import React,{useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from "dayjs";



const MessageContainer = () => {
  const {selectedChatType,selectedChatMessage, selectedChatData} = useSelector(state => state.chat)


  const renderMessages = ()=>{
    let lastDate = null;

    return selectedChatMessage.map((message, index)=>{
      const messageDate = dayjs(message.timeStamp).format('YYYY-MM-DD');
      const showDate = messageDate !== lastDate;
      lastDate = messageDate

      return(
        <div key={index}>
          {showDate && (
            <div className='  text-white my-2 w-full text-center flex justify-center '>
            <div className='bg-gray-600 '>
            {dayjs(message.timeStamp).format("DD-MMMM-YY")}
            </div>
          </div>)}
            <div>
              {selectedChatType === 'contact' && (
                <div className={`${selectedChatData._id !== message.sender ? "w-full flex justify-end" : " w-full flex justify-start" }`}>
                  <div className='max-w-[50%] bg-[#222222] px-3 py-2 min-w-[50px] m-3 '>
                  {message.content}
                  </div>
                </div>
              )}
            </div>

        </div>
      
      )
    })
    
  }
  

  return (
    <div className='h-[80vh] overflow-y-auto text-white '>
      {renderMessages()}
      
    </div>
  )
}

export default MessageContainer
