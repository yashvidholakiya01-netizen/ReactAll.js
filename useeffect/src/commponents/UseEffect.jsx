import React, { useEffect, useState } from 'react';
import { Clock, Users, Flame, ChefHat, Star } from 'lucide-react';
import axios from "axios";

const UseEffect = () => {
  const [index,setIndex] = useState(1);
  const [recipe,setRecipe] = useState({});

    const response = async() => {
        try {
            let data = await axios.get(`https://dummyjson.com/recipes/${index}`);
            setRecipe(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        response();
    },[index]);

  return (
    <>
    <section className='flex items-center justify-between p-6 select-none'>
        <div className='text-2xl rounded-md px-2 py-1 font-bold bg-orange-400 text-white active:bg-orange-300 active:scale-95'onClick={()=>{
            if(index >1){
                setIndex(index - 1);
            }
        }} >
            Prev
        </div>
        
    <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col lg:flex-row mt-10">

      {/* Sidebar Image Section */}
      <div className="lg:w-1/3 relative bg-slate-100">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover min-h-[300px]"
        />
        <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow-sm text-xs font-bold uppercase tracking-wider text-slate-700">
          {recipe.cuisine}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lg:w-2/3 p-8 flex flex-col">

        {/* Header */}
        <div className="flex justify-between items-start border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              {recipe.name}
            </h2>
            <div className="flex items-center gap-4 mt-3 text-sm">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star size={16} fill="currentColor" /> {recipe.rating}
              </span>
              <span className="text-slate-400">({recipe.reviewCount} Reviews)</span>
              <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[11px] font-bold uppercase">
                {recipe.difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold">Prep Time</p>
              <p className="text-sm font-semibold text-slate-800">{recipe.prepTimeMinutes} mins</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
              <ChefHat size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold">Cook Time</p>
              <p className="text-sm font-semibold text-slate-800">{recipe.cookTimeMinutes} mins</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <Users size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold">Servings</p>
              <p className="text-sm font-semibold text-slate-800">{recipe.servings} People</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <Flame size={20} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-slate-400 font-bold">Calories</p>
              <p className="text-sm font-semibold text-slate-800">{recipe.caloriesPerServing} kcal</p>
            </div>
          </div>
        </div>

      </div>
        </div>

           
         <div className='text-2xl rounded-md px-2 py-1 font-bold bg-orange-400 text-white active:bg-orange-300 active:scale-95' onClick={()=> {
            setIndex(index +1)
        }}>
            Next
        </div>
    </section>
    </>
  );
};

export default UseEffect;