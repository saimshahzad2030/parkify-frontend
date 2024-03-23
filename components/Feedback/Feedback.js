"use client"
import React,{useState} from 'react'
import { Button ,Input, Alert,message} from 'antd';
import style from './Feedback.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
const { TextArea } = Input;

const Feedback = () => {
    const [value, setValue] = useState('');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

  return (
    <div className={style.feedbackSection}>
       {contextHolder}
        <h3 style={{fontWeight:'bold',fontFamily:'calibri'}}>Submit your feedback</h3>
       
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your feedback :)"
        autoSize={{
          minRows: 3,
          maxRows: 5,
        }}
       className={style.textArea}
      />
      <Button type='primary' onClick={async()=>{
        console.log(value)
        if(value ===""){
          messageApi.info('Type some text pls');

        }
        else{
          try {
            const response = await axios.post('https://parkify-backend-plum.vercel.app/api/user/feedback', 
            { email: Cookies.get('email'), feedback: value },
  {
    headers: {
      Authorization: `bearer ${Cookies.get('token')}`,
    },
  }
            ).then(response=>{
              console.log(response.data.message)
             
              if(response.status===200){
                console.log(response.data.message)
    
                setFeedbackSubmitted(true);
          setValue('')
        messageApi.info(response.data.message);

              }
            }).catch(error=>{
              console.log(error.response.data.message)
            })
            
        } catch (error) {
            console.error('Error logging in:', error);
          
        }
          

          
        }
      }}>Submit</Button>
    </div>
  )
}

export default Feedback
