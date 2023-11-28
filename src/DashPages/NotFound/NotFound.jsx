import React from 'react'
import './NotFound.css'
import Error from '../../image/Error.png'

import { useNavigate } from 'react-router-dom';
export default function NotFound() {
    
  
  const navigate = useNavigate();
  const handleClick = () => {
   
    navigate('/');
  };

  return (
    
    <div className="notfound">
<div className="image"> <img src={Error} alt="" />  </div>
<h2>404</h2>
<h3>Page Not Found</h3>
<p>Rhoncus morbi et augue nec, in id ullamcorper at sit. Condimentum sit nunc in eros scelerisque sed. Commodo in viverra nunc, ullamcorper ut. Non, amet, aliquet scelerisque nullam sagittis, pulvinar. Fermentum scelerisque sit consectetur hac mi. Mollis leo eleifend ultricies purus iaculis.</p>
  <button onClick={() => handleClick()}>Home Page</button>
  
  
    </div>
  )
}
