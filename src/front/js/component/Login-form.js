import React, { useState } from 'react'
import "../../styles/Log-in.css";

export const Login = ({loginAction}) => {

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const handleSubmit = (e) => {
  e.preventDefault();
  loginAction(username, password);

}

  return (

    <div className="login-container">
      <form id="login-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        requiered
        />

        <button className="submit-button" type="submit">Login</button>
      </form>
    </div>

  )
}


// este comando irá en la página welcome
// pasaremos la action del store mediante props

// <Login loginAction={actions.login}/>