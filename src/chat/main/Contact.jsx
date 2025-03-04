import React from 'react'
import Profile from './other/profile'
import { Plus } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'


const Contact = () => {
  return (
    <div className='bg-[#2a2e2e] font-poppins w-screen  md:w-[30vw] h-[100vh] relative '>

        <div className='border-b-2 border-white/50 inline-block w-full pt-3 h-auto'>
            <h1 className='font-bold text-xl w-full text-center text-white'>Pro Daddy Agency</h1>      
        </div>

        <div className='ml-5 mt-3 mb-2 grid grid-cols-[4fr,1fr]'>
          <Text text="Direct messages" />
           
          
          <Dialog >
            <DialogTrigger>
            <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
               <Plus className='w-6 h-6 text-white'/>      
              </TooltipTrigger>
              <TooltipContent side='top'  className='border-[1px] border-white rounded translate-x-[-30px]'>
                <p>New Contacts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
            </DialogTrigger>
            <DialogContent className='w-[80vw] bg-[#212121] border-none text-white top-[40vh]  md:left-[300px] rounded'>
              <DialogHeader>
                {/* <DialogTitle>Are you absolutely sure?</DialogTitle> */}
                <DialogDescription>
                  <div className='h-[400px] grid grid-rows-[50px_auto]'>
                      <div className='h-full'>
                        <Input type='text' placeholder='Search contact' className='border-none bg-black mt-3 h-12'/>  
                      </div>
                      <div className=' flex items-center justify-center h-full text-white/50 font-poppins text-xl'>
                        <h1>Welcome Pro Daddy Agency</h1>
                      </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>


        </div>

        <div className='ml-5 mt-3 mb-2'>
          <Text text="Channels" />
        </div>

      
       <Profile/>
        
    </div>
  )
}

const Text = ({text})=>{
  return(
    <span className='uppercase tracking-wider text-white/50'>
      {text}
    </span>
  )
}

export default Contact