import React, { Component } from "react";
import "../../styles/newhabitcard.css"

export const NewHabitCard = () => (
    <div className="new_habit_component">
        <div className="new_habit_title">Add habit</div>
        <div className="new_habit_box">
            <div className="new_habit_button"><i className="fa-solid fa-plus"></i></div>
        </div>
    </div>
);