import Navbar from '@/components/Navbar'
import { CartStateContext } from '@/context/cart/cartContext';
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useDisclosure, useToast } from '@chakra-ui/react';
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'


const RestaurantBox = ({id}: {id: number}) => {
    const { cartState, setCartState } = useContext(CartStateContext);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const toast = useToast()




    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCartState(JSON.parse(storedCart));
        }
    }, [setCartState]);
    const [showModal, setShowModal] = useState(false)
    
    const placeOrder = async () => {
        try {
            const items = cartState.map(item => ({ name: item.name, quantity: item.quantity }));
            const total = totalPrice; 
            const restaurantId = id;
            const paymentMethod = "cash";
            const status = "pending";
    
            const response = await fetch(`/api/restaurants/${restaurantId}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurantId,
                    total,
                    items,
                    paymentMethod,
                    status
                }),
            });


            
    
            if (response.ok) {
                toast({
          title: 'Order Placed',
          description: "Your order has been placed successfully",
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setCartState([])
            } else {
                toast({
                    title: 'Error Creating Order',
                    description: "There was an error creating your order",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
            }
        } catch (error) {
            console.error('Error occurred while placing order:', error);
        }
    };
    
    

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
            <h1 className='font-bold text-3xl mb-4 text-center'>{cartState.length ? "Your Food Cart" : "Order Placed SuccessFully"}</h1>

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
            {cartState.length && (
            
                <div className="p-4 bg-gray-100 mt-8">
                <h2 className="font-bold text-xl mb-4">Summary</h2>
                <div className="flex justify-between items-center">
                    <p className="text-gray-700">Total Items: {totalItems}</p>
                    <p className="text-gray-700">Total Price: ₹{totalPrice}</p>
                </div>
            </div>
            )}
        </div>
        {cartState.length && (

            <Button onClick={placeOrder}>Place Your Order</Button>
        )}
    </div>
    {showModal && (
         <AlertDialog
         leastDestructiveRef={cancelRef as any}
         motionPreset='slideInBottom'
         onClose={onClose}
         isOpen={isOpen}
         isCentered
       >
         <AlertDialogOverlay />
 
         <AlertDialogContent>
           <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
           <AlertDialogCloseButton />
           <AlertDialogBody>
             Are you sure you want to discard all of your notes? 44 words will be
             deleted.
           </AlertDialogBody>
           
         </AlertDialogContent>
       </AlertDialog>
    )}
</div>
  )
}

export default RestaurantBox