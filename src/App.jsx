import React, {useEffect,useState} from 'react'
import { Button } from './components/ui/button'
import {BrowserRouter,Routes, Route, Navigate, useLocation} from 'react-router-dom'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import axios from 'axios'
import Loading from './my/Loding'


import { useSelector,useDispatch } from 'react-redux'
import { fetchUser } from './srtores/apiSlice'
import Profile from './pages/Profile'
import { SocketProvider } from './utils/socket'

const ProfileRoutes = ({children})=>{
  const {userInfo,loading} = useSelector((state)=>state.auth)
  if(loading){
    return <Loading/>
  }else if (userInfo){
    return  children
  }else{
      return  <Navigate to='/auth'/>
  }
 
  

  // return  userInfo.email
  //  ? (userInfo.profileSetup ? <Navigate to='/chat'/> :<Navigate to='/profile'/>)
  //  : <Navigate to='/auth' replace/>
}
const AuthRoutes = ({children})=>{
  const {userInfo,loading} = useSelector((state)=>state.auth)
  if(loading){
    return <Loading/>
  }else if (userInfo){
    return  <Navigate to='/chat'/>
  }else{
      return children
  }

}




const App = () => {
    const location = useLocation

  const {userInfo,loading} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

        useEffect(()=>{
          dispatch(fetchUser())
    
        },[dispatch,location.pathname])   
        //console.log(userInfo)
        

      

        

  
    

 
   const ChatRoutes = ({children})=>{
    return userInfo.profileSetup ? children : <Navigate to="/profile" />

   }
    
  
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={
         <AuthRoutes>
          <Auth/>
         </AuthRoutes>
         } />
        <Route path='/chat' element={
        
            <ProfileRoutes>
             <Chat/>
            </ProfileRoutes>
          
         
        } />
        <Route path='/profile' element={
          <ProfileRoutes>
            <Profile/>
          </ProfileRoutes>
        } />
        <Route path='*' element={<Navigate to='/auth'/>} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
