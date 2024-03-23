"use client"
import {React} from 'react'

import Navbar from '../../../../../components/Navbar/Navbar'
import UserBookings from '../../../../../components/UserBookings/UserBookings'

const page = () => {

  return ( 
    <>
  
    <Navbar selectedLink={"View Bookings"}  type={'user'}/>
    <UserBookings/>
    </>
    )
}

export default page
