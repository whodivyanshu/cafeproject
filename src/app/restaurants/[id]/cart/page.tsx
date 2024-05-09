"use client"
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { CartState } from '../page';
import { CartStateContext } from '@/context/cart/cartContext';

const Page: React.FC = () => {
      const { cartState, setCartState } = useContext(CartStateContext);
    // const [cartState, setCartState] = useState<CartState[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartState(JSON.parse(storedCart));
        }
    }, []);

    const removeFromCart = (itemName: string) => {
        const updatedCart = cartState.filter((item) => item.name !== itemName);
        setCartState(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateQuantity = (itemName: string, newQuantity: number) => {
        if (newQuantity <= 0) return;

        const updatedCart = cartState.map((item) => {
            if (item.name === itemName) {
                return { ...item, quantity: Math.min(newQuantity, 10) };
            }
            return item;
        });
        setCartState(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalItems = cartState.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cartState.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className='w-full h-full'>
            <Navbar showCart={false} showSearch={false} />
            <div className='pt-20'>
                <div className='p-2'>
                    <h1 className='font-bold text-3xl mb-4'>Your Shopping Cart</h1>

                    <div className='flex flex-col gap-4'>
                        {cartState.map((item, index) => (
                            <div key={index} className='flex bg-white rounded-lg shadow-md h-32 overflow-hidden'>
                                <div className='w-[30%]'>
                                    <Image
                                        src={item.image || '/placeholder-image.jpg'}
                                        alt='item'
                                        className='w-full h-full'
                                        layout='responsive'
                                        width={100}
                                        height={100}
                                    />
                                </div>
                                <div className='w-[70%] p-4'>
                                    <h2 className='font-semibold text-lg mb-2'>{item.name}</h2>
                                    <p className='text-gray-700 mb-2'>₹{item.price}</p>
                                    <div className='flex items-center'>
                                        <button
                                            className='px-3 py-1 bg-gray-200 rounded-md text-gray-700'
                                            onClick={() => updateQuantity(item.name, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className='px-3'>{item.quantity}</span>
                                        <button
                                            className='px-3 py-1 bg-gray-200 rounded-md text-gray-700'
                                            onClick={() => updateQuantity(item.name, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className='px-3 py-1 bg-red-500 rounded-md text-white ml-4'
                                            onClick={() => removeFromCart(item.name)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 bg-gray-100 mt-8">
                        <h2 className="font-bold text-xl mb-4">Summary</h2>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-700">Total Items: {totalItems}</p>
                            <p className="text-gray-700">Total Price: ₹{totalPrice}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
