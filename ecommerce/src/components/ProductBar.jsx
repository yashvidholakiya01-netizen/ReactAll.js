import React, { useEffect, useState } from 'react'
import ProductCard from '../ui/ProductCard'
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductBar = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const FetchProduct = async () => {
            try {
                const res = await axios.get("https://dummyjson.com/products?limit=4")
                setProduct(res.data.products)
            } catch (error) {
                console.log(error);
            }
        }
        FetchProduct();
    }, []);
    return (

        <>
            <section className='p-6 flex items-center justify-center'>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
                    {product.map((data) => {
                        return (
                            <Link to={`/product/${data.id}`} key={data.id}>
                                <ProductCard product_data={data} />
                            </Link>
                        );
                    })}

                </div>
            </section>
        </>
    )
}

export default ProductBar