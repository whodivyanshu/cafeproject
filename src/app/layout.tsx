"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartStateContext, defaultCartState } from '@/context/cart/cartContext'
import { useState } from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Providers } from './providers'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const [cartState, setCartState] = useState(defaultCartState);


  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider appearance={{
          baseTheme: dark
        }}>
          <Providers>
            <CartStateContext.Provider value={{ cartState, setCartState }}>
              {children}
            </CartStateContext.Provider>
          </Providers>
        </ClerkProvider>
      </body>
     </html>
  )
}
