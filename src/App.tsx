import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './starter/Login'
import Register from './starter/Register'
import AdminLayout from './user/AdminLayout/AdminLayout'
import ManagerLayout from './manager/managerlayout/ManagerLayout'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='/admin/*' element={<AdminLayout />} />
      <Route path='/manager/*' element={<ManagerLayout />} />
        
    </Routes>
    </BrowserRouter>
  )
}

export default App