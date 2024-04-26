import { NextPage } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type Restaurant = {
  id: number
  name: string
  priceRangeUp: number
  priceRangeDown: number
  rating: number
  image: string
  tag: string
}

const RestaurantBox: NextPage<{
  data: Restaurant
}> = ({ data }) => {
  const router = useRouter()
  return (
    <div
      onClick={() => {
        router.push(`/restaurants/${data.id}`)
      }}
      className="w-[44%] mx-auto flex flex-col justify-center items-center rounded-2xl my-2  bg-white h-52"
    >
      <Image
        src={data.image}
        alt="image"
        width={100}
        height={100}
        className="w-full h-[60%] rounded-t-2xl"
      />
      <div className=" flex flex-col h-[40%]  p-1">
        <div className="flex justify-between">
          <div>
            <div className="text-sm font-bold">
              {data.name.length > 10
                ? data.name.slice(0, 12) + '...'
                : data.name}
            </div>
            <div className="text-xs">{data.tag}</div>
          </div>
          <div className="flex">
            <p>({data.rating}★)</p>
          </div>
        </div>
        <hr className="py-1" />
        <div className="text-xs">
          Price Range ₹{data.priceRangeDown}-₹{data.priceRangeUp}
        </div>
      </div>
    </div>
  )
}

export default RestaurantBox
