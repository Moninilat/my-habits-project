import React from 'react'
import { NotFound404 } from "../../img/NotFound404.png";
import "../../styles/notFound.css"

export const NotFound = () => {
  return (
    <div className='main-box'>
        <img src='NotFound404.png' style={{width:"450px", height:"450px"}}></img>
        <button type='button'>Back to home</button>
    </div>
  )
}
