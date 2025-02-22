import React, {useEffect,useState} from 'react'
import { Button } from './components/ui/button'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import axios from 'axios'
import { setUserInfo } from './srtores/strore'
import { useSelector,useDispatch } from 'react-redux'






const App = () => {

        const userInfo = useSelector((state)=>state.user.userInfo)

        const dispatch = useDispatch()
        const [isDataFetched, setIsDataFetched] = useState(false);

        const PrivateRoutes = ({children})=>{
         
           const userInfo = useSelector((state) => (isDataFetched ? state.user.userInfo : null));
          console.log("checjed",userInfo)
            const isAuth = !!userInfo
           return  isAuth ? children : <Navigate to='/auth' replace/>
        }

        

  
    useEffect(()=>{
      
      const fetchData = async ()=>{

        
             try {
                          const response = await axios.get('http://localhost:3000/user/get-data-token',{ withCredentials: true })
                    const data = response.data
                    
                  if (data) {
                    dispatch(setUserInfo(data))
                    // console.log(data  )
                    setIsDataFetched(true)
                    
                  
                  } else {
                    console.log('error in fetching data through token')
                  }
            } catch (error) {
              console.log(error)
                
           }
        
       }
       
                
    
            

      fetchData()
    },[JSON.stringify(dispatch)])

    

    
  
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        <Route path='/chat' element={
          <PrivateRoutes>
            <Chat/>
          </PrivateRoutes>
        } />
        <Route path='*' element={<Navigate to='/auth'/>} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
