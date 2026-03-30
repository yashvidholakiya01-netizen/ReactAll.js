import { Link } from "react-router-dom";

 const Card = ({ data }) => {

  return (

   <div className="mb-6 break-inside-avoid perspective">

     <div className="relative w-full h-full duration-500 transform-style-preserve-3d hover:rotate-y-180">

       {/* FRONT */}

       <div

         className="rounded-2xl overflow-hidden shadow-lg backface-hidden"

         style={{ height: data.height }}

       >

         <img

           src={data.image}

           alt={data.name}

           className="w-full h-full object-cover"

         />

         <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-3 text-lg font-semibold capitalize">

           {data.name}

         </div>

       </div>



       {/* BACK */}

       <div

         className="absolute top-0 left-0 w-full h-full rounded-2xl flex items-center justify-center text-center p-4 rotate-y-180 backface-hidden"

         style={{ background: data.color, color: data.textColor, height: data.height }}

       >

         <div>

           <h3 className="text-xl font-bold capitalize">{data.name}</h3>

           <p className="mt-2 text-sm">Explore premium {data.name} collection</p>

           <Link to={`/shop/${data.name}`}>
           <button className="mt-4 px-4 py-2 bg-black text-white rounded-lg">

             Shop Now

           </button>
           </Link>

         </div>

       </div>

     </div>

   </div>

  );

};

export default Card;