import React from 'react'
import { Loader } from "lucide-react";

const Loding = () => {
  return (
    <div className='h-[100vh] bg-gray-200 flex items-center justify-center'>
     <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin "></div>
     {/* <Loader className="w-20 h-20 animate-spin text-blue-500" />; */}

    </div>
  )
}

export default Loding
