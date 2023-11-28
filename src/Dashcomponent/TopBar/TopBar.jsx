import React, { useState } from 'react';
import { ChevronDown, List,Gear,Person } from 'react-bootstrap-icons';
import './TopBar.css';

function TopBar({setShowSidebar,showSidebar}) {
  const [dropdownVisible, setDropdownVisible] = useState(false);



  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={`top-bar ${showSidebar?'':'big-top'} `}>
      <div className="top-bar-left">
       
        <div className="menu-item menu-row" onClick={toggleSidebar}>
         
            <List  />
            <span className='dashboard-name'>
           Hello blue dana
          </span>
       
        </div>
      </div>
      <div className="top-bar-right">
      {/* <div className="menu-item menu-row"> <Gear/> <span> Settings </span> <ChevronDown /></div>  */}
        <div className="menu-item account">
            <div className="menu-row user"  onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown} onClick={toggleDropdown}> <span><Person /></span><ChevronDown /></div>
         
          <div className={`dropdown active ${dropdownVisible ? 'active' : ''}`}>
           <div className="my-col">
                        <a href="#">My Account</a>
            <a href="#">Logout</a>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
