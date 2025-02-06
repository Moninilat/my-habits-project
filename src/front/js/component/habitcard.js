import "../../styles/habitcard.css";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const HabitCard = ({ user_habit }) => {
    const { actions } = useContext(Context);

    return (
        <div className="habit_component">
            <div className="delete">
            <div className="x" onClick={() => actions.removeHabit(user_habit.habit)}><i class="fa-solid fa-x"></i></div>
            <div className="habit_title">{user_habit.habit.name}</div>
            </div>
            <div className="habit_box">
                <div className="habit_status">¿Completo?</div>
                <button className="habit_button"></button>
            </div> 
        </div>
    );
};
