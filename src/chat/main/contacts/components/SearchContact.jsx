import React,{useState,useEffect,useRef} from 'react'
import { FastForward, Plus } from 'lucide-react'
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
import { ScrollArea } from "@/components/ui/scroll-area"
import axios from 'axios'
import { Avatar,AvatarImage } from '@radix-ui/react-avatar'
import { getColors } from '@/lib/utils'
import { useDispatch,useSelector } from 'react-redux'
import {setSelectedChatType, setSelectedChatData} from '@/srtores/chat-slice'
import useSocket from '@/utils/socket'


const SearchContact = () => {
  const socket = useSocket()
  //console.log(socket)
    const dispatch = useDispatch()
    const {selectedChatType,selectedChatData,} = useSelector((state)=>state.chat)
    //console.log(selectedChatData, selectedChatType)

    const [searchTerm,setSearchTerm] = useState('')
    const [searchData,setSearchData] = useState([])
    // const [contactTabToggle,setContactTabToggle] = useState(false) 
    const [isOpen, setIsOpen] = useState(false);

    const contactHandler = ()=>{
      setIsOpen(prev =>!prev)
    }
      
    
    
      
      useEffect(()=>{
        const searchRoute =async()=>{
          //console.log('aerch api fun start')
          //console.log(searchTerm.length)
         

            if(searchTerm.length === 0){
              setSearchData('')
            } else {
              const res = await axios.post('http://localhost:3000/search/search-contacts',{searchTerm},{withCredentials:true})
              if(res.status===201){
                setSearchData(res.data.contacts)
                //console.log(searchData)
              }else{
                setSearchData('')
              }
           
            }
          } 
          
        
          
        
        const timer = setTimeout(searchRoute,500)
        return ()=>clearTimeout(timer)
      },[searchTerm])

      const contactClick = (contact)=>{
       if(contact){
        dispatch(setSelectedChatType('contact'))
        dispatch(setSelectedChatData(contact)) 
        setSearchTerm('')
        setIsOpen(false)
        // console.log('hi sulllllllllli',)

       }

      
      }




  return (
    <div>

        <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
          <Plus className='w-6 h-6 text-white' onClick={contactHandler}/>      
          </TooltipTrigger>
          <TooltipContent side='top'  className='border-[1px] border-white rounded translate-x-[-30px]'>
            <p>New Contacts</p>
          </TooltipContent>
        </Tooltip>
          </TooltipProvider>

       <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogTrigger>
              
            </DialogTrigger>
            <DialogContent className='w-[80vw] bg-[#212121] border-none text-white top-[40vh]  md:left-[300px] rounded'>
              <DialogHeader>
                <DialogTitle>Search Contacts</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
                
                  <div className='h-[400px] grid grid-rows-[50px_auto]'>
                      <div className='h-full'>
                        <Input type='text' placeholder='Search contact' className='border-none bg-black mt-3 h-12' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />  
                      </div>
                      <div className='  h-full  font-poppins '>
                        {!searchData.length && 
                          <div className='flex h-full justify-center items-center text-white text-2xl'>
                            <h1>Pro Daddy Agency</h1>
                          </div>
                        }
                        {searchData.length>=1 && 
                            <ScrollArea className="h-full w-full rounded-md border-none  p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
                              
                               <div className='flex flex-col gap-5'>
                                  {
                                      searchData.map((item,index)=>{
                                        return(
                                          <div  className='flex flex-col gap-5 ' key={item._id}>
                                            {
                                            <div  className='flex cursor-pointer' onClick={()=>contactClick(item)} >
                                              <Avatar className=''>
                      
                                                {
                                                  item.image
                                                  ?(
                                                    <AvatarImage 
                                                    src={item.image} 
                                                    alt='profile pic'
                                                    className='w-[60px] h-[60px] rounded-full filters brightness-110 contrast '
                                                    
                                                    />
                                                  )
                                                  :(
                                                    <div className={` w-[60px] h-[60px] overflow-hidden uppercase  text-[18px] rounded-full  flex items-center justify-center text-white ${getColors(item.color)} `}>
                                                      {item.firstName
                                                      ? item.firstName.charAt(0)
                                                      :item.email.charAt(0)}
                                                    </div>
                                                  )
                                  
                                                }
                                                </Avatar> 
                                                <div className='flex flex-col gap-0'>
                                                <span className='flex flex-col mx-5 mt-2 '>
                                                  {item.firstName && item.lastName
                                                  ?
                                                  (<span>{item.firstName} {item.lastName}</span>)
                                                  :
                                                  (<span>{item.email}</span>)}
                                                </span>
                                                <span className='text-xs mx-7 '>
                                                  {item.email}
                                                </span>
                                                </div>
                                            </div> 
                                            }
                                          </div>
                                        )
                                      })
                                  }


                               </div>
                              
                            </ScrollArea>
                        }
                        

                      </div>
                  </div>
                
              
            </DialogContent>
        </Dialog>
    </div>
  )
}

export default SearchContact
