import { createRoot } from "react-dom/client";
//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";

const root = createRoot(document.querySelector("#app"));
root.render(<Layout />);


import { StyledEngineProvider } from '@mui/material/styles';
import Habit_tracker from './Views/Habit_Tracker';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Habit_tracker />
    </StyledEngineProvider>
  </React.StrictMode>
);