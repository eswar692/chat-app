import React,{useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from "dayjs";
import axios from 'axios';
import { setSelectedChatMessages } from '@/srtores/chat-slice';




const MessageContainer = () => {
  const dispatch = useDispatch()
  const ref = useRef(null)
  const {selectedChatType,selectedChatMessage, selectedChatData} = useSelector(state => state.chat)

  

  useEffect(()=>{

    const getMessages = async()=>{
      try {
    const response = await axios.post('http://localhost:3000/message/all-messages',{id:selectedChatData._id}, {withCredentials:true})
        if(response.data.message){
          dispatch(setSelectedChatMessages(response.data.message))
        }
        
      } catch (error) {
        console.log(error)
      }
    }

    if(selectedChatData._id){
      if(selectedChatType === 'contact') getMessages()
    }
  },[ selectedChatType, selectedChatData, selectedChatMessage])

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedChatMessage.length]);
  
  


  const renderMessages = ()=>{
    let lastDate = null;
  const {selectedChatType,selectedChatMessage, selectedChatData} = useSelector(state => state.chat)

    return selectedChatMessage.map((message, index)=>{
      const messageDate = dayjs(message.timeStamp).format('YYYY-MM-DD');
      const showDate = messageDate !== lastDate;
      lastDate = messageDate
      //console.log(message , selectedChatData._id)

      return(
        <div key={index} className='p-3 relative'>
          {showDate && (
            <div className='  text-white my-2 w-full text-center flex justify-center '>
            <div className='bg-gray-600 '>
            {dayjs(message.timeStamp).format("DD-MMMM-YY")}
            </div>
          </div>)}
            <div className='flex flex-col'>
              {selectedChatType === 'contact' && (
                
                <div className={`${ message.sender !== selectedChatData._id ? "w-full flex justify-end " : " w-full flex justify-start " } `}>
                  <div className={`${ message.sender !== selectedChatData._id 
                    ?  "bg-[#007e1e] text-[#000] text-[15px] p-[8px_12px] rounded-[8px_8px_8px_0] max-w-[75%] border-[1px] border-[#ece5dd]"
                    : "bg-[#1a1a1a] text-[#fff]  text-[15px] p-[8px_12px] rounded-[8px_8px_8px_0] max-w-[75%]" } text-justify break-words break-all`}>
                  {message.content}
                  
                  </div>
                  
                </div>
              )}
              <div className={`${ message.sender !== selectedChatData._id ? "w-full flex justify-end " : " w-full flex justify-start " } `} >
                   {dayjs(message.timeStamp).format('h:mm A')}
                 </div>
              
            </div>
              
            

        </div>
      
      )
    })
    
  }
  

  return (
    <div className='h-[80vh] overflow-y-auto text-white scrollbar-hide relative' >
      {renderMessages()}
      <div ref={ref}  />
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-transparent"></div>
    </div>
  )
}

export default MessageContainer
