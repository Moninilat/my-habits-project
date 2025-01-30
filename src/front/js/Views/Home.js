import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { SmallHabit } from "../component/smallhabit";
import { HabitCard } from "../component/habitcard";
import { NewHabitCard } from "../component/newhabitcard";
import { User } from "../component/user";
import { UserScore } from "../component/userscore";

export const Home = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getHabits();
        actions.getUser();
    }, []);

    return (
        <div>
            <SmallHabit />
            {
                store.habits.map((habit, index) => {
                    return <HabitCard key={index} habit={habit} />;
                })
            }
            <NewHabitCard />
            <User />
            <UserScore />
        </div>
    );
}
