"use client"

import React, { useState ,useRef} from 'react';
import { Button, Form, Input, Modal,Spin,message} from 'antd';
import style from './UserLogin.module.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

import axios from 'axios';

const UserLogin = () => {
  const [messageApi, contextHolder] = message.useMessage();
                   
  const formRef = useRef();
  const router = useRouter();
  const [spinVisible, setSpinVisible] = useState(false);

  const [loginFormSelected, setLoginFormSelected] = useState(true);
  const [verificationEmailSent,setVerificationEmailSent]=useState(false)
  const [emailVerified,setemailVerified]=useState(false)
  const validateEmail = (_, value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value || emailRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject('Invalid email format');
  };
  const onFinish2 = (values) => {
    setSpinVisible(true)
    if(!loginFormSelected){
      (async () => {
        
        try {
          const response = await axios.post('https://parkify-backend-plum.vercel.app/api/user/signup', {
            email: values.email,
            password: values.password,
            username: values.username
          }).then(response => {
            console.log(response.data)
            
            if (response.status === 200) {
              Cookies.set('token', response.data.token);
              Cookies.set('type', 'user');
        setSpinVisible(false)
              
              messageApi.info(response.data.message)
              router.push('/User/home')
            }
          }).catch(error => {
        setSpinVisible(false)

            messageApi.info(error.response.data.message)

          })
    
        } catch (error) {
          console.error('Error logging in:', error);
        }
      })()
    }
    if(loginFormSelected){
      (async () => {
    setSpinVisible(true)
        
      try {
        const response = await axios.post('https://parkify-backend-plum.vercel.app/api/user/login', {
          email: values.email,
          password: values.password
        }).then(response => {
  
          if (response.status === 200) {
            Cookies.set('token', response.data.token);
           
            Cookies.set('type', 'user');

            setSpinVisible(false)
            console.log(response.data)
            messageApi.info(response.data.message)
            response.data.role==='admin'?router.push('/Admin/adminhome'):router.push('/User/home')

            

          }
        }).catch(error => {
        setSpinVisible(false)

          console.log(error.response.data)
          
          messageApi.info(error.response.data.message)

        })
  
      } catch (error) {
        console.error('Error logging in:', error);
      }
    })()
    }
      

    

    
    
    
    console.log('Success:', values);
  };
  const onFinishFailed2 = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };




  return (
    <>
     {contextHolder}
      <div className={style.textDiv}
      
      >
     </div>
      <Spin spinning={spinVisible}>
      <Form
      ref={formRef}
        name="signup"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 400,
          marginTop:'20px'
          // display: loginFormSelected ? 'none' : ''
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish2}
        onFinishFailed={onFinishFailed2}

        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
            {
              validator: validateEmail,
            },
          ]}
          style={{ marginBottom: '5px', 
        display:loginFormSelected?'':!verificationEmailSent?'':'none'
        }}
        >
          <Input />
          </Form.Item>
        <Form.Item

          label="Token"
          name="token"
          rules={[
            {
              required: loginFormSelected?false:true,
              message: 'Please input your token!',
            }
          ]}
          style={{
            marginBottom: '5px',
            display:!loginFormSelected&&verificationEmailSent && !emailVerified?'':'none'
          }}


        >
          <Input />
        </Form.Item>
        <Form.Item

          label="Username"
          name="username"
          rules={[
            {
              required: loginFormSelected?false:true,
              message: 'Please input your username!',
            }
          ]}
          style={{
            marginBottom: '5px',
            display:!loginFormSelected && verificationEmailSent && emailVerified?'':'none'
          }}


        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          style={{
            
            display:loginFormSelected?'':verificationEmailSent && emailVerified?'':'none'
          }}
        >
          <Input.Password />
        </Form.Item>

        <div className={style.buttonDiv} style={{
            display:!verificationEmailSent || !emailVerified?'':'none',
            marginTop:'30px'}}>


          <Button type="primary"
          style={{display:loginFormSelected?'none':''}}
            onClick={() => {
            if(!loginFormSelected && !verificationEmailSent){
              const values = formRef.current.getFieldsValue();
              validateEmail(null,values.email).then(() => {
                if(values.email==='' || values.email ===undefined){
                  messageApi.info('Enter Email to proceed');
                }
                else{
                  (async () => {
setSpinVisible(true)

                    try {
                      const response = await axios.post('https://parkify-backend-plum.vercel.app/api/user/verificationemail', {
                        email: values.email,
                      });
                
                      if (response.status === 200) {
setSpinVisible(false)

                        messageApi.info(response.data.message)
setVerificationEmailSent(true)

                      }
                    } catch (error) {
setSpinVisible(false)
messageApi.info(error.response.data.message)
                      
                    }
                  })();
                }
              })
              .catch(error => {
                messageApi.info(error);

              });
             
          
            }
            if(!loginFormSelected && verificationEmailSent && !emailVerified){
              const values = formRef.current.getFieldsValue();
             
                if(values.token==='' ){
                  messageApi.info('Enter Token to proceed');
                }
                else{
                  (async () => {
setSpinVisible(true)

                    try {
                      const response = await axios.post('https://parkify-backend-plum.vercel.app/api/user/match-token', {
                        email: values.email,
                        token:values.token
                      });
                
                      if (response.status === 200) {
setSpinVisible(false)

                        messageApi.info(response.data.message)
setemailVerified(true)

                      }
                    } catch (error) {
setSpinVisible(false)

                      messageApi.info(error.response.data.message)

                    }
                  })();
                }
           
            
             
          
            }


            }}>
           {!verificationEmailSent?'Next':'VerifyEmail'}
          </Button>





        </div>
        <div className={style.buttonDiv} style={{
            display:loginFormSelected?'':verificationEmailSent && emailVerified?'':'none'}}>


          <Button type="primary" htmlType="submit"
            onSubmit={(data) => {


              console.log('Signup form submitted with:', data);

            }}>
            {loginFormSelected?'login':'Signup'}
          </Button>





        </div>
        <div className={style.signupDiv}>
          <p style={{marginBottom:'0px'}}>{loginFormSelected?'Dont have an account?':'Already have an account?'} </p>
          <Button onClick={() => {
            setLoginFormSelected(!loginFormSelected);
            formRef.current.resetFields(); 
          }}>{loginFormSelected?'create one':'login'}</Button>
        </div>
      </Form>
      </Spin>
    </>
  );
};

export default UserLogin;
