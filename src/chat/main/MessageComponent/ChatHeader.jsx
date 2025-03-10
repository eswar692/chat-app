
import { X } from 'lucide-react'
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { closeChat } from '@/srtores/chat-slice'
import { getColors } from '@/lib/utils'
import { Avatar,AvatarImage } from '@radix-ui/react-avatar'



const ChatHeader = () => {
  const dispatch = useDispatch()
  const {selectedChatType,selectedChatData} = useSelector((state)=>state.chat) 

  const closeChatHandler =()=>{
    dispatch(closeChat())

  }

  return (
    <div className='h-[10vh] bg-[#242424] flex w-full '>
        
      <div className='text-white flex items-center w-full md:w-1/2  justify-between mx-5'>
          <div>
            {selectedChatType === 'contact' && (
              <div className='flex items-center gap-3'>
                  <Avatar className=''>
                      
                      {
                        selectedChatData.image
                        ?(
                          <AvatarImage 
                          src={selectedChatData.image} 
                          alt='profile pic'
                          className='w-[50px] h-[50px] rounded-full filters brightness-110 contrast '
                          
                          />
                        )
                        :(
                          <div className={` w-[50px] h-[50px] overflow-hidden uppercase  text-[18px] rounded-full  flex items-center justify-center text-white ${getColors(selectedChatData.color)} `}>
                            {selectedChatData.firstName
                            ? selectedChatData.firstName.charAt(0)
                            :selectedChatData.email.charAt(0)}
                          </div>
                        )
        
                      }
                  </Avatar> 
                  <span>
                    {
                      (selectedChatData.firstName && selectedChatData.lastName)
                      ?
                      (`${selectedChatData.firstName} ${selectedChatData.lastName}`)
                      :
                      selectedChatData.email

                    }
                  </span>
              </div>
            )}
          </div>

          <div>
            <X onClick={()=>closeChatHandler()}/>
          </div>
        
      </div>        

    </div>
  )
}

export default ChatHeader
