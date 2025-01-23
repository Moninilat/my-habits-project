import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Diversity1Outlined } from "@mui/icons-material";
import { Navbar } from "../component/navbar";
import { Calendar, SmallHabit } from "../component/smallhabit";
import { HabitCard } from "../component/habitcard";
import { NewHabitCard } from "../component/newhabitcard";
import { User } from "../component/user";
import { UserScore } from "../component/userscore";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<SmallHabit />
			<HabitCard />
			<NewHabitCard />
			<User />
			<UserScore />
		</div>
	);
}
