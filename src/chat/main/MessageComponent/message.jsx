import React ,{useEffect}from 'react'
import ChatHeader from './ChatHeader'
import MessageContainer from './MessageContainer'
import MessageBar from './MessageBar'
import { useSelector,useDispatch } from 'react-redux'
import { connectSoket,disconnectSocket } from '@/srtores/soketSlice'


const Message = ({hidden}) => {

  const {loading,userInfo} = useSelector((state)=>state.auth)
  const {socket} = useSelector((state)=>state.socket)
  const dispatch = useDispatch()

  useEffect(()=>{
   
    if (!loading && userInfo) {
      dispatch(connectSoket(userInfo.id));
    }

    return ()=> dispatch(disconnectSocket())
  },[loading,userInfo,dispatch])

  return (
    <div className={`w-full bg-[url('/images/b6384cc0c8b9999c7e7d260b9c21bb5f.jpg')] bg-contain  filter  brightness-75 ${hidden} md:flex md:flex-col`} >
      <ChatHeader/>
      <MessageContainer/>
      <MessageBar/>
    </div>
  )
}

export default Message
