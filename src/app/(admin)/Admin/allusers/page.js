"use client"
import {React,useState} from 'react'
import Navbar from '../../../../../components/Navbar/Navbar';
import AllUsers from '../../../../../components/AllUsers/AllUsers'

const page = () => {
 
  
  return (
   <>
  
    <Navbar type={'admin'} selectedLink={'All users'}/>
   <AllUsers/>
   </>
  )
}

export default page
