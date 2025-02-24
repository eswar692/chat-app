import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import Loading from '@/my/Loding'

const Chat = ()=>{
  const navigate = useNavigate()
  const {loading,userInfo} = useSelector((state)=>state.auth)
  
 
  useEffect(()=>{
     if(!userInfo.profileSetup){
      return navigate('/profile')
    }
  },[userInfo])

    
    
  return(
    <div>
      
      {loading && <h2>best loading......</h2>}
      {userInfo?.email && <h2>{userInfo.email}</h2>}

    </div>
  )
}

export default Chat
