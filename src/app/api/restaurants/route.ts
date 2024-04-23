import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET() {
  try {
    const data = await prisma.restaurant.findMany()
    return Response.json(data)
  } catch (error) {
    console.log('Error occurred while fetching data', error)
    return Response.json(
      { error: 'An Error occurred while fetching data' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { name, priceRangeUp, priceRangeDown, rating, image, tag } =
      await request.json()

    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: name,
        priceRangeUp: priceRangeUp,
        priceRangeDown: priceRangeDown,
        rating: rating,
        image: image,
        tag: tag
      }
    })
    return Response.json({
      status: true,
      newRestaurant
    })
  } catch (error) {
    console.log(error)
    return Response.json({
      status: false,
      error
    })
  }
}
