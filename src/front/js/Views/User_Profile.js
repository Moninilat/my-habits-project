import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { User } from "../component/user";

export const Home = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <User />
        </div>
    );
}
