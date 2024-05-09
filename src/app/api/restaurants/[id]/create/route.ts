import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    if (request.method !== 'POST') {
      return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const orderData = await request.json(); 
    const { restaurantId, total, items, paymentMethod, status } = orderData;
    console.log('orderData', restaurantId, total, items, "hello")
    const restroId = JSON.parse(restaurantId)
    const orderItems = JSON.stringify(items)
    const orderTotal = JSON.parse(total)
     await prisma.order.create({
      data: {
        restaurantId: restroId,
        total: orderTotal,
        items: orderItems,
        paymentMethod,
        status
      }
    });

    return NextResponse.json({ message: "Order created successfully" });
  } catch (error) {
    console.error('Error occurred while processing request', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
