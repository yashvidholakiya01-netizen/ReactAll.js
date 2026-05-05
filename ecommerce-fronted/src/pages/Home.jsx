import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
     <div className='w-full h-screen items-center justify-center flex'>
        <Link to="/login">
         <button className='w-full rounded-2xl text-white bg-black'>Go to Login Page</button>
        </Link>
    </div>
    </>
   
  )
}

export default Home