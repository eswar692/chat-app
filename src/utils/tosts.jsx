import { toast } from "sonner";
import { CircleX } from 'lucide-react';

export const toastError = (message)=>{
    return toast(message,{  
        duration:30000,
        icon:<CircleX/>,
        style:{
          backgroundColor:"red",
          color:"white",
          border:'none',

        },
        action:{
            label:(
                <span>
                    <CircleX/>
                </span>
            ),
            onClick:()=>console.log('toast is working '),
            className:'bg-transparent'
            
            
        }
      })
}
