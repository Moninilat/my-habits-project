import "../../styles/habitcard.css";
import React from "react";

export const HabitCard = ({ user_habit }) => {
    return (
        <div className="habit_component">
            <div className="habit_title">{user_habit.habit.name}</div>
            <div className="habit_box">
                <div className="habit_status">¿Completo?</div>
                <button className="habit_button"></button>
            </div> 
        </div>
    );
};
