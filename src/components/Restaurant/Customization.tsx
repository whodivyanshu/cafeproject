import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import veg from "@/Images/veg-icon.svg";
import { IoMdClose } from 'react-icons/io';
import { OptionType } from '@/app/restaurants/[id]/page';
import { CartStateContext } from '@/context/cart/cartContext';

;;const Customization = ({ setCount,  optionType, itemName, basePrice, openCustomize, setOpenCustomize }: { setCount: React.Dispatch<React.SetStateAction<number>>;optionType: OptionType[]; itemName: string; basePrice: number; openCustomize: boolean; setOpenCustomize: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [totalAmount, setTotalAmount] = useState(basePrice);
  const [optionCount, setOptionCount] = useState(1);
  const { cartState, setCartState } = useContext(CartStateContext);

  const [optionTypeState, setOptionTypeState] = useState(optionType);
  console.log(optionType)


  useEffect(()=>{
    if(optionCount <= 0){
      setCount(0);
      setOpenCustomize(false);
    }
  },[optionCount,setCount,setOpenCustomize])

  useEffect(() => {
    setOptionTypeState(optionType);
  }, [optionType]);


  const calculateTotalAmount = () => {
    let amount = 0;
    optionTypeState.forEach((option) => {
      option.options.forEach((opt) => {
        if (opt.selected) {
          amount += opt.price;
        }
      });
    });
    setTotalAmount(amount + basePrice );
  };

  const addToCart = () => {
    const existingItemIndex = cartState.findIndex((item) => item.name === itemName);    
    if (existingItemIndex !== -1) {
      const updatedCart = [...cartState];
      updatedCart[existingItemIndex].quantity += optionCount;
      setCartState(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      setCartState([
        ...cartState,
        {
          name: itemName,
          price: totalAmount,
          quantity: optionCount,
          customisable: true,
          optionType: optionTypeState,
          veg: true,
          description: "",
          image: "",
        },
      ]);
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...cartState,
          {
            name: itemName,
            price: totalAmount,
            quantity: optionCount,
            customisable: true,
            optionType: optionTypeState,
            veg: true,
            description: "",
            image: "",
          },
        ])
      );
    }
    setCount(optionCount)
    setOpenCustomize(false);
  };

  return (
    <div className={`fixed bottom-0 left-0 z-10 w-full bg-white rounded-t-3xl h-[60%] duration-500 flex flex-col justify-between transform transition-all ${openCustomize ? "translate-y-0" : "translate-y-full"}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex ">
            <Image alt="veg" src={veg} width={23} height={23} />
            <h3 className="pl-2 text-lg">{itemName}</h3>
          </div>
          <div className="pr-5">
            <IoMdClose onClick={() => {
              setCount(0);
              setOpenCustomize(false);
            
            }} size={25} />
          </div>
        </div>
        <hr className="border-gray-300 border-0.5 my-4" />
        {optionTypeState.map((option) => (
          <div key={option.id} className="space-y-4 text-sm text-gray-500">
            <h3 className="mt-4 font-bold text-black">{option.name}</h3>
            <div className="justify-between flex flex-col gap-3">
              {option.options.map((opt) => (
                <div className="flex justify-between" key={opt.id}>
                  <div>
                    <h3>{opt.name}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <h3>{opt.price !== 0 && "+"} ₹ {opt.price}</h3>
                    <input
                      type={option.multiSelect ? "checkbox" : 'radio'}
                      name="size"
                      checked={opt.selected || false}
                      onChange={() =>{
                        const updatedOptionType = [...optionTypeState];
                        const updatedOption = updatedOptionType.find((o) => o.id === option.id);
                        const updatedOptionIndex = updatedOptionType.findIndex((o) => o.id === option.id);
                        const updatedOpt = updatedOption?.options.find((o) => o.id === opt.id);
                        const updatedOptIndex = updatedOption?.options.findIndex((o) => o.id === opt.id);
                        if (updatedOpt) {
                          if(!option.multiSelect){
                            updatedOptionType[updatedOptionIndex].options.forEach((o) => {
                              o.selected = false;
                            });
                          } 
                            updatedOpt.selected = !updatedOpt.selected;
                          updatedOptionType[updatedOptionIndex].options[updatedOptIndex!] = updatedOpt;
                          setOptionTypeState(updatedOptionType);
                          calculateTotalAmount();
                        
                      }}}
                    />
                  </div>
                </div>
              ))}
            </div>
            <hr className="border-gray-300 border-0.5 my-4" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center p-4 text-sm">
        <div className="flex items-center">
          <button onClick={() => {setOptionCount(optionCount - 1)}} className="px-3 py-1 bg-gray-200 rounded-md">-</button>
          <h3 className="px-3">{optionCount}</h3>
          <button onClick={() => {
            if (optionCount < 10) {
              setOptionCount(optionCount + 1);
            }
          
          }} className="px-3 py-1 bg-gray-200 rounded-md">+</button>
        </div>
        <button onClick={addToCart} className="px-4 py-2 bg-gray-200 rounded-md">{`Add - ₹ ${totalAmount * optionCount}`}</button>
      </div>
    </div>
  );
};

export default Customization;
