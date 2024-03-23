"use client"
import React, { useState,useEffect } from 'react';
import {  Table,Spin } from 'antd';
import style from './AllBookings.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
const columns = [
  {
    title: 'Parkingarea',
    dataIndex: 'parkingarea',
    align:'center'
  },
  {
    title: 'Slot',
    dataIndex: 'slot',
    align:'center'

  },
  {
    title: 'Date',
    dataIndex: 'date',
    align:'center'

  },

  {
    title: 'Booked By',
    dataIndex: 'bookedby',
    align:'center'

  },
];




const AllBookings = () => {
  const [data, setData] = useState([])
  const [spinVisible,setSpinVisible]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setSpinVisible(true)
      try {

        await axios.get(
          'https://parkify-backend-plum.vercel.app/api/user/allBookings',
          {
            headers: {
              Authorization: `bearer ${Cookies.get('token')}`,
            },
          },

        ).then(response => {
          const newData = response.data.data.map((item) => ({
            key: item._id,
            parkingarea: item.parkingArea,
            
            slot: item.slot,
            date:item.startDate,
            hours:item.hours,
            bookedby:item.bookedBy
          }));
          setData(newData);
          console.log(newData)
          setSpinVisible(false)
        }
        
        )

      } catch (error) {
        console.error('Error fetching data:', error);
        setSpinVisible(false)
      }
    };

    fetchData();
  }, []);
  


 
  return(
    <>
    

    {data.length > 0 &&
     
    <>
    <Spin spinning={spinVisible}>
    <h1 style={{textAlign:'center',marginTop:'40px',marginBottom:'10px',fontWeight:'bold',fontFamily:'calibri'}}>All Bookings.</h1>
    
    <div className={style.scrollableTable}>
            <Table columns={columns} dataSource={data} />
          </div></Spin>
    
    
    </>
    }
     </>
  )
};
export default AllBookings;