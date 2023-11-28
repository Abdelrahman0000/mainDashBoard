import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from 'react-query';

import './InteriorForm.css'
export default function Contactcontactform({contactform}) {





 console.log(contactform)
  return (
    <div className={`home`}>
   
 {contactform&&  <div className="single-form-container">

<h3> Message From: <span> {contactform.name} </span> </h3>

<h3> email: <span> {contactform.email} </span> </h3>




<h3> phone: <span> {contactform.phone} </span> </h3>



  <h3>Message : <span>{contactform.message}</span> </h3>
</div>
}
       </div>
  );
}
