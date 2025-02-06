import "../../styles/userscore.css";
import React, { useState, useEffect } from "react";

export const UserScore = (props) => {

const [genderClass, setGenderClass] = useState(null);
useEffect(() => {
    if (!genderClass){
        setGenderClass(null)
    }
    
    setGenderClass(props.gender == "female" ? "female" : "male");
   }, [props.gender]);
    return (
        <div className="user_score_component">
            <div className="user_score_box">
                <img 
                className={`user_score_circle_${genderClass}`}
                loading="lazy"
                />
                <div className="user_text">                                  
                    <div className="user_score_name">{props.name}</div>
                    <div className="user_score_city">{props.city}</div>
                    
                </div>
            </div>
            <div className="user_score_space">
                <div className="user_score_pill">
                    <h5>{props.score}</h5>
                    <p>puntos</p>
                </div>
            </div>
        </div>
    );
}