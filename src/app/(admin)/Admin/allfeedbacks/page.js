"use client"
import {React,useEffect, useState} from 'react'

import Navbar from '../../../../../components/Navbar/Navbar';
import AllFeedbacks from '../../../../../components/AllFeedbacks/AllFeedbacks'

const page = () => {
  
  return (
  <>

    <Navbar selectedLink={"All Feedbacks"} type={'admin'}/>
  <AllFeedbacks/>
  </>
  )
}

export default page
