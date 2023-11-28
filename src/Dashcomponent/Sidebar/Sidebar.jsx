import React, { useState } from 'react';
import { ChevronDown, X } from 'react-bootstrap-icons';

import Logo from '../../image/logo.png';

import './Sidebar.css';
import { Link } from 'react-router-dom';

function Sidebar({ showSidebar, setShowSidebar }) {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setActiveDropdown(index === activeDropdown ? null : index);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`sidebar  ${showSidebar ? 'show-sidebar' : ''}`}>
      <span onClick={toggleSidebar} className='my-x'>
        <X />
      </span>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      <div className={`dropdown ${activeDropdown === 1 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(1)}>
          <a className='drop-a'>Home <ChevronDown className={`dropdown-icon ${activeDropdown === 1 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
          <Link to={'/admin/home/intro'}>Intro</Link>
          <Link to={'/admin/home/sec1'}>Section 1</Link>
          <Link to={'/admin/home/sec1/slider'}>Section 1 Slider</Link>
         
        </div>
      </div>
      <div className={`dropdown ${activeDropdown === 3 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(3)}>
          <a className='drop-a'>About <ChevronDown className={`dropdown-icon ${activeDropdown === 3 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
          <Link to={'/admin/about/intro'}>Intro</Link>
          <Link to={'/admin/about/sec1'}>Section 1</Link>
          <Link to={'/admin/about/sec2'}>Section 2</Link>
          <Link to={'/admin/about/sec3'}>Section 3</Link>
        </div>
      </div>
   
      <div className={`dropdown ${activeDropdown === 4 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(4)}>
          <a className='drop-a'>Construction <ChevronDown className={`dropdown-icon ${activeDropdown === 4 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
          <Link to={'/admin/construction/intro'}>Intro</Link>
          <Link to={'/admin/construction/sec1'}>Section 1</Link>
          <Link to={'/admin/construction/sec2'}>Section 2</Link>
        </div>
      </div>
      
      <div className={`dropdown ${activeDropdown === 5 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(5)}>
          <a className='drop-a'>Interior <ChevronDown className={`dropdown-icon ${activeDropdown === 5 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
          <Link to={'/admin/interior/intro'}>Intro</Link>
          <Link to={'/admin/interior/sec1'}>Section 1</Link>
          <Link to={'/admin/interior/sec2'}>Section 2</Link>
          
          <Link to={'/admin/interior/sec3'}>Section 3</Link>
          
          <Link to={'/admin/interior/sec4'}>Section 4</Link>
          
          <Link to={'/admin/interior/form'}>Form</Link>
        </div>
      </div>


      

      <div className={`dropdown ${activeDropdown === 6 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(6)}>
          <a className='drop-a'>Project <ChevronDown className={`dropdown-icon ${activeDropdown === 6 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
          <Link to={'/admin/project/intro'}>Intro</Link>
          <Link to={'/admin/project/detail'}>Project Detail</Link>
          
        </div>
      </div>
      <div className={`dropdown ${activeDropdown === 7 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(7)}>
          <a className='drop-a'>Product <ChevronDown className={`dropdown-icon ${activeDropdown === 7 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
        <Link to={'/admin/product/intro'}>product Intro</Link>
        <Link to={'/admin/product/detail'}>product Detail</Link>
          
        </div>
      </div>
      <div className={`dropdown ${activeDropdown === 8 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(8)}>
          <a className='drop-a'>Contact <ChevronDown className={`dropdown-icon ${activeDropdown === 8 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
        <Link to={'/admin/contact/intro'}>Contact Intro</Link>
        <Link to={'/admin/contact/form/'}>Massages</Link>
          
        </div>
      </div>
      <div className={`dropdown ${activeDropdown === 9 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(9)}>
          <a className='drop-a'>FAQs <ChevronDown className={`dropdown-icon ${activeDropdown === 9 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
        <Link to={'/admin/faqs/intro'}>Intro</Link>
        <Link to={'/admin/faq/detail'}>Faqs Detail</Link>
        </div>
        
        
          
       
      </div>
      

      <div className={`dropdown ${activeDropdown === 10 ? 'active' : ''}`}>
        <div className="dropdown-toggle" onClick={() => toggleDropdown(10)}>
          <a className='drop-a'>News <ChevronDown className={`dropdown-icon ${activeDropdown === 10 ? 'rotate' : ''}`} /> </a>
        </div>
        <div className="dropdown-content absolute">
          <Link to={'/admin/news/intro'}>Intro</Link>
          <Link to={'/admin/news/detail'}>News Detail</Link>
          
        </div>
      </div>
       <Link className='drop-a single-link' to={'/admin/brand'}>Brand</Link>

    </div>
  );
}

export default Sidebar;
