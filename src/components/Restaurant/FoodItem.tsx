import { MenuItem } from '@/app/restaurants/[id]/page';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import vegIcon from "@/Images/veg-icon.svg";
import nonVegIcon from "@/Images/non-veg-icon.svg";
import Customization from './Customization';
import { CartStateContext } from '@/context/cart/cartContext';

const FoodItem = ({ menuItem }: { menuItem: MenuItem }) => {
  const [count, setCount] = useState(0);
  const { cartState, setCartState } = useContext(CartStateContext);
  const [openCustomize, setOpenCustomize] = useState(false);
  console.log("cartState", cartState)
  const addToCart = () => {
    console.log("addToCart called");

    const existingItemIndex = cartState.findIndex(item => item.name === menuItem.name);
    console.log("existingItemIndex", existingItemIndex)

    if (existingItemIndex !== -1) {
      const updatedCart = [...cartState];
      updatedCart[existingItemIndex].quantity += 1;
      setCartState(updatedCart);
    } else {

      setCartState([...cartState, {
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        customisable: menuItem.customisable,
        optionType: menuItem.optionType,
        veg: menuItem.veg,
        description: menuItem.description,
        image: menuItem.image
      }]);
    }
  };

  useEffect(()=>{
    const existingItemIndex = cartState.findIndex(item => item.name === menuItem.name);
    if(existingItemIndex !== -1){
      setCount(cartState[existingItemIndex].quantity);
    }
  
  },[cartState])

  const removeFromCart = () => {
    if(count === 1){
      setCartState(cartState.filter(item => item.name !== menuItem.name));
      setCount(0);
    } else {
      const existingItemIndex = cartState.findIndex(item => item.name === menuItem.name);
      const updatedCart = [...cartState];
      updatedCart[existingItemIndex].quantity -= 1;
      setCartState(updatedCart);
    }
  };

  return (
    <div className='w-full'>
      <div className='m-4 py-3 flex p-2 border shadow-sm rounded-sm'>
        <div className='w-[70%] flex flex-wrap flex-col'>
          <h1 className='font-semibold text-md flex gap-3'>
            <Image className='mt-1' width="15" height="15" src={menuItem.veg ? vegIcon : nonVegIcon} alt="vegetarian-food-symbol" />
            {menuItem.name}
          </h1>
          <p className='text-[13px] text-gray-500 ml-6 mr-4 max-h-20 overflow-y-scroll'>{menuItem.description}</p>
          <div className='flex gap-4 ml-6'>
            <p className='text-[13px] text-black font-bold mt-2'>₹{menuItem.price}</p>
          </div>
        </div>
        <div className='flex-1 w-[30%] relative flex items-center justify-center'>
          <Image src={menuItem.image || ''} className='w-full rounded-lg h-28' width={100} height={100} alt='food-item-image' />
          <button onClick={() => {
            if (count === 0 && !menuItem.customisable) {
              addToCart();
              setCount(1);
            } else if (count === 0 && menuItem.customisable) {
              setCount(1);
              openCustomize ? setOpenCustomize(false) : setOpenCustomize(true);
            }
          }} className='absolute bg-[#E0E0E0] -bottom-1 rounded-lg p-0.5 w-[90%] font-semibold'>
            {count === 0 ? 'Add' : (
              <div className='flex justify-around items-center'>
                <span onClick={() => {
                  if (count > 0) {
                    removeFromCart(); 
                  }
                }}>-</span>
                <span>{count}</span>
                <span onClick={() => {
                  if (count < 10) {
                    setCount(count + 1);
                    addToCart();
                  }
                }}>+</span>
              </div>
            )}
          </button>
        </div>
      </div>
      {openCustomize && menuItem.customisable && <Customization  openCustomize={openCustomize} setOpenCustomize={setOpenCustomize} setCount={setCount} optionType={menuItem.optionType} itemName={menuItem.name} basePrice={menuItem.price} />}
    </div>
  );
};

export default FoodItem;
