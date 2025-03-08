import React from 'react'
import { Avatar,AvatarImage } from '@radix-ui/react-avatar'
import { useSelector } from 'react-redux'
import { getColors } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'
import { Pencil, Power } from 'lucide-react'
import axios from 'axios'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    AlertDialogOverlay,
  } from "@/components/ui/alert-dialog"
  

const Profile = () => {
    const navigate = useNavigate()
    const {loading,userInfo} = useSelector((state)=>state.auth)

    const navigateProfilePage = ()=>{
        return navigate('/profile')
    }

    const logoutRoute = async ()=>{
        try {
            const response = await axios.post('http://localhost:3000/user/logout',{},{withCredentials:true})
            console.log(response.data)
            if(response.status === 201){
              navigate("/auth")
              console.error('navigate trarvatha ')
            }
        } catch (error) {
            console.log(error)
            
        }
    }

  return (
    <div className='absolute bottom-0 h-auto bg-black/30 w-full  text-white font-poppins p-1 grid grid-cols-[2fr,1fr]'>

     <div className='ml-5 w-full flex'>
        <div className='w-2/5'>
        <Avatar className=''>
                   
                   {
                     userInfo.image
                     ?(
                       <AvatarImage 
                       src={userInfo.image} 
                       alt='profile pic'
                       className='w-[60px] h-[60px] rounded-full filters brightness-110 contrast '
                       
                       />
                     )
                     :(
                       <div className={` w-[60px] h-[60px] overflow-hidden uppercase  text-[18px] rounded-full  flex items-center justify-center text-white ${getColors(userInfo.color)} `}>
                         {userInfo.firstName
                         ? userInfo.firstName.charAt(0)
                         :userInfo.email.charAt(0)}
                       </div>
                     )
     
                   }
        </Avatar> 
        </div>  
        <div className='w-3/5 h-full flex items-center'>
             {userInfo.firstName} {userInfo.lastName}
        </div> 
     </div>

     <div className='w-full h-full  flex justify-around items-center'>
       <div>
            <button onClick={navigateProfilePage}>
                    <Pencil/>
             </button>
       </div>
        <div>
            <AlertDialog className=''>
                <AlertDialogTrigger asChild>
                <button className='text-red-500 ' >
                    <Power/>
                </button>
                </AlertDialogTrigger>
                
                   <AlertDialogOverlay className='bg-black/50'/>

                <AlertDialogContent className="bg-[#09090b] border-2 border-white/30 rounded-sm text-white">
                    
                    <AlertDialogHeader>
                    <AlertDialogTitle>Hi {userInfo.firstName}.Do You  want Logout</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel className='border-2 border-white/60 bg-[#09090B] '>No</AlertDialogCancel>
                    <AlertDialogAction onClick={logoutRoute} className='border-2 border-white/60 bg-white text-black' >Yes</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
     </div>


    </div>
  )
}

export default Profile
