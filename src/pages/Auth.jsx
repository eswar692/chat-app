import React,{useState} from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'



const Auth = () => {
    const [email,setEmail]=useState('')
    const [Password,setPassword]=useState('')
  return (
    <div className='flex items-center justify-center w-full h-[100vh]'>
        <div className='w-[60vh] h-[70vh] shadow-2xl  rounded  sm:w-[500px] sm:h-[600px]  '>
            <div className='flex justify-center flex-col'>
                <h1 className='m-auto mt-[15px] font-bold text-[35px]'>Welcome</h1>
                <p className='m-auto'>Fill in the details to get started with the best chat app</p>
                
            </div>
            <div className='w-full '>
              <Tabs defaultValue="login" >
                <TabsList className="w-[100%] grid grid-cols-2  bg-transparent">
                    <TabsTrigger value="login" className="tab-trigger-auth-page " >Login</TabsTrigger>
                    <TabsTrigger value="signin" className="tab-trigger-auth-page"  >Signin</TabsTrigger>
                </TabsList>
                <TabsContent value="login"
                className="w-full h-[400px] ">
                        <form className='flex h-full items-center justify-center flex-col gap-10' >
                            <Input 
                            type="email" 
                            required
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="w-[80%] h-[6vh] border-2 border-gray-400"/>
                            <Input 
                            type="email" 
                            required
                            placeholder="Enter Password"
                            value={Password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className=" w-[80%] h-[6vh] border-2 border-gray-400"/>

                            <Button className=" w-[80%] h-[6vh] ">Submit</Button>
                        </form>
                </TabsContent>
                <TabsContent 
                value="signin"
                className="w-full h-[400px] ">
                    
                <form className='flex h-full items-center justify-center flex-col gap-10' >
                            
                            <Input 
                            type="user" 
                            placeholder="Enter your Name"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="w-[80%] h-[6vh] border-2 border-gray-400"/>
                            
                            <Input 
                            type="email" 
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            className="w-[80%] h-[6vh] border-2 border-gray-400"/>
                            
                            <Input 
                            type="password" 
                            placeholder="Enter Password"
                            value={Password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            className=" w-[80%] h-[6vh] border-2 border-gray-400"/>

                            <Button className=" w-[80%] h-[6vh] ">Submit</Button>
                        </form>
                </TabsContent>
              </Tabs>

            </div>
        </div>
      
    </div>
  )
}

export default Auth
