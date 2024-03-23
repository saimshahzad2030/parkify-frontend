// layouts/Layout.js
import React from 'react';
import UserAuthentication from '../../../components/Authenticate/UserAuthentication';

const Layout = ({ children }) => {
  return <UserAuthentication>{children}</UserAuthentication>;
};

export default Layout