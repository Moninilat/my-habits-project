import "../../styles/habitcard.css";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const HabitCard = ({ user_habit }) => {
    const { actions } = useContext(Context);

    const handleRemoveHabit = () => {
        actions.removeHabit(user_habit.habit);
    };

    return (
        <div className="habit_component">
            <div className="button_delete"> 
            <button className="remove_habit_button" onClick={handleRemoveHabit}><i class="fa-solid fa-x"></i></button>
            <div className="habit_title">{user_habit.habit.name}</div>
            </div>
            <div className="habit_box">
                <div className="habit_status">¿Completo?</div>
                <button className="habit_button"></button>
            </div> 
        </div>
    );
};
