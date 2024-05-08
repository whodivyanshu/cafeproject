'use client'

import Navbar from "@/components/Navbar"
import FoodItem from "@/components/Restaurant/FoodItem"
import { useEffect, useState } from "react"

// Generated Prisma Types
export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  image?: string | null
  veg: boolean
  customisable: boolean
  categoryId: number
  category: Category
  optionType: OptionType[]
}


export type CartState = {
  name: string,
  description: string,
  price: number,
  image?: string | null,
  veg: boolean,
  customisable: boolean,
  quantity: number,
  optionType: OptionType[]
  
}
export type Category = {
  id: number
  name: string
  restaurantId: number
  restaurant: Restaurant
  items: MenuItem[]
}

export type Option = {
  id: number
  name: string
  price: number
  selected: boolean 
  optionTypeId: number
  optionType: OptionType
}



export type OptionType = {
  id: number
  name: string
  menuItemId: number
  required: boolean
  multiSelect: boolean
  menuItem: MenuItem
  options: Option[]
}

export type Restaurant = {
  id: number
  name: string
  priceRangeUp?: number | null
  priceRangeDown?: number | null
  rating?: number | null
  image?: string | null
  tag?: string | null
  categories: Category[]
}

const page = ({ params }: { params: { id: number } }) => {
  const { id } = params
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => setRestaurant(data))
  }, [id])
  if (!restaurant) return null
  console.log(restaurant)

  return <div>
    <Navbar/>
    <div className="h-20"></div>
    {restaurant?.categories?.map((category)=>{
      return <div>
        <h1 className="text-xl mx-5 my-5 font-bold">{category.name}</h1>
        {category.items.map((item)=>{
          return <FoodItem menuItem={item}/>
        })}
      </div>
    })}
    {/* <FoodItem menuItem={restaurant?.categories[0]?.items[0]}/> */}
    </div>
}

export default page
