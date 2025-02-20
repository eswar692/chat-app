import React, {useEffect} from 'react'
import { Button } from './components/ui/button'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import Auth from './pages/Auth'
import {useStore} from './srtores/strore'
import Chat from './pages/Chat'
import axios from 'axios'



const PrivateRoues = ({Children})=>{
  const {userInfo,setUserInfo} = useStore()
 const isAuth = !! userInfo
  
 if (isAuth) {
   return Children
   
 } else {
   return <Navigate to='/auth'/>
 }

}

const App = () => {
  const {setUserInfo, userInfo} = useStore()

  try {
    useEffect(()=>{
            const fetchData = async ()=>{
              const response = await axios.get('http://localhost:3000/user/get-data-token',{ withCredentials: true })
          const data = response.data
          
        if (data) {
          setUserInfo(data)
          console.log(data)
          console.log(userInfo)
        
        } else {
          console.log('error in fetching data through token')
        }
     
      }

      fetchData()
    },[])
    
  } catch (error) {
    console.log("error")
    
  }
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/chat' element={
          <PrivateRoues>
            <Chat/>
          </PrivateRoues>
        } />
        <Route path='*' element={<Navigate to='/auth'/>} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
