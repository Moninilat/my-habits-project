import React, { Component } from "react";
import "../../styles/user.css";

export const User = () => (

<div className="user_component">
  <img src= {"rigo-baby.jpg"} className="user_circle"></img>
  <div className="user_text">
    <div className="user_name">Nombre de usuario</div>
    <div className="user_city">Ciudad</div>
  </div>
</div>
)