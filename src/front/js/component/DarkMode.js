import React from "react";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import "../../styles/darkMode.css";

export const DarkMode = () => {
    const setDarkMode = () => {
        document.querySelector("body").setAttribute("data-theme", "dark")
        localStorage.setItem("selectedTheme", "dark")
    }
    const setLightMode = () => {
        document.querySelector("body").setAttribute("data-theme", "light")
        localStorage.setItem("selectedTheme", "ligth")
    }

    const selectedTheme = localStorage.getItem("selectedThem");
    if (selectedTheme === "dark"){
        setDarkMode();
    }

    const toggleTheme = (e) => {
        if (e.target.checked) setDarkMode();
        else setLightMode()
    }
    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                onChange={toggleTheme}
                defaultChecked={selectedTheme === "ligth"}
            />
            <label className='dark_mode_label' for='darkmode-toggle'>
                <LightModeIcon className="sun"/>
                <DarkModeIcon className="moon"/>
            </label>
        </div>
    );
};
