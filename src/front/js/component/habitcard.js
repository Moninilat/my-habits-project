import React, { Component } from "react";
import "../../styles/habitcard.css"

export const HabitCard = () => (
    <div className="habitcard d-flex space-between">
        <div className="habit">
            <p>Habit</p>
        </div>
        <div className="habit">
            <p>0/8</p>
        </div>
    </div>
);