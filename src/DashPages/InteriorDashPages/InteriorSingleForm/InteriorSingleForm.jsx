import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

import './InteriorForm.css'
export default function InteriorSingleForm({singleform}) {



  const fetchData = async () => {
    const response = await fetch("https://bluedana.mass-fluence.com/api/interiors-show-message:1");
    const data = await response.json();
    return data;
  };

  const { isLoading, isError, data } = useQuery("apiData", fetchData);
  
const FormData=data?.data;



 console.log(singleform)
  return (
    <div className={`home`}>
   
 {singleform&&  <div className="single-form-container">

<h3> Message From: <span> {singleform.name} </span> </h3>

<h3> email: <span> {singleform.email} </span> </h3>




<h3> intended use: <span> {singleform.intended_use} </span> </h3>
<div> <h3>file: </h3>
    {singleform.file ? (
      singleform.file.endsWith('.jpg') || singleform.file.endsWith('.png') ? (
        <img src={singleform.file} alt="Uploaded File" />
      ) : (
        <a href={singleform.file} download>Download File</a>
      )
    ) : (
      <span>No file attached</span>
    )}
  </div>


  <h3>Message : <span>{singleform.notes}</span> </h3>
</div>
}
       </div>
  );
}
