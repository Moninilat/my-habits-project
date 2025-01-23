import { createRoot } from "react-dom/client";
//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import { Welcome } from "./Views/Welcome";

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from "./layout";


const root = createRoot(document.querySelector("#app"));
root.render(<Layout />);


import { StyledEngineProvider } from '@mui/material/styles';


// ReactDOM.createRoot(document.querySelector("#root")).render(
//   <React.StrictMode>
//     <StyledEngineProvider injectFirst>
//     </StyledEngineProvider>
//   </React.StrictMode>

// );
