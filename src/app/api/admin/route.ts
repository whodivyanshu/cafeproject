import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { restaurantId } = await request.json();
    const data = await prisma.order.findMany({
        where: {
            restaurantId: Number(restaurantId)
        }
    });
    return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.log('Error occurred while fetching data', error);
    return new Response(
      JSON.stringify({ error: 'An Error occurred while fetching data' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
