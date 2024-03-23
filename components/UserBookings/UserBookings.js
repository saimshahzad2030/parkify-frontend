
import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, message } from 'antd';
import { useRouter } from 'next/navigation';
import style from './UserBookings.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserBookings = () => {
  const columns = [
    {
      title: 'Parkingarea',
      dataIndex: 'parkingarea',
      align: 'center',
    },
    {
      title: 'Slot',
      dataIndex: 'slot',
      align: 'center',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      align: 'center',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      align: 'center',
    },
    {
      title: 'Cancel Booking',
      dataIndex: 'cancelbooking',
      align: 'center',
    },
  ];

  const router = useRouter();
  const [data, setData] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [apiReceived,setApiRecieved]=useState(false)
  const deleteParking = async (parkingId) => {
    try {
      await axios
        .delete('https://parkify-backend-plum.vercel.app/api/user/bookings', {
          data: { parkingId },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `bearer ${Cookies.get('token')}`,
          },
        })
        .then((response) => {
          messageApi.info(response.data.message);
          if (response.status === 200) {
            setData((prevData) => prevData.filter((parking) => parking.key !== parkingId));
          }
        })
        .catch((error) => {
          messageApi.info(error.response.data.message);
        });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCancelButton = (item) => {

    Modal.confirm({
      title: 'Confirm',
      content: `Are you sure you want to delete booking for slot ${item.slot} of parking area ${item.parkingArea}? `,
      onOk() {
        deleteParking(item._id);
      },
    });
  
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://parkify-backend-plum.vercel.app/api/user/bookings`, {
          headers: {
            Authorization: `bearer ${Cookies.get('token')}`,
          },
        });
        const newData = response.data.data.map((item) => ({
          key: item._id,
          parkingarea: item.parkingArea,
          slot: item.slot,
          startDate: item.startDate,
          endDate: item.endDate,
          cancelbooking: (
            <Button type="primary" danger onClick={() => handleCancelButton(item)}>
              Cancel
            </Button>
          ),
        }));
        setData(newData);
        setApiRecieved(true)

      } catch (error) {
        console.error('Error fetching data:', error);
        setApiRecieved(true)

      }
    };

    fetchData();
  }, []);

  return (
    <div className={style.tableWrapper}>
      {contextHolder}
      {apiReceived && (
        data.length === 0?
        
        <h1 className={style.heading}>No Bookings to show.</h1>
      :
      <>
          <h1 className={style.heading}>Your Bookings.</h1>
          <div className={style.scrollableTable}>
            <Table columns={columns} dataSource={data} />
          </div>
        </>
      )
      }
      
    </div>
  );
};

export default UserBookings;
