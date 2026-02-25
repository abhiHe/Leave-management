import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './starter/Login'
import Register from './starter/Register'
import UserLayout from './user/UserLayout/UserLayout'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/user/*' element={<UserLayout />} />

        
    </Routes>
    </BrowserRouter>
  )
}

export default App