import React, { Component } from "react";
import "../../styles/habitcard.css"

export const HabitCard = () => (
    <div className="habit_component">
        <div className="habit_title">Run</div>
        <div className="habit_box">
            <div className="habit_status">Complete?</div>
            <div className="habit_button"></div>
        </div>
    </div>

);