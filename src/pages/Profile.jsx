import React,{useEffect, useState,useRef} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { MoveLeft,Plus,Trash2 } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getColors,colors } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import axios from 'axios'
import {  useNavigate } from 'react-router-dom'


const Profile = () => {
  const imageRef = useRef(null)
  const navigate = useNavigate()
  const {loding,userInfo} = useSelector((state)=>state.auth)

  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [image,setImage] = useState(userInfo.image)
  const [hovered,setHovered] = useState(false)
  const [selectColor,setSelectColor] = useState(0)
  const [loading,setLoading] = useState(false)

  const validateFilds = ()=>{
    if(!firstName){
      toast("First Name is required!..")
      console.log(toast)
      return false
    }
    if(!lastName){
      toast("Last Name is required!..")
      return false
    }
    
    return true
  }

  const profileHandler = async()=>{
    try {
      if (validateFilds()){
        const response  = await axios.put('http://localhost:3000/user/profile-update',{firstName,lastName,color:selectColor},{ withCredentials: true })
        const data = response.data
        console.log(data)
          if(response.status===201 && response.data){
              toast.success('Profile Update Succussfully')
              navigate('/chat')
          }
      }
    } catch (error) {
      console.error(error)
    }
  }
const redirectChat = ()=>{
   navigate('/chat')
}
const ClickImagePicker = ()=>{
  imageRef.current.click()
}
const imageHandler = async(e)=>{
  const file = e.target.files[0]
  try {
    if(file){
      const imageUrl = URL.createObjectURL(file)
      
      const formData = new FormData()
      formData.append('image',file)
      const response = await axios.post('http://localhost:3000/user/upload-image',formData,{withCredentials:true, headers: { "Content-Type": "multipart/form-data" },})
      const data = response.data
      setImage(imageUrl)
      console.log(data)
    }
  } catch (error) {
    console.error(error)
  }
}
const deleteImage = async()=>{
  
  alert('Do You want Delete Profile Image')
  setImage('')
  const response = await axios.delete('http://localhost:3000/user/delete-profile-image',{withCredentials:true})
  const data = response.data
  console.log(data)
  
}

  
    return (
    <div className='bg-[#292a36] h-[100vh]  flex sm:items-center sm:justify-center flex-col gap-5 text-white '>

       <div className='flex flex-col gap w-[100vw] mt-[100px] sm:mt-[0] container '>
          <div className='sm:mb-10'>
          <MoveLeft className='text-white ml-5 mt-5 cursor-pointer' onClick={redirectChat} />

          </div>
          <div className='sm:flex sm:flex-row flex  flex-col items-center text-white'>
              
              <div className='sm:w-1/2 w-fill mb-5'>

              {/* profile pick part start*/}
              <div
                className='w-20 h-20 relative flex justify-center items-center'
                onMouseEnter={()=>setHovered(true)}
                onMouseLeave={()=>setHovered(false)}>
                    
              <Avatar className='w-36 h-36'>
                {loading && <p>Loding</p>}
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
                    ? firstName.charAt(0)
                    :userInfo.email.charAt(0)}
                  </div>
                )

              }
              </Avatar>
              <div className='absolute '>
               
                {hovered && (
                 <div className='w-20 h-20 bg-black/15 rounded-full flex justify-center items-center'>
                   {( image 
                    ? <Trash2 onClick={deleteImage} className='   text-white font-[5px]' /> 
                    :<Plus onClick={ClickImagePicker} className='   text-white font-[5px]'/>)}
                 </div>
                )}
              </div>

            
              </div>
                {/* Profile pick part end */}
                 
              </div>

               <Input 
               type="file"
               ref={imageRef}
               onChange={imageHandler}
               accept=".jpg,  .png, .jpeg, .webp"
               className='hidden'
                />

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
                     value ={userInfo.firstName? userInfo.firstName :firstName}
                     onChange={(e)=>{setFirstName(e.target.value)}}
                    placeholder='First Name'
                    className=' placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 '
                    />
                  </div>
                  <div>
                    <Input
                    name='lastName'
                    type='text'
                     value ={userInfo.lastName ? userInfo.lastName : lastName}
                     onChange={(e)=>{setLastName(e.target.value)}}
                    placeholder='Last Name'
                    className=' placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 '
                    />
                  </div>
                  <div className='flex gap-8'>
                    {
                      colors.map((color,index)=>{
                        return(
                          <div
                          className={`${color} rounded-full w-7 h-7
                            ${
                              ((userInfo.color===0 ?true :userInfo.color )? userInfo.color :selectColor) === index
                              ? 'border-5 border-white'
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
                  <div>
                  <Button 
                  className='bg-purple-500 w-full mt-5 hover:bg-purple-600 transition-all duration-100'
                  onClick={profileHandler}
                  >
                    Save Changes
                  </Button>
                  </div> 
              </div>
          </div>
       </div>
      
       
    </div> 
    )
}


export default Profile
