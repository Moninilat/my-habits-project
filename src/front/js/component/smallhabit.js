import "../../styles/smallhabit.css";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const SmallHabit = () => {
    const { store, actions } = useContext(Context);
    return (
        <div className="small_habit_component">
            <div className="small_habit_title">{store.habits.name}</div>
            <div className="small_habit_box">
                <div className="small_habit_button"><i className="fa-solid fa-plus"></i></div>
            </div>
        </div>
    );
};