import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { SmallHabit } from "../component/smallhabit"


export const Ranking = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <SmallHabit />
        </div>
    );
}
