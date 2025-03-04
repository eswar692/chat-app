import Lottie from 'lottie-react'
import React from 'react'
import animationData from '../../../lottie/Animation - 1740929267289.json'

const DefualtMessage = () => {
  return (
    <div className='hidden  h-[100vh]  md:w-[70Vh]'>
     <Lottie animationData={animationData} loop={true} autoplay={true} speed={3} className='w-[250px] h-[250px]' />
     <div>
        <h1 className='font-bold text-[25px] font-poppins'>
            <span className='text-purple-700'>Welcome</span>
            <span className='text-black'> Pro Daddy Agency</span>
        </h1>
     </div>

    </div>
  )
}

export default DefualtMessage
