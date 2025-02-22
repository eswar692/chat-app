import React, {useEffect,useState} from 'react'
import { Button } from './components/ui/button'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import axios from 'axios'

import { useSelector,useDispatch } from 'react-redux'
import { fetchUser } from './srtores/apiSlice'
import Profile from './pages/Profile'






const App = () => {


  const {userInfo,loading} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()

        useEffect(()=>{
          dispatch(fetchUser())
    
        },[dispatch])   
        console.log(userInfo)
        

      

        

  
    

    const ProfileRoutes = ({children})=>{
         
      if(loading){
        return <h1>loading ....</h1>
      }
     
      return  userInfo.email
       ? (userInfo.profileSetup ? <Navigate to='/chat'/> :<Navigate to='/profile'/>)
       : <Navigate to='/auth' replace/>
   }
   const ChatRoutes = ({children})=>{
    return userInfo.profileSetup ? children : <Navigate to="/profile" />

   }
    
  
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/chat' element={
          <ProfileRoutes>
            <Chat/>
          </ProfileRoutes>
        } />
        <Route path='/profile' element={<Profile/>} />
        <Route path='*' element={<Navigate to='/auth'/>} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
