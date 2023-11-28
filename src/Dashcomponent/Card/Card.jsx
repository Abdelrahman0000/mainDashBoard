import React from 'react'
import './Card.css'
import { Link , BarChart } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
export default function Card({title,desc,path,img}) {
    
  const navigate = useNavigate();
  
  const handleClick = () => {
   if(path){
    navigate(path);
   }
  };
  return (
   
<div className="dashcard" onClick={()=>handleClick()}>

<div className="inner">
<h2> {title}</h2>
<h4>{desc}</h4>


</div>

<div className="dashimage">
    {img? <BarChart /> :<Link /> }
</div>


</div>


  )
}
