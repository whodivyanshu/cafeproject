import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, ListItem, OrderedList, SimpleGrid, Text } from '@chakra-ui/react'
import { table } from 'console'
import React from 'react'

const OrderBox = ({tableNo}: {tableNo: number}) => {
  return (
    <Card className='h-[400px]'>
    <CardHeader>
      <Heading size='md'>Table No. {tableNo}</Heading>
    </CardHeader>
    <Divider />
    <CardBody>
      <Text>Customer Name: Divyanshu lohar</Text>
      <Text>Mobile No: 9785828796</Text>
      <Text>Email: divyanshulohar2002@gmail.com</Text>
     <Text>Order Details:</Text>
      <OrderedList>
  <ListItem>Lorem ipsum dolor sit amet</ListItem>
  <ListItem>Consectetur adipiscing elit</ListItem>
  <ListItem>Integer molestie lorem at massa</ListItem>
  <ListItem>Facilisis in pretium nisl aliquet</ListItem>
</OrderedList>
    </CardBody>
    <CardFooter className='flex justify-between'>
      <Button>View Full</Button>
      <div className=' flex gap-2'>

      <Button colorScheme='red' _hover={
        {
          bg: 'red.500',
          textColor: 'white'
        }
      
      } variant="outline">Reject</Button>
      <Button colorScheme='green' >Accept</Button>
      </div>
    </CardFooter>
  </Card>
  )
}

export default OrderBox