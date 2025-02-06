import React from 'react'
import { NotFound404 } from "../../img/NotFound404.png";
import "../../styles/notFound.css"
import { Navigate } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className='main-box'>
        <img 
          src='NotFound404.png' 
          style={{width:"450px", height:"450px"}}
          loading="lazy"
          />
        <button type='button' onClick={Navigate('/')}>Back to home</button>
    </div>
  )
}
