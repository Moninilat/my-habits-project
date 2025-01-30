import "../../styles/user.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";


export const User = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="user_component">
      <img className="user_circle"></img>
      <div className="user_text">
        <div className="user_name">{store.user.first_name}</div>
        <div className="user_city">{store.user.city}</div>
      </div>
    </div>
  );
}
