import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function GET(request: Request) {
  try {
    const restaurantId = request.url.split('/').pop()
    console.log({restaurantId,r:request.body,h:request.headers})
    const data = await prisma.restaurant.findUnique({
      where: {
        id: Number(restaurantId)
      },
      include: {
        categories: {
          include: {
            items: {
              include: {
                optionType: {
                  include: {
                    options: true
                  }
                }
              }
            }
          }
        }
      }
    })
    return Response.json(data)
  } catch (error) {
    console.log('Error occurred while fetching data', error)
    return Response.json(
      { error: 'An Error occurred while fetching data' },
      { status: 500 }
    )
  }
}
