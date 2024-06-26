'use client'

import Navbar from '@/components/Navbar'
import RestaurantBox from '@/components/RestaurantBox'
import { useEffect, useState } from 'react'

export default function Restaurant() {
  const [restaurents, setRestaurents] = useState([])
  useEffect(() => {
    fetch('/api/restaurants')
      .then(res => res?.json())
      .then(data => setRestaurents(data))
  }, [])

  console.log('restaurents', restaurents)

  console.log(restaurents)
  return (
    <div className="  w-full h-full">
      <Navbar showCart={false} showSearch={false} />
      <div className="pt-20">
        <h1 className="my-3 mx-5">Results</h1>
        <div className=" flex flex-wrap  ">
          {restaurents.map((item, index) => (
            <RestaurantBox data={item} key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
