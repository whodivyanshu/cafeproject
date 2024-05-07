"use client"
import { MenuItem } from '@/app/restaurants/[id]/page'
import Image from 'next/image'
import React, { useState } from 'react'
import vegIcon from "@/Images/veg-icon.svg"
import nonVegIcon from "@/Images/non-veg-icon.svg"
import Customization from './Customization'
const FoodItem = ({menuItem}: {menuItem: MenuItem}) => {
  const [count, setCount] = useState(0)
  return (
      
      <div className=' w-full '>
        <div className='m-4  py-3 flex p-2 border shadow-sm rounded-sm '>
        <div className='w-[70%] flex flex-wrap flex-col'> 
        <h1  className='font-semibold text-md flex gap-3'>   <Image className='mt-1' width="15" height="15" src={menuItem.veg ? vegIcon : nonVegIcon} alt="vegetarian-food-symbol"/>{menuItem.name}</h1>
        <p className='text-[13px] text-gray-500 ml-6 mr-4 max-h-20 overflow-y-scroll'>{menuItem.description}</p>
        <div className='flex gap-4 ml-6'>
          <p className='text-[13px] text-black font-bold mt-2'>₹{menuItem.price}</p>
          </div>
        </div>
        <div className='flex-1 w-[30%] relative flex items-center justify-center'> {/* Added flex and justify-center */}
          <Image src={menuItem.image || ''} className='w-full rounded-lg h-28' width={100} height={100} alt='food-item-image' />
          <button onClick={() =>{ if(count === 0) setCount(1)}} className='absolute bg-[#E0E0E0] -bottom-1  rounded-lg p-0.5 w-[90%] font-semibold'>{count === 0 ? 'Add' : (
            <div className='flex justify-around items-center'>
              <span onClick={ () => setCount(count - 1)}>-</span>
              <span>{count}</span>
              <span onClick={ () =>  count<10 && setCount(count + 1)}>+</span>
            </div>
          )}</button>
        </div>
        </div>
        {count > 0 && <Customization count={count} setCount={setCount} />}

        
    </div>
  )
}

export default FoodItem