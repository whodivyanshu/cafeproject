"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartStateContext, defaultCartState } from '@/context/cart/cartContext'
import { useState } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [cartState, setCartState] = useState(defaultCartState);


  return (
        <ClerkProvider appearance={{
          baseTheme: dark
        }}>
    <html lang="en">
      <CartStateContext.Provider value={{ cartState,setCartState }}>


      <body className={inter.className}>{children}</body>
      </CartStateContext.Provider>
    </html>
        </ClerkProvider>
  )
}
