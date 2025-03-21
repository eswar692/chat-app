import React from 'react'
import { Loader } from "lucide-react";
import Lottie from 'lottie-react';
import animationData from '../lottie/Animation - 1740991060713'

const Loding = () => {
  return (
    <div className='h-screen  flex items-center justify-center'>
     {/* <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin "></div>
     <Loader className="w-20 h-20 animate-spin text-blue-500" />; */}
     <Lottie
      animationData={animationData}
      loop={true}
      autoplay={true}
      speed={5}
      style={{width:'350px', height:'350px'}}
     />

    </div>
  )
}

export default Loding
