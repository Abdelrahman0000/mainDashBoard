import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export default function ContactForm({setContactForm}) {
 

  const fetchData = async () => {
    const response = await fetch("https://bluedana.mass-fluence.com/api/contact-all-messages");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery("apiData", fetchData);
  
const FormData=data?.data;


const handleChoseMassage = (item) => {
    setContactForm(item)
  };


console.log(data)

  return (
    <div className={`home`}>
   
  { FormData&& <div className="form-container">

{FormData.map((item)=>(
    <Link to={`/admin/contact/form/${item.id}`} className="form-box" key={item.id} onClick={()=>handleChoseMassage(item)}>
    
<h2> {item.name} </h2>
    </Link>
    
))}


   </div>}
       </div>
  );
}
