import "../../styles/habitcard.css";
import React from "react";

export const HabitCard = ({ habit }) => {
    console.log("Habit props:", habit);
    return (
        <div className="habit_component">
            {/* <div className="habit_title">{habit.name}</div>
            <div className="habit_box">
                <div className="habit_description">{habit.description}</div>
                <div className="habit_score">Puntuación: {habit.score}</div>
                <div className="habit_status">¿Completo?</div>
                <div className="habit_button"></div>
            </div> */}
            <div className="habit_title">{habit.name}</div>
        </div>
    );
};
