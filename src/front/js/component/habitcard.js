import "../../styles/habitcard.css";
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
// import { Modal } from "./modal.js";
// import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
// import "../../styles/userProfile.css";

export const HabitCard = ({ user_habit }) => {
    const { store, actions } = useContext(Context);
    const [isCompleted, setIsCompleted] = useState(null);
    // const [isActive, setActive] = useState(false);

    // Verifica si el hábito ya fue completado hoy al cargar el componente
console.log(store.user_records)
    useEffect(() => {
        
        const today = new Date().toDateString();
        
        if (store.user_records.length && store.user) {
            const completedToday = store.user_records.some(record => 
                new Date(record.date).toDateString() === today && 
                record.user_id === store.user.id &&
                record.habit_id === user_habit.habit.id
                
            );            
            setIsCompleted(completedToday);   
        }
         
    }, [store.user_records, store.user, user_habit.habit.id]); 
    
    

    
    const handleCompleteHabit = async () => {
    if (!isCompleted) {
        const success = await actions.completeHabit(user_habit.habit.id);
            if (success){
                setIsCompleted(true)
    }
};
}

const handleRemoveHabit = () => {
    actions.removeHabit(user_habit.habit);
};

    return (
        
        !isCompleted ? 
        <>
        <div className={`habit_component${isCompleted ? "_completed" : ""}`}>
            <div className="button_delete"> 
                <button className="remove_habit_button" onClick={handleRemoveHabit}>
                    <i className="fa-solid fa-x"></i>
                </button>
                <div className="habit_title">{user_habit.habit.name}</div>
                {/* <HelpOutlineIcon onClick={() => setActive(true)} style={{marginRight:"40px"}} /> */}
            </div>
            <div className="habit_box">
                <div className="habit_status">{isCompleted ? "Completado" : "Completar"}</div>
                <button 
                    className={`habit_button${isCompleted ? "_completed" : ""}`}
                    onClick={handleCompleteHabit}
                    disabled={isCompleted} // Deshabilitar si ya está completado
                > {isCompleted ? "✔" : ""}</button>
            </div> 
        </div>
            {/* <Modal className="modalUser"
                isOpen={isActive}
                title={user_habit.habit.name}
                close={() => setActive(false)}
            >
                <img src="Dog_walk.gif" alt="Habit illustration" />
                <div className="modal-content"><p>{user_habit.habit.description}</p></div>
            </Modal> */}
        </>

        :

<>
<div className="habit_component_completed">
    <div className="button_delete"> 
        <button className="remove_habit_button" onClick={handleRemoveHabit}>
            <i className="fa-solid fa-x"></i>
        </button>
        <div className="habit_title">{user_habit.habit.name}</div>
        {/* <HelpOutlineIcon onClick={() => setActive(true)} style={{marginRight:"40px"}} /> */}
    </div>
    <div className="habit_box">
        <div className="habit_status">"Completado"</div>
        <button 
            className="habit_button_completed"
            onClick={handleCompleteHabit}
            disabled={isCompleted} // Deshabilitar si ya está completado
        > {isCompleted ? "✔" : ""}</button>
    </div> 
</div>
</>

    );
};