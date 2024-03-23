"use client"
import React, { useState, useEffect } from 'react';

import style from './Allfeedback.module.css'
import { Avatar } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
const AllFeedbacks = () => {
 
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {

        await axios.get(
          'https://parkify-backend-plum.vercel.app/api/user/feedback',
          {
            
            headers: {
              Authorization: `bearer ${Cookies.get(('token'))}`,
            },
          }

        ).then(response => {
          const newData = response.data.data.map((item, index) => ({
           email:item.email,
           feedback:item.feedback
          }));
          setData(newData);
          console.log(response.data.data)
          
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
      <h1 style={{ textAlign: 'center', marginTop: '40px',fontWeight:'bold',fontFamily:'calibri' }}>All Feedbacks</h1>
      <div className={style.allFeedbacksSection}>

        {
          data.map((item, index) => {
            return (
              <div key={index} className={style.feedbackCard}>
                <div className={style.cardRow}>
                  <Avatar
                    style={{
                      backgroundColor: '#fde3cf',
                      color: '#f56a00',
                      width: '50px',
                      height: '50px',
                    }}
                  >
                    {item.email.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <h5>{item.email}</h5>
                    <p>{item.feedback}</p>
                  </div>
                </div>
                    <div className={style.divider}>
                    <div>
                      
                    </div>

                    </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default AllFeedbacks
