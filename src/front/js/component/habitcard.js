import "../../styles/habitcard.css";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const HabitCard = ({ user_habit }) => {
    const { actions } = useContext(Context);
    const [isCompleted, setIsCompleted] = useState(false);

    // Verifica si el hábito ya fue completado hoy al cargar el componente
    useEffect(() => {
    const today = new Date().toDateString(); // Convierte la fecha a un string legible
    const completedToday = user_habit.records?.some(record => new Date(record.date).toDateString() === today);
    setIsCompleted(completedToday);
}, [user_habit.records]);

    const handleRemoveHabit = () => {
        actions.removeHabit(user_habit.habit);
    };

    const handleCompleteHabit = async () => {
        if (!isCompleted) {
            const success = await actions.completeHabit(user_habit.habit.id);
            if (success) {
                setIsCompleted(true); // Marcar como completado en frontend
            }
        }
    };

    return (
        <div className="habit_component">
            <div className="button_delete"> 
                <button className="remove_habit_button" onClick={handleRemoveHabit}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div className="habit_title">{user_habit.habit.name}</div>
            </div>
            <div className="habit_box">
                <div className="habit_status">¿Completo?</div>
                <button 
                    className={`habit_button ${isCompleted ? "completed" : ""}`}
                    onClick={handleCompleteHabit}
                    disabled={isCompleted} // Deshabilitar si ya está completado
                >
                    {isCompleted ? "✔ Completado" : "Completar"}
                </button>
            </div> 
        </div>
    );
};