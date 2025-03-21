import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import Loading from '@/my/Loding'
import ChatLayout from '@/chat/main/layout'

const Chat = ()=>{
  const navigate = useNavigate()
  const {loading,userInfo} = useSelector((state)=>state.auth)
  
 
  useEffect(()=>{
     if(userInfo.profileSetup===false){
      return navigate('/profile')
    }
  },[userInfo])

    
    
  return(
    <div>
      
      
      <ChatLayout/>

    </div>
  )
}

export default Chat
