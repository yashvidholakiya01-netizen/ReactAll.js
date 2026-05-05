import React from 'react'
import ProductBar from '../Components/ProductBar'
import DealBar from '../Components/Home/DealBar'
import DiscontBar from '../Components/Home/DiscountBar'
import Newsletter from '../Components/Home/NewsLetter'
import Hero from '../components/home/Hero'
import CategoryBar from '../components/home/CategoryBar'
import Offer from '../components/home/Offer'
import DeatilsBar from '../components/home/DeatilsBar'

const Home = () => {
  return (
    <>
      <Hero />
      <DealBar/>
      <CategoryBar />
      <ProductBar />
      <Offer/>
      <DeatilsBar />
      <DiscontBar/>
      <Newsletter/>
     {/* <ProductBar/> */}
    </>
  )
}

export default Home