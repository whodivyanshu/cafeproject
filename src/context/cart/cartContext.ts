import { MenuItem } from '@/app/restaurants/[id]/page'
import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

export const defaultCartState: MenuItem[] = []

interface CartContextType {
  cartState: MenuItem[];
  setCartState: Dispatch<SetStateAction<MenuItem[]>>;
}

export const CartStateContext = createContext<CartContextType>({
  cartState: defaultCartState,
  setCartState: () => {}
})

export const useCartState = () => useContext(CartStateContext)

