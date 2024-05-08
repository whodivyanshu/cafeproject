import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import veg from "@/Images/veg-icon.svg";
import { IoMdClose } from 'react-icons/io';

const Customization = ({ setCount, count }: { setCount: React.Dispatch<React.SetStateAction<number>>; count: number }) => {
  const [totalAmount, setTotalAmount] = useState(139.00);
  const [isOpen, setIsOpen] = useState(count > 0);

  useEffect(() => {
    setIsOpen(count > 0);
  }, [count]);

  const basePrice250ML = 139.00;
  const basePrice400ML = 220.00;
  const iceCreamToppingPrice = 30.00;

  const handleSizeChange = (price: number) => {
    setTotalAmount(price);
  };

  const handleToppingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTotal = e.target.checked ? totalAmount + iceCreamToppingPrice : totalAmount - iceCreamToppingPrice;
    setTotalAmount(newTotal);
  };

  return (
    <div className={`fixed bottom-0 left-0 z-10 w-full bg-white rounded-t-3xl h-[60%] duration-500 flex flex-col justify-between transform transition-all ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className='flex '>
            <Image alt='veg' src={veg} width={23} height={23} />
            <h3 className="pl-2 text-lg">Americano</h3>
          </div>
          <div className='pr-5'>
            <IoMdClose onClick={()=>{
              setCount(0)
            }} size={25} />
          </div>
        </div>
        <hr className="border-gray-300 border-0.5 my-4" />
        <div className="space-y-4 text-sm text-gray-500">
          <div className="flex justify-between">
            <div>
              <h3>250 ML</h3>
            </div>
            <div className="flex items-center">
              <h3>₹ {basePrice250ML}</h3>
              <input checked type="radio" name="size" value={basePrice250ML} onChange={() => handleSizeChange(basePrice250ML)} />
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <h3>400 ML</h3>
            </div>
            <div className="flex items-center">
              <h3>₹ {basePrice400ML}</h3>
              <input type="radio" name="size" value={basePrice400ML} onChange={() => handleSizeChange(basePrice400ML)} />
            </div>
          </div>
        </div>
        <hr className="border-gray-300 border-0.5 my-4" />
        <div className="text-sm text-gray-500">
          <h3>Topping</h3>
          <div className="flex justify-between">
            <div>
              <h3>Ice Cream Topping</h3>
            </div>
            <div className="flex items-center">
              <h3>₹ {iceCreamToppingPrice}</h3>
              <input type="checkbox" onChange={handleToppingChange} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-4 text-sm">
        <div className="flex items-center">
          <button onClick={() => setCount(count - 1)} className="px-3 py-1 bg-gray-200 rounded-md">-</button>
          <h3 className="px-3">{count}</h3>
          <button onClick={() => setCount(count + 1)} className="px-3 py-1 bg-gray-200 rounded-md">+</button>
        </div>
        <button className="px-4 py-2 bg-gray-200 rounded-md">{`Add - ₹ ${totalAmount}`}</button>
      </div>
    </div>
  );
};

export default Customization;
