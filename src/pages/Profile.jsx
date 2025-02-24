import React,{useEffect, useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { MoveLeft,Plus,Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getColors,colors } from '@/lib/utils'
import { Input } from '@/components/ui/input'



const Profile = () => {
  const {loding,userInfo} = useSelector((state)=>state.auth)

const [firstName,setFirstName] = useState('')
const [lastName,setLastName] = useState('')
const [image,setImage] = useState(null)
const [hovered,setHovered] = useState(false)
const [selectColor,setSelectColor] = useState(0)


  
    return (
    <div className='bg-[#1b1c24] h-[100vh]  flex sm:items-center sm:justify-center flex-col gap-5 text-white'>

       <div className='flex flex-col gap w-[80vw] '>
          <div className='sm:mb-10'>
          <MoveLeft className='text-white ml-5 mt-5 ' />
          </div>
          <div className='sm:flex sm:flex-row flex  flex-col items-center text-white'>
              
              <div className='sm:w-1/2 w-fill mb-5'>
              <div
            className='w-20 h-20 relative flex justify-center items-center'
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}>
                    
              <Avatar className='w-20 h-20'>
              {
                image
                ?(
                  <AvatarImage 
                  src={image} 
                  alt='profile pic'
                  className='w-full h-full rounded-full '
                  />
                )
                :(
                  <div className={`overflow-hidden textuppercase w-full h-full text-[30px] rounded-full  flex items-center justify-center text-whit ${getColors(selectColor)} `}>
                    {firstName
                    ? firstName.split('').shift()
                    :userInfo.email.split('').shift()}
                  </div>
                )

              }
              </Avatar>
              <div className='absolute '>
               {
                hovered 
                ? (image ?<Trash2/> :<Plus className='text-white font-[5px] opacity-50'/>)
                : null
               }
              </div>

            
              </div>
              </div>
               
              <div className='w-1/2  flex flex-col gap-3'>
                  <div>
                    <Input
                    name='email'
                    value ={userInfo.email}
                    disabled
                    />
                  </div>
                  <div>
                    <Input
                    name='firstName'
                    type='text'
                     value ={firstName}
                     onChange={(e)=>{setFirstName(e.target.value)}}
                    placeholder='First Name'
                    className=' placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 '
                    />
                  </div>
                  <div>
                    <Input
                    name='lastName'
                    type='text'
                     value ={lastName}
                     onChange={(e)=>{setLastName(e.target.value)}}
                    placeholder='Last Name'
                    className=' placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 '
                    />
                  </div>
                  <div className='flex gap-5'>
                    {
                      colors.map((color,index)=>{
                        return(
                          <div
                          className={`${color} rounded-full w-5 h-5
                            ${
                              (selectColor ? selectColor: selectColor===0 )
                              ? "border-2 border-white"
                              :''
                            }
                          `}
                          key={index}
                          onClick={()=>setSelectColor(index)}
                          >

                          </div>
                        )
                      })
                    }
                  </div>


              </div>
          </div>
       </div>
      
       
    </div> 
    )
  }


export default Profile
