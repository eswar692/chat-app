import React ,{useState}from 'react'
import Profile from './components/profile'
import SearchContact from './components/SearchContact'




const Contact = () => {
  


  return (
    <div className='bg-[#2a2e2e] font-poppins w-screen  md:w-[30vw] h-[100vh] relative '>

        <div className='border-b-2 border-white/50 inline-block w-full pt-3 h-auto'>
            <h1 className='font-bold text-xl w-full text-center text-white'>Pro Daddy Agency</h1>      
        </div>

        <div className='ml-5 mt-3 mb-2 grid grid-cols-[4fr_1fr]'>
          <Text text="Direct messages" />
           <SearchContact/>
          
         


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