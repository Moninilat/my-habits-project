import "../../styles/smallhabit.css";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const SmallHabit = ({ habit }) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="small_habit_component">
            <div className="small_habit_title">{habit.name}</div>
            <div className="small_habit_box">
                <button className="small_habit_button" onClick={() => actions.addHabit(habit)}></button>
            </div>
        </div>
    );
};