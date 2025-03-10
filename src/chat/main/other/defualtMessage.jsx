import Lottie from 'lottie-react'
import React from 'react'
import animationData from '@/lottie/Animation - 1741455076427.json'

const DefualtMessage = () => {
  return (
    <div className='  h-[100vh]  w-full flex items-center justify-center flex-col bg-black/80'>
      <div className=''>
     <Lottie animationData={animationData} loop={true} autoplay={true} speed={3} className='w-[250px] h-[250px] ' />

      </div>
     <div>
        <h1 className='font-bold text-[25px] font-poppins'>
            <span className='text-purple-500'>Welcome</span>
            <span className='text-white'> Pro Daddy Agency</span>
        </h1>
     </div>

    </div>
  )
}

export default DefualtMessage
