import { ArrowRight } from 'lucide-react'
import React from 'react'


const Offer = () => {
  return (
    <>
    <section className='w-full grid grid-cols-1 md:grid-cols-2'>
        {/* image */}
        <div className='w-1/2 '>
            <img src="/images/home1.png" alt="offer image" />
        </div>


        <div>
            <p>Limited Time Offer</p>
            <h1>25% Off All Fashion <br /> Favorites - Limited Time !</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing <br /> elit Illum dolores modi fugit doloremque?</p>


            <button>Shop Now <ArrowRight /></button>
        </div>
    </section>
    </>
  )
}


export default Offer

