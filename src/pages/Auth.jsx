import React,{useState} from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import {apiClient} from '../utils/api'
import {register_route} from '../utils/constant'
import axios from 'axios'




const Auth = () => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

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
    const  loginHandler = async (e)=>{
       e.preventDefault();

      if (loginField() ){
        const api = await apiClient.post('/user/signup',{email,password})
        console.log(api.data)
      }
    }

    
    
  return (
    <div className="flex items-center justify-center w-full h-[100vh] flex bg-[url('images/27129.jpg')] bg-cover bg-center">
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
                        <form  className='flex h-full items-center justify-center flex-col sm:gap-10 gap-5 mt-5' >
                            <Input 
                            type="email" 
                            
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="w-[80%] h-[6vh] border-2 border-gray-400"/>
                            <Input 
                            type="password" 
                           
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className=" w-[80%] h-[6vh] border-2 border-gray-400"/>

                            <Button type='submit'  className=" w-[80%] h-[6vh] ">Submit</Button>
                        </form>
                </TabsContent>
                <TabsContent 
                value="signin"
                className="w-full ">
                    
                <form className='flex h-full items-center justify-center flex-col sm:gap-5 gap-3 mt-4' >
                            
                            <Input 
                            type="user" 
                            placeholder="Enter your Name"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="w-[80%] sm:h-[6vh] h-[7vh] text-[13px] sm:border-2 border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                            
                            <Input 
                            type="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="w-[80%] h-[6vh] border-2 border-gray-400"/>
                            
                            <Input 
                            type="password" 
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className=" w-[80%] h-[6vh] border-2 border-gray-400"/>

                            <Button onClick={loginHandler} className=" w-[80%] h-[6vh] ">Submit</Button>
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
