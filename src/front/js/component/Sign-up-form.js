import React, { useState } from 'react'
import "../../styles/Log-in.css";

export const SignUp = () => {

const [firstName, setfirstName] = useState("");
const [password, setPassword] = useState("");
const handleSubmit = (e) => {
  e.preventDefault();
  loginAction(username, password);
}

  return (
    <div className="login-container">
    <h5>Vamos a necesitar que nos cuentes más de ti</h5>
    <form id="login-form" onSubmit={handleSubmit}>
        <label>¿cómo te llamas?</label>
        <input 
          type="text" 
          placeholder="Jane..." 
          value={"firstName"}
          onChange={(e) => setfirstName(e.target.value)}
          required
        />

        <label>¿cómo te apellidas?</label>
        <input 
          type="text" 
          placeholder="Doe..." 
          value={"lastName"}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>
  )
}
