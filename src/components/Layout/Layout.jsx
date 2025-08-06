import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './layout.css'; 

const Layout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
