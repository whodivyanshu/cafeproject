"use client"
import OrderBox from '@/components/adminComponents/OrderBox'
import { Image } from '@chakra-ui/next-js'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, GridItem, Heading, SimpleGrid, Stack, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = () => {
            const restaurantId = 2;
            
            fetch('/api/admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ restaurantId })
            })
            .then(res => res?.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
        };
    
        fetchOrders();
        const intervalId = setInterval(fetchOrders, 10000);
    
        return () => clearInterval(intervalId);
    }, []);
  return (
    <Grid
    
  templateAreas={`"header header"
                  "nav main"
                  "nav footer"`}
  gridTemplateRows={'80px 1fr '}
  gridTemplateColumns={'300px 1fr'}
  className='h-screen bg-gray-200'
  gap='1'
  color='blackAlpha.700'
  fontWeight='bold'
>
  <GridItem className='bg-white flex justify-center items-center shadow-md'   pl='2' area={'header'}>
    <Text className='font-bold text-2xl'>Jassi Da Dhaba</Text>
  </GridItem>
  <GridItem pl='2' className='flex flex-col items-center gap-2 py-3 bg-white border' area={'nav'}>
  <Button className='w-[90%] ' colorScheme='blue'>Orders</Button>
  <Button className='w-[90%]' colorScheme='blue'>History</Button>
  <Button className='w-[90%]' colorScheme='blue'>Restaurant Food Items</Button>
  <Button className='w-[90%]' colorScheme='blue'>Restaurant Details</Button>

  </GridItem>
  <GridItem border={1} className='border p-2'  pl='5' area={'main'}>
  <Tabs>
  <TabList>
    <Tab>All Orders</Tab>
    <Tab>Accepted</Tab>
    <Tab>Rejected</Tab>
    <Tab>Completed</Tab>
  </TabList>

  <TabPanels>
    <TabPanel>
    <SimpleGrid spacing={5} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
 
 <OrderBox tableNo={1} />
 <OrderBox tableNo={1} />
 <OrderBox tableNo={1} />
 <OrderBox tableNo={1} />
 <OrderBox tableNo={1} />
 <OrderBox tableNo={1} />

</SimpleGrid>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
    <TabPanel>
      <p>three!</p>
    </TabPanel>
  </TabPanels>
</Tabs>
  

  </GridItem>
 
</Grid>
  )
}

export default page