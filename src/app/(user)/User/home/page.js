"use client"
import { React } from 'react'
import Navbar from '../../../../../components/Navbar/Navbar'
import BookParking from '../../../../../components/BookParking/BookParking'

const page = () => {


  return (
    <>

      <Navbar selectedLink={"Book Parking"} type={'user'} />
      <BookParking />

    </>
  )
}

export default page
