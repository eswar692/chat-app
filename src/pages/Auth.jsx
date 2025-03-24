import React,{useState} from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import {apiClient} from '../utils/api'
import {register_route} from '../utils/constant'
import axios from 'axios'

import { toastError } from '@/utils/tosts'
import { toast } from 'sonner'
import { Eye,EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';






const Auth = () => {
  const API = import.meta.env.VITE_backend_url;
   
    const navigate = useNavigate();

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const [emailSignup, setEmailSignup] = useState('')
    const [passwordsignup, setPasswordsignup] = useState('')
    const [loginPassShow,setLoginPassShow] = useState(false)
    const [signInPassShow,setSignInPassShow] = useState(false)

    const goToChat = () => {
     return window.location.href = '/chat';
    };

    const loginPasswordShow = ()=>{
      return setLoginPassShow((prev)=>!prev)
    }
    const signupPasswordShow =()=>{
      return setSignInPassShow((prev)=>!prev)
    }

    const loginField = ()=>{
      
      if(!email.length){
        toast('email is required')
        return false
      }
      if(!password.length){
        toast('password is required')
        return false
      }
      return true
    }
    const signup = ()=>{
      const emailValidate =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordValidate = /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/
      
      if(!emailSignup.length || !emailSignup.match(emailValidate) ){
        if(!emailSignup.length){
          toast('email is required')
          return false
        }else{
          toast.error("Please Enter valid email")
          return false
        }
        
      }
      if(!passwordsignup.length || !passwordsignup.match(passwordValidate)){
        if(!passwordsignup.length){
          toast('password is required')
          return false
        }else{
          toast.error("password atleast 4 digita and one special character")
          return false
        }
        
      }
      return true
    }
    const  signupHandler = async (e)=>{
       e.preventDefault();

      
        if (signup()){
          try {
            const res = await axios.post(`${API}user/signup`,{email:emailSignup,password:passwordsignup},{withCredentials:true})
            toastError('Login Successfully',"green")
            setEmailSignup('')
            setPasswordsignup('')
            navigate('/chat')
          } catch (error) {
            toast.error(error?.response?.data.message || "internet error try again")
            console.log(error)
          }
  
        }
        
      
    }

    const loginHandler = async(e)=>{
        e.preventDefault()
      
        if (loginField()){
             try {
              
                  const res = await axios.post(`${API}user/login`,{email,password},{withCredentials:true})
                  
                    
                    toastError('Login Successfully',"green")
                    goToChat()
                    console.log(goToChat())
                    console.log(navigate('/chat'))
                  
              } catch (error) {
                toast(error?.response?.data.message || 'internet error')
              }
 
        }
      }    


    

    
    
  return (
    <div className="flex items-center justify-center w-full h-[100vh]  bg-[url('images/27129.jpg')] bg-cover bg-center">
      <div className='flex '>
        <div className='w-[50vh] h-[70vh] shadow-2xl md:rounded-l-lg   sm:w-[350px] sm:h-[400px] bg-white'>
            <div className='flex justify-center flex-col'>
                <h1 className='m-auto mt-[15px] font-bold text-[35px] flex' >
                  Welcome 
                  <img src='images/360_F_634202691_JX32vgLiKwgglOTztD5DzyNUJ2KN7zWm.jpg' className='w-10 h-12'/>
                  </h1>
                <p className='m-auto text-gray-500 text-[12px] mx-8 text-center font-normal font-sans' >Fill in the details to get started with the best chat app</p>
                
            </div>
            <div className='w-full '>
              <Tabs defaultValue="login" >
                <TabsList className="w-[100%] grid grid-cols-2  bg-transparent">
                    <TabsTrigger value="login" className="tab-trigger-auth-page " >Login</TabsTrigger>
                    <TabsTrigger value="signin" className="tab-trigger-auth-page"  >Signin</TabsTrigger>
                </TabsList>
                <TabsContent value="login"
                className="w-full    ">
                      <div>
                        <form onSubmit={loginHandler}  className='flex h-full items-center justify-center flex-col sm:gap-5 gap-5 mt-5' >
                            <Input 
                            type='text'
                            name='email'
                            autoComplete='email'
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="w-[80%] h-[6vh] border-2 border-gray-400"/>
                            <div className='w-[80%] rounded-lg flex justify-center items-center border-2 border-black/30 mx-3'>
                              <Input 
                              type={loginPassShow ? "text " :"password"} 
                              placeholder="Enter Password"
                              value={password}
                              onChange={(e)=>{setPassword(e.target.value)}}
                              className=" w-[80%] h-[6vh] border-none focus:!outline-none focus:!ring-0"/>
                              <span>
                                {loginPassShow ?<Eye onClick={loginPasswordShow} /> : <EyeOff onClick={loginPasswordShow} /> }
                              </span>
                            </div>

                            <div className='w-[80%] flex justify-end'>
                              <Link to='/password'>
                              <button className='underline text-blue-400'>forgot password</button>
                              </Link>
                            </div>

                            <Button type='submit'  className=" w-[80%] h-[6vh] ">Submit</Button>
                        </form>
                        
                      </div>
                </TabsContent>
                <TabsContent 
                value="signin"
                className="w-full ">
                    
                <form className='flex h-full items-center justify-center flex-col sm:gap-5 gap-3 mt-4' >
{/*                             
                            <Input 
                            type="user" 
                            placeholder="Enter your Name"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="w-[80%] sm:h-[6vh] h-[7vh] text-[13px] sm:border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"/> */}
                            
                            <div className='w-[80%] h-[6vh] border-2 border-gray-400'>
                              <Input 
                            type="email" 
                            placeholder="Enter Email"
                            value={emailSignup}
                            onChange={(e)=>{setEmailSignup(e.target.value)}}
                            className="bg-transparent shadow-none focus:outline-none focus:"/>
                            </div>
                            
                            <div className='w-[80%] rounded-lg flex  border-2 border-black/30 '>
                              <Input 
                              type={signInPassShow ? "text " :"password"} 
                              placeholder="Enter Password"
                              value={passwordsignup}
                              onChange={(e)=>{setPasswordsignup(e.target.value)}}
                              className=" w-[100%] h-[6vh] border-none focus:!outline-none focus:!ring-0 "/>
                              <span>
                                {loginPassShow ?<Eye onClick={signupPasswordShow} /> : <EyeOff onClick={signupPasswordShow} /> }
                              </span>
                            </div>

                            <Button onClick={signupHandler} className=" w-[80%] h-[6vh] ">Submit</Button>
                        </form>
                </TabsContent>
              </Tabs>

            </div>
        
        
        
        </div>
        <div>
          <img src='/images/wp9361388.jpg' className='hidden sm:flex w-[300px] h-[400px] rounded-r-sm' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Auth