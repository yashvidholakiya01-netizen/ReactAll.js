import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
   <>
     <section className='flex items-center justify-center h-screen w-full flex-col'>
          <h1 className='text-9xl font-bold'> 404</h1>
          <h1 className='text-9xl font-bold'>page not found</h1>
          <Link to="/">
          <button className='bg-black rounded-xl text-white px-4 py-2 font-semibold my-5'>Go to Home page</button>
          </Link>
     </section>
    </>
  )
}

export default NotFound