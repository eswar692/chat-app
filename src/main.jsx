import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './App.css'
import { Toaster } from '@/components/ui/sonner'
import { Provider } from "react-redux";
import {store} from'./srtores/strore'

createRoot(document.getElementById('root')).render(
  
  <>
  <StrictMode>

    <Provider store={store}>
      <App/>
    </Provider>
    
    {/* <Toaster closeButton title
  theme="light"
  position="bottom-left"
  toastOptions={{
    classNames: {
      toast: "bg-white text-red-500 shadow-lg h-[5vh] border-r-[2px] border-r-red-500 rounded-[2px] ",
      title: "text-[10px] font-bold text-center ",
      description: "text-gray-300",
      closeButton: "text-black hover:text-red-400",
    },
  }}
/> */}
  </StrictMode>
  
  </>
    
 
)
