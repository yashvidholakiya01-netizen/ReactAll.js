import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/login'
import JoinUs from './pages/JoinUs'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'

const App = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/joinus' element={<JoinUs/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/edit-profile' element={<EditProfile/>} />
    </Routes>
  )
}

export default App