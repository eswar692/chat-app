import { toast } from "sonner";
import { CircleX } from 'lucide-react';

export const toastError = (message,color)=>{
    return toast(message,{  
        duration:3000,
        icon:<CircleX/>,
        style:{
          backgroundColor:`${color}`,
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
           
            
            
        },
       

      })
}


// export const toastSuccess = (message)=>{
//     return toast(message,{  
//         duration:30000,
//         icon:<CircleX/>,
//         style:{
//           backgroundColor:"green",
//           color:"white",
//           border:'none',

//         },
//         action:{
           
//             label:(
//                 <span>
//                     <CircleX/>
//                 </span>
//             ),
//             onClick:()=>console.log('toast is working '),
           
            
            
//         },
       

//       })
// }