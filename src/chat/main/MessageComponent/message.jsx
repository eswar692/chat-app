import React ,{useEffect}from 'react'
import ChatHeader from './ChatHeader'
import MessageContainer from './MessageContainer'
import MessageBar from './MessageBar'
import { useSelector,useDispatch } from 'react-redux'



const Message = () => {

  const {loading,userInfo} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()

  useEffect(()=>{

  },[loading,userInfo])

  return (
    <div className={`w-full h-[100vh] bg-[url('/images/b6384cc0c8b9999c7e7d260b9c21bb5f.jpg')] bg-contain  filter  brightness-150  md:flex md:flex-col`} >
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}

export default Message
