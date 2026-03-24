import React from 'react'
import HomePage from './pages/HomePage'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import SideBar from './layouts/SideBar'

const App = () => {
  return (
    <>
    <SideBar/>
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<Login/>}/>
    </Routes>
    </>
  )
}

export default App