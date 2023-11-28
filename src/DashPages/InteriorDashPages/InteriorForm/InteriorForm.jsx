import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import './InteriorForm.css'
export default function InteriorForm({setSingleForm}) {
 

  const fetchData = async () => {
    const response = await fetch("https://bluedana.mass-fluence.com/api/all-brands");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery("apiData", fetchData);
  
const FormData=data?.data;


const handleChoseMassage = (item) => {
    setSingleForm(item)
  };


console.log(data)

  return (
    <div className={`home`}>
   
  { FormData&& <div className="form-container">

{FormData.map((item)=>(
    <Link to={`/admin/interior/form/${item.id}`} className="form-box" key={item.id} onClick={()=>handleChoseMassage(item)}>
    
<h2> {item.name} </h2>
    </Link>
    
))}


   </div>}
       </div>
  );
}
