import React from 'react'
import './Home.css'
import Card from '../../Dashcomponent/Card/Card'
export default function DashHome() {
  return (
    <div className={`home Nohome `}>
   

<div className="box-container">

<Card title={'Home'} desc={'page'} img={true} path={'/admin/home/intro'}/>


<Card title={'About'} desc={'page'} img={true} path={'/admin/about/intro'}/>


</div>
    </div>
  )
}
