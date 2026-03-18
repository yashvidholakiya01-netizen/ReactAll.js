import React, { useState } from 'react'
import axios from "axios";
const ApiFetch = () => {
    const [Data1, setData1] = useState([]);
    const [Data2, setData2] = useState([]);
    const [Data3, setData3] = useState([]);

//    Method 1
function Method1(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((rawdata)=>{
        return rawdata.json();
    })
    .then((data)=>{
        return setData1(data)
    })
    .catch((err)=>{
        console.error(err)
    });
}
//    Method 2 
let Method2 = async () => {
    try {
        let res = await fetch("https://dummyjson.com/products?limit=10") 
        let data = await res.json();
        return setData2(data.products);
    } catch (err) {
        console.error(err)
    }
}
//    Method 3
let Method3 = async () => {
    let res = await axios.get("https://dummyjson.com/recipes?limit=10")
    setData3(res.data.recipes);
    //HTTPS Method
    // GET ==> receive data only
    // POST ==> send data only
    // PATCH ==> update data
    // PUT  ==> upadte data
    // DELETE  ==> delete data
}

  return (
    <>
    {/* method 1 */}
    <section className='w-full h-screen flex flex-col items-center justify-center gap-y-4 p-6 bg-green-100'>
         <h1 className='text-center text-3xl font-bold'> Method 1: fetch - then - then - catch</h1>

         <div className='bg-black p-4 w-full rounded-md overflow-auto h-144 text-white flex flex-wrap items-center justify-center gap-4'> 
            {Data1.map((user,id)=>{
                return (
                <div key={id} className='bg-[#222] rounded-md w-84 p-2 text-xl'>
                   <h1><span className='font-bold text-xl '>Name :</span>{user.name}</h1>
                   <h1><span className='font-bold text-xl '>Email :</span>{user.email}</h1>
                   <h1><span className='font-bold text-xl '>Website :</span>{user.website}</h1>
                </div>
                )
            })}
             </div>
         <button className='w-36 px-4 py-2 text-white bg-green-950 rounded-md text-center font-bold text-xl active:bg-green-200 active:text-green-950 active:scale-95 transition-all' onClick={Method1}> Get Data 1</button>
    </section>

    {/* method 2 */}
    <section className='w-full h-screen flex flex-col items-center justify-center gap-y-4 p-6 bg-blue-100'>
         <h1 className='text-center text-3xl font-bold'>Method 2 : Async - Await - Fetch</h1>

         <div className='bg-black p-4 w-full rounded-md overflow-auto h-144 text-white flex flex-wrap items-center justify-center gap-4'> 
            {Data2.map((pro,id)=>{
                return (
                     <div key={id} className="card w-full h-auto max-w-md bg-gray-50 rounded-[10%] p-2 text-black">
                <div className="bg-gray-300 text-center rounded-b-[12%] rounded-[10%] overflow-hidden">
                    <img src={pro.images[0]}
                     alt="img" 
                     className="w-full max-h-100 object-cover rounded-[10%]"
                     />
                </div>
                <div className="content px-6 py-2 flex justify-between items-center">
                    <div className="details">
                        <h2 className="text-black-50 text-2xl">{pro.title}</h2>
                    </div>
                    <div className="price border-l-2 border-green-400/20 pl-6">
                        <h2 className="text-4xl font-bold">{pro.price} $</h2>
                    </div>
                </div>
            </div>
                )
            })}
             </div>
          <button className='w-36 px-4 py-2 text-white bg-blue-950 rounded-md text-center font-bold text-xl active:bg-blue-200 active:text-blue-950 active:scale-95 transition-all ' onClick={Method2}> Get Data 2</button>
    </section>

    {/* method 3 */}
    <section className='w-full h-screen flex flex-col items-center justify-center gap-y-4 p-6 bg-orange-100'>
         <h1 className='text-center text-3xl font-bold'>
            Method 3 : Async - Await - Axios
        </h1>

        <div className='bg-black p-4 w-full rounded-md overflow-auto h-144 text-white flex flex-wrap justify-center items-center gap-4'>
            {Data3.map((rec,id)=>{
                return(
                    <div key={id} className='bg-[#555] w-64 rounded-xl p-2'>
                        <img src={rec.image} alt="" className='rounded-xl' />
                        <div className=' text-center bg-[#222] my-1 rounded-xl'>
                            <h1>{rec.name}</h1>
                            <h1>{rec.rating} / 5</h1>
                        </div>
                    </div>
                )
            })}  </div>
         <button className='w-36 px-4 py-2 text-white bg-orange-950 rounded-md text-center font-bold text-xl active:bg-orange-200 active:text-orange-950 active:scale-95 transition-all 'onClick={Method3}> Get Data 3</button>
    </section>
    </>
  )
}

export default ApiFetch