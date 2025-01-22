import React, { Component } from "react";
import "../../styles/calendar.css";

export const Calendar = () => (
    <div className="calendar">
    <div className="week-nav">
        <btn className="btn"><i className="fa-solid fa-angle-left"></i></btn>
        <div className="week-title">19 - 25 Junio</div>
        <btn className="btn"><i className="fa-solid fa-angle-right"></i></btn>
    </div>
    <div className="days">
        <div className="day">
            <div className="day-name">L</div>
            <div className="date green">19</div>
        </div>
        <div className="day">
            <div className="day-name">M</div>
            <div className="date green">20</div>
        </div>
        <div className="day">
            <div className="day-name">X</div>
            <div className="date green">21</div>
        </div>
        <div className="day">
            <div className="day-name">J</div>
            <div className="date green">22</div>
        </div>
        <div className="day">
            <div className="day-name">V</div>
            <div className="date green">23</div>
        </div>
        <div className="day">
            <div className="day-name">S</div>
            <div className="date red">24</div>
        </div>
        <div className="day">
            <div className="day-name">D</div>
            <div className="date red">25</div>
        </div>
    </div>
</div>

);