import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import veg from "@/Images/veg-icon.svg";
import { IoMdClose } from 'react-icons/io';
import { OptionType } from '@/app/restaurants/[id]/page';

const Customization = ({ setCount, count, optionType, itemName }: { setCount: React.Dispatch<React.SetStateAction<number>>; count: number; optionType: OptionType[]; itemName: string }) => {
  const [totalAmount, setTotalAmount] = useState(139.00);
  const [isOpen, setIsOpen] = useState(count > 0);

  useEffect(() => {
    setIsOpen(count > 0);
  }, [count]);

  const handleOptionChange = (option: any) => {
    if (option.multiSelect) {
      const isSelected = option.selected || false;
      option.selected = !isSelected;
      const price = isSelected ? -option.price : option.price;
      setTotalAmount(totalAmount + price);
    } else {
      setTotalAmount(option.price);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 z-10 w-full bg-white rounded-t-3xl h-[60%] duration-500 flex flex-col justify-between transform transition-all ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className='flex '>
            <Image alt='veg' src={veg} width={23} height={23} />
            <h3 className="pl-2 text-lg">{itemName}</h3>
          </div>
          <div className='pr-5'>
            <IoMdClose onClick={() => setCount(0)} size={25} />
          </div>
        </div>
        <hr className="border-gray-300 border-0.5 my-4" />
        {optionType.map((option) => (
          <div key={option.id} className="space-y-4 text-sm text-gray-500">
            <h3 className='mt-4 font-bold text-black'>{option.name}</h3>
            <div className="justify-between flex flex-col gap-3">
              {option.options.map((opt) => (
                <div className='flex justify-between' key={opt.id}>
                  <div>
                    <h3>{opt.name}</h3>
                  </div>
                  <div className="flex items-center gap-4">
                    <h3>{opt.price !== 0 && "+"} ₹ {opt.price}</h3>
                    <input
                      type={option.multiSelect ? "checkbox" : 'radio'}
                      name="size"
                      checked={opt.selected || false}
                      onChange={() => handleOptionChange(opt)}
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
