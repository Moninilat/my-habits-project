import "../../styles/habitcard.css";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const HabitCard = ({ user_habit }) => {
    const { actions } = useContext(Context);
    const [isCompleted, setIsCompleted] = useState();
    const [handleComplete, setHandlecomplete] = useState(false);

    // Verifica si el hábito ya fue completado hoy al cargar el componente

    useEffect(() => {
    const today = new Date().toDateString();
    const completedToday = user_habit.records?.some(record => new Date(record.date).toDateString() === today);
    setIsCompleted(completedToday);
    
}, [user_habit.records]);
    
    const handleRemoveHabit = () => {
        actions.removeHabit(user_habit.habit);
    };

    const handleCompleteHabit = async () => {
        if (!isCompleted) {
            const success = actions.completeHabit(user_habit.habit.id);
            
            if (success) {
                setHandlecomplete(true); // Marcar como completado en frontend
            }
        }
    };

    return (
        <div className={`habit_component${handleComplete ? "_completed" : ""}`}>
            <div className="button_delete"> 
                <button className="remove_habit_button" onClick={handleRemoveHabit}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div className="habit_title">{user_habit.habit.name}</div>
            </div>
            <div className="habit_box">
                <div className="habit_status">{handleComplete ? "Completado" : "Completar"}</div>
                <button 
                    className={`habit_button${handleComplete ? "_completed" : ""}`}
                    onClick={handleCompleteHabit}
                    disabled={isCompleted} // Deshabilitar si ya está completado
                > {handleComplete ? "✔" : ""}</button>
            </div> 
        </div>
    );
};