import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Restaurant } from '@/app/restaurants/[id]/page'
import FoodItem from './FoodItem'

const Restro = ({id}: {id: number}) => {
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
    useEffect(() => {
      fetch(`/api/restaurants/${id}`)
        .then((res) => res.json())
        .then((data) => setRestaurant(data))
    }, [id])
    if (!restaurant) return null
    console.log(restaurant)
  
  return (
    <div>
    <Navbar showCart={true} showSearch={true} restaurantId={id} />
    <div className="h-20"></div>
    {restaurant?.categories?.map((category, index)=>{
      return <div key={index}>
        <h1 className="text-xl mx-5 my-5 font-bold">{category.name}</h1>
        {category.items.map((item, index2)=>{
          return <FoodItem key={index2} menuItem={item}/>
        })}
      </div>
    })}
    </div>
  )
}
  


export default Restro