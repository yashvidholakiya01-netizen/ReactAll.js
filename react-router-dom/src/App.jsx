import React from 'react'
import Navbar from './layouts/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Product from './pages/Product'
import Contact from './pages/Contact'
import Footer from './layouts/Footer'
import { Route, Routes } from 'react-router-dom'
import Collection from './pages/Collection'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div>
      <Navbar/>
         <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/product" element={<Product/>}/>
           <Route path="/about" element={<About/>}/>
           <Route path="/contact" element={<Contact/>}/>
           <Route path="/product/collection" element={<Collection/>}/>
           <Route path="*" element={<NotFound/>}/>
         </Routes>
      <Footer/>
    </div>
  )
}

export default App