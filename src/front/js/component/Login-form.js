import React, { useState, useContext } from 'react'
import "../../styles/login.css";
import { useNavigate } from "react-router-dom";
import {Context} from "../store/appContext"
import Visibility from '@mui/icons-material/Visibility';

export const Login = () => {
const { store, actions} = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
    

  
  const handleSubmit = (e) => {
    e.preventDefault();
    actions.login(email, password)
     navigate("/home")
  }
  return (

    <div className="login-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className='password-box'>
        
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder="Password..." 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          pattern="[A-Za-z][0-9]{3-16}"
          required
        />
        <Visibility className='visibility' onClick={toggleShowPassword} />
        </div>

        <button className="submit-button" type="submit">Login</button>
    </form>
  </div>

  )
}
//   return (

//     <div className="login-container">
//       <form id="login-form" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           requiered
//         />

//         <button className="submit-button" type="submit">Login</button>
//       </form>
//     </div>

//   )
// }


// este comando irá en la página welcome
// pasaremos la action del store mediante props

// <Login loginAction={actions.login}/>