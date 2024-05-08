import { CartState, MenuItem } from '@/app/restaurants/[id]/page';
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react';

export const defaultCartState: CartState[] = [];

interface CartContextType {
  cartState: CartState[];
  setCartState: Dispatch<SetStateAction<CartState[]>>;
}

export const CartStateContext = createContext<CartContextType>({
  cartState: defaultCartState,
  setCartState: () => {}, 
});

export const useCartState = () => useContext(CartStateContext);
