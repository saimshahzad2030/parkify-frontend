
"use client"
import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, message } from 'antd';
import { useRouter } from 'next/navigation';
import style from './AllUsers.module.css'
import axios from 'axios';
import Cookies from 'js-cookie';
const AllUsers = () => {

  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: 'Total Bookings',
      dataIndex: 'totalbookings',
      align: 'center'

    },
    {
      title: 'Delete User',
      dataIndex: 'deleteuser',
      align: 'center'

    }
  ];

  const router = useRouter();
  const [screenWidth, setScreenWidth] = useState(null);
  const [firstColumn, , thirdColumn] = columns;
  const columnsWithoutBookings = [firstColumn, thirdColumn];
  const [data, setData] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const deleteUser = async (email) => {
    try {

      console.log('email', email)
      await axios.delete(
        'https://parkify-backend-plum.vercel.app/api/user/user',
        {
          data: { email },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${Cookies.get(('token'))}`,
          },
        }
      ).then(response => {
        console.log(response.data.message)
        messageApi.info(response.data.message);
        if (response.status === 200) {
        setData(prevData => prevData.filter(user => user.email !== email));
        }

      }).catch(error => {
        console.log(error.response.data)
        messageApi.info(error.response.data.message);

      })


    } catch (error) {
      console.log('Error:', error)
    }
  }
 

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  useEffect(() => {
    const fetchData = async () => {
      try {

        await axios.get(
          'https://parkify-backend-plum.vercel.app/api/user/user',
          {
            headers: {
              Authorization: `bearer ${Cookies.get('token')}`,
            },
          },

        ).then(response => {
          const newData = response.data.data.map((item, index) => ({
            key: item._id,
            email: item.email,
            
            totalbookings: item.bookings,
            deleteuser: (
              <Button type="primary" danger onClick={() => {
                Modal.confirm({
                  title: 'Confirm',
                  content: `Are you sure you want to delete ${item.email}?`,
                  onOk() {
                    deleteUser(item.email)
                    
                    console.log('OK');
                  },
                  onCancel() {
                    console.log('Cancel');
                  },
                });
                console.log(newData.key)

              }}>
                DeleteUser
              </Button>
            ),
          }));
          setData(newData);
          console.log(newData)
        }
        )

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  


  return (

    <>
      {contextHolder}
      {data.length > 0 && <><h1 style={{ textAlign: 'center', marginTop: '40px', fontWeight: 'bold', fontFamily: 'calibri', marginBottom: '10px' }}>All Users.</h1>
        <Table columns={screenWidth > 500 ? columns : columnsWithoutBookings} dataSource={data} style={{ marginTop: '20px' }} />
      </>}
    </>
  )
};





export default AllUsers
