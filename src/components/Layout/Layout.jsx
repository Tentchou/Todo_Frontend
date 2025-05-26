// src/components/Layout.jsx
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";


const Layout = ({ children }) => {
 

  return (
    <>
      <Sidebar/>
      <div className="wrapper">
        <div className="main-panel">
          <Header/>
            {children}
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default Layout;
