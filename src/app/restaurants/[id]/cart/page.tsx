"use client"
import React, { useContext, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { CartStateContext } from '@/context/cart/cartContext';
import { Button } from '@chakra-ui/react';
import RestaurantBox from '@/components/Restaurant/RestaurantCart/RestaurantBox';

const page = ({ params }: { params: { id: number } }) => {
  const {id} = params
    return (
       <RestaurantBox id={id} />
    );
};

export default page;
