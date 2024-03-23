"use client"
import {React} from 'react'
import UserAuthentication from '../../../components/Authenticate/UserAuthentication';
const layout = ({children}) => {
  
  
  
   return <UserAuthentication>{children}</UserAuthentication>;
  }
  
  
  export default layout
