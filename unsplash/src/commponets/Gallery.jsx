import { ArrowDown, Bookmark, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from "axios";

const Gallery = () => {
    const [Img, setImg] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    //api fetch
   useEffect(() => {
     const FetchImages = async () => {
         if(loading) return;
         setLoading(true);
         try {
            let res = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=30`);
             setImg((prev) => [...prev, ...res.data]);
         }catch(error){
         console.log(error)
         }finally{
            setLoading(false)
         }   
        };
  FetchImages();
    },[page]);

   
   
     // scroll effect
     useEffect(()=> {
        const handleScroll = () => {
            if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300){
                setPage((prev) => {
                    return prev +1;
                })
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
     },[]);

    return (
        <>
            <section>
                <div className='colums-1 sm:columns-2 md:columns-3 gap-4 p-4'>
                    {Img.map((data) => {
                        return (
                            <div key={data.id} className='relative mb-4 break-inside-avoid shadow group'>
                                {/* image */}
                                <img src={data.download_url} alt="image" className='w-full object-cover' />
                                {/* overlay div */}
                                <div className='absolute top-0 bg-black/50 inset-0 flex flex-col  justify-between p-2 opacity-0 group-hover:opacity-100 transition-all duration-300'>
                                    {/* top icon */}
                                    <div className='flex justify-end gap-2'>
                                        {/* bookmark icon */}
                                        <div className='bg-white p-2 rounded-md'><Bookmark /></div>
                                        {/* plus icon */}
                                        <div className='bg-white p-2 rounded-md'><Plus /></div>
                                    </div>
                                    {/* botton icon */}
                                    <div className='flex items-center justify-between'>
                                        <h1 className='text-white font-bold'>{data.author}</h1>
                                        <div className='bg-white p-2 rounded-md'>
                                            <ArrowDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    )
}

export default Gallery