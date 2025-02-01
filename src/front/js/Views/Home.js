import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { SmallHabit } from "../component/smallhabit";
import { HabitCard } from "../component/habitcard";
import { NewHabitCard } from "../component/newhabitcard";
import { User } from "../component/user";
import { UserScore } from "../component/userscore";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
        actions.getHabits();
        actions.getUser();
        actions.getUserHabits();
    }, []);

    return (
        <div>

            {
                store.user.map((user, index) => {
                    return <User key={index} user={user} />;
                })
            }


            {
                store.habits.map((habit, index) => {
                    return <SmallHabit key={index} habit={habit} />;
                })
            }

            {/* {
                store.user_habits.map((user_habits, index) => {
                    return <HabitCard key={index} user_habit={user_habits} />;
                })
            }  */}
        </div>
    );
}
