import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Diversity1Outlined } from "@mui/icons-material";
import { Navbar } from "../component/navbar";
import { Calendar } from "../component/calendar";
import { HabitCard } from "../component/habitcard";
import { NewHabitCard } from "../component/newhabitcard";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<Calendar />
			<HabitCard />
			<NewHabitCard />
		</div>
	);
}
