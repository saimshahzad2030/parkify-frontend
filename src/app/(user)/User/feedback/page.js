"use client"
import {React,useEffect, useState} from 'react'

import Navbar from '../../../../../components/Navbar/Navbar'
import Feedback from '../../../../../components/Feedback/Feedback'
const page = () => {
  
  return ( 
    <>
   <Navbar selectedLink={"Feedback"} type={'user'}/>
   <Feedback/>
    </>
    )
}

export default page
