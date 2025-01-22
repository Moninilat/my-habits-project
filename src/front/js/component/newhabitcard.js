import React, { Component } from "react";
import "../../styles/newhabitcard.css"

export const NewHabitCard = () => (
    <div className="newhabitcard d-flex space-between">
        <div className="habit">
            <p>Add habit</p>
        </div>
        <div className="habit">
            <p className="btn">+</p>
        </div>
    </div>
);