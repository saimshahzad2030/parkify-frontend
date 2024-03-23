"use client"
import React, { useEffect, useState } from 'react'
import style from './Adminhome..module.css'
import {Spin} from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios'
import Cookies from 'js-cookie'
const AdminHome = () => {
const [totalUsers,setTotalUsers]=useState(0)
const [totalBookings,setTotalBookings]=useState(0)
const [totalFeedbacks,setTotalFeedbacks]=useState(1)
const [spinVisible,setSpinVisible]=useState(false)
  useEffect(()=>{
    const fetchData = async () => {
      setSpinVisible(true)
      try {
        const token = Cookies.get('token')
        await axios.get(
          'https://parkify-backend-plum.vercel.app/api/user/count',
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        ).then(response=>{
          console.log(response.data)
          setTotalUsers(response.data.totalUsers)
          setTotalBookings(response.data.totalBookings)
          setTotalFeedbacks(response.data.totalBookings)
          setSpinVisible(false)
        }).catch(error=>{
          console.log(error)
          
        })
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call the fetchData function
  },[])
  return (
    <div className={style.adminHomeSection}>
        <h1>Hello Mr Admin.</h1>
<div className={style.homeSectionChild}>
    <div className={style.childDiv} style={{backgroundColor:' rgb(32, 103, 255)'}}>
    <h2>Current Users</h2>
    <Spin spinning={spinVisible}>
    {totalUsers &&  <h3>{totalUsers}</h3>}
</Spin>
 
    </div>
    <div className={style.childDiv}  style={{backgroundColor:' rgb(255, 195, 32)'}}>
    <h2>Current Bookings</h2>
    <Spin spinning={spinVisible}>
    {totalUsers &&  <h3>{totalBookings}</h3>}
    </Spin>
    </div>
    <div className={style.childDiv}  style={{backgroundColor:'  rgb(27, 178, 0)'}}>
    <h2>Total feedbacks</h2>
    <Spin spinning={spinVisible}>
    {totalUsers &&   <h3>{totalFeedbacks}</h3>}
    </Spin>

    </div>
</div>

    </div>
  )
}

export default AdminHome