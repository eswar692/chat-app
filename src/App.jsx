import React from 'react'
import { Button } from './components/ui/button'
import {BrowserRouter,Routes, Route, Navigate} from 'react-router-dom'
import Auth from './pages/Auth'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth/>} />
        <Route path='*' element={<Navigate to='/auth'/>} />
      </Routes>
    
    </BrowserRouter>
  )
}

export default App
