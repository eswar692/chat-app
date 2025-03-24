import { getColors } from '@/lib/utils'
import { setContact, setSelectedChatData, setSelectedChatType, setActive } from '@/srtores/chat-slice'
import useSocket from '@/utils/socket'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


const DM = () => {
     
    const socket = useSocket()
    //console.log(socket)
    const {userInfo} = useSelector(state=> state.auth)
    const {contact} = useSelector(state=>state.chat)
    //console.log(contact)
    const dispatch = useDispatch()
    // console.log(contact)
    const {selectedChatMessages, selectedChatData, active} = useSelector(state => state.chat)
    const API = import.meta.env.VITE_backend_url
    useEffect(()=>{
        const fetchContacts = async()=>{
            try {
                const response = await axios.get(`${API}search/get-dm-contacts`,{withCredentials:true})
                if(response.data.message && response.status===201){
                    dispatch(setContact(response.data.message))
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchContacts()
        


    }, [selectedChatMessages])

    





     const contactClick = (contact)=>{
            if(contact){
                dispatch(setSelectedChatType('contact'))
                dispatch(setSelectedChatData(contact)) 
                if(active === !contact._id){

                    dispatch(setActive(selectedChatData._id))
                }
            }
            
          }

    const activeSelected = (contact)=>{
        if(active === !contact._id){

            return dispatch(setActive(selectedChatData._id))
        }
    }
  return (
    <div className='mt-3 text-white w-full'>
        {contact && (
            <div>
                {contact.map((contact, index)=>{
                    return(
                        <div key={contact._id} className={`${active === contact.contactInfo._id ? "bg-purple-400" : "  "} w-full bg-[#444444] pl-5 my-1 p-2 flex gap-5 cursor-pointer`}
                        onClick={()=>contactClick(contact.contactInfo)}>
                            <Avatar className=''>
                   
                   {
                     contact.contactInfo.image
                     ?(
                       <AvatarImage 
                       src={contact.contactInfo.image} 
                       alt='profile pic'
                       className='w-[50px] h-[50px] rounded-full filters brightness-110 contrast '
                       
                       />
                     )
                     :(
                       <div className={` w-[50px] h-[50px] overflow-hidden uppercase  text-[18px] rounded-full  flex items-center justify-center text-white ${getColors(contact.contactInfo.color)} `}>
                         {contact.contactInfo.firstName
                         ? contact.contactInfo.firstName.charAt(0)
                         :contact.contactInfo.email.charAt(0)}
                       </div>
                     )
     
                   }
                            </Avatar> 
                            <div className='flex items-center'>
                            {
                                (contact.contactInfo.firstName && contact.contactInfo.lastName)
                                 ?  `${contact.contactInfo.firstName} ${contact.contactInfo.lastName}`
                                 : contact.contactInfo.email
                             }
                            </div>
                                
                            
                        </div>
                    )
                })}
            </div>
        )}
      
    </div>
  )
}

export default DM
