"use client"
import React from 'react';

import Navbar from '../../../../../components/Navbar/Navbar';
import AllBookings from '../../../../../components/AllBookings/AllBookings';




const Page = () => {

  
  

  return (
    <>
      
          <Navbar selectedLink="All Bookings" type="admin" />
          <AllBookings />
    
   
    </>
  );
};

export default Page;
