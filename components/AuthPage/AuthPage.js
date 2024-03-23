"use client"
import React, { useState, useEffect } from 'react';
import UserLogin from '../Userlogin/UserLogin';
import style from './AuthPage.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AuthPage = () => {


    const [initialText, setInitialText] = useState('Hello User, login below .!')
    return (
       <div className={style.authenticationSection}>
            <h1>Welcome to Parkify</h1>
            <p>You must need to login in order to Access the features of Application</p>
            <p className={style.initialText}>{initialText}</p>
            <div className={style.form}>
                
                        <UserLogin />
                    
            </div>


        </div>
    );
};

export default AuthPage;
