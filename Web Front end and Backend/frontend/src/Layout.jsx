import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
        <div className="App">
          {/* <div className="sidebar-outer-container"><Header/></div> */}
          <div className="body-outer-container"><Outlet/></div>

        </div>
        
    </>
  )
}

export default Layout
