'use client'

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
  optionTypeId: number
  optionType: OptionType
}

export type OptionType = {
  id: number
  name: string
  menuItemId: number
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
  // const [restaurant, setRestaurant] = useState<Restaurant | null>(null)

  return <div>{params.id}</div>
}

export default page
