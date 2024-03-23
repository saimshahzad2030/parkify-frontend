"use client"
import { React, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { Modal,Button} from 'antd';
import { useRouter } from 'next/navigation';
import style from './Navbar.module.css'
import Cookies from 'js-cookie';
const Navbar = ({selectedLink,type}) => {
  const router = useRouter(); // Move useRouter hook outside of the handleLogout function

  const handleLogout = () => {
    Modal.confirm({
      title: 'Log out',
      content: 'Are you sure you want to logout from your account?',
      onOk() {
        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('email');
        router.push('/');
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <nav className={`navbar navbar-expand-lg ${style.navbar}`}>
      <div className="container-fluid">
        <Link className="navbar-brand font-weight-bold" href={type==='admin'?'/Admin/adminhome':'/User/home'}
        style={{fontWeight:'bold',fontSize:'30px'}}>Parkify</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {
          type === 'user' ?
          (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className={`nav-item`}>
            <Link className={`nav-link text-light  ${selectedLink==="Book Parking"?'active':''}`} aria-current="page" href="/User/home" >Book Parking</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link text-light ${selectedLink==="View Bookings"?'active':''}`} href="/User/viewbooking" >View Bookings</Link>
          </li>
          
          <li className="nav-item">
            <Link className={`nav-link text-light  ${selectedLink==="Feedback"?'active':''}`} href="/User/feedback" >Feedback</Link>
          </li>

        </ul>):
        (<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link text-light  ${selectedLink==="All users"?'active':''}`} aria-current="page" href="/Admin/allusers" >All users</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link text-light  ${selectedLink==="All Bookings"?'active':''}`} href="/Admin/allbookings" >All Bookings</Link>
        </li>
   
        <li className="nav-item">
          <Link className={`nav-link text-light  ${selectedLink==="Feedbacks"?'active':''}`} href="/Admin/allfeedbacks" >Feedbacks</Link>
        </li>

      </ul>)
        }
            <Button 
            onClick={handleLogout}
            type='primary'
            style={{backgroundColor:' #D2122E',color:'white',fontWeight:'bold'}}
            >Logout</Button>
          
        </div>
      </div>
    </nav>
  );
};
export default Navbar;