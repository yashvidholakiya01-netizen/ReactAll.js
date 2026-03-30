import { SearchIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ProductCard from '../ui/ProductCard'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const Shop = () => {
    const [ products, setProducts] = useState([])
   const params = useParams();
    useEffect(() => {
     const FetchAllProducts = async() => {
       if (params.collection) {
         try {
            const res = await axios.get(`https://dummyjson.com/products/category/${params.collection}`)
            setProducts(res.data.products)
        } catch (error) {
            console.log(error)
        }
       } else {
         try {
            const res = await axios.get("https://dummyjson.com/products")
            setProducts(res.data.products)
        } catch (error) {
            console.log(error)
        }
       }
     }
     FetchAllProducts()
    },[])
  return (
 
        <section>
            {/* title */}
            <div className='bg-gray-200 w-full py-10 text-center'>
                <h1 className='text-5xl font-semibold py-4'>Shop</h1>
                <p className='text-lg font-medium text-gray-500'>Home/ Shop</p>
            </div>

            {/* fitlter and products */}
            <div className='py-10'> 
                {/* filter and search */}
                <div className='flex items-center justify-center '>
                    {/* search bar */}
                    <div className='w-3/4 flex items-center border border-red-950 px-2 py-4 gap-4 rounded-full'>
                        <SearchIcon/>
                        <input type="text"  placeholder='Search Product...' className='outline-none text-md w-full'/>
                    </div>
                    {/* filter */}
                    <div className='1/4 bg-red-950 px-2 py-4 rounded-2xl'>
                     <select>
                        <option className='bg-red-950 text-white w-full my-3 rounded-2xl' >Default</option>
                        <option className='bg-red-950 text-white w-full my-3 rounded-2xl' value="">A to Z</option>
                        <option className='bg-red-950 text-white w-full my-3 rounded-2xl' value="">Z to A</option>
                     </select>
                    </div>
                </div>
             
             {/* products div */}
              <div className='felx items-center justify-center'>
                 <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8'>
                {products.map((data) => {
                    return  (
                        <Link to={`/product/${data.id}`} key={data.id}>
                         <ProductCard product_data={data}/>
                        </Link>
                    )
                })
                }
            </div>
              </div>
         </div>

        </section>
   
  )
}

export default Shop