import "../../styles/smallhabit.css";
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import AddIcon from '@mui/icons-material/Add';

export const SmallHabit = ({ habit }) => {
    const { store, actions } = useContext(Context);
    if (store.user_habits.some(user_habit => user_habit.habit.id === habit.id)) {
        return null;
    }
    return (
        <div className="small_habit_component" onClick={() => actions.addHabit(habit)}>
            <div className="small_habit_title">{habit.name}</div>
            <div className="small_habit_box">
                <AddIcon />
            </div>
        </div>
    );
};