import React from 'react'
import Home from './pages/Home'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Product from './pages/Product'
import Shop from './pages/Shop'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import About from './pages/About'
import Collection from './pages/Collection'
import ContactUs from './pages/ContactUs'

const App = () => {
  return (
    <>
    <Navbar/>
     <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/shop/:collection' element={<Shop />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App