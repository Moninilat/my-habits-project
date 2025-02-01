import React, { useContext, useState } from 'react'
import { Context } from '../store/appContext';
import "../../styles/login.css";
import Visibility from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
export const SignUp = () => {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeatPassword: "",
    city: "",
    gender: ""

  })
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordA, setShowPasswordA] = useState(false);
  const [showPasswordB, setShowPasswordB] = useState(false);
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const toggleShowPasswordA = () => {
    setShowPasswordA(!showPasswordA);
  };
  const toggleShowPasswordB = () => {
    setShowPasswordB(!showPasswordB);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    actions.signUp(data, navigate);
  }
console.log(data);

  return (
    <div className="signup-box">
      <form id="signup-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="first_name"
          placeholder="Nombre..."
          value={data.first_name}
          onChange={handleChange}
          pattern="[A-Za-z]{3-16}"
          required
        />


        <input
          type="text"
          name="last_name"
          placeholder="Apellido..."
          value={data.last_name}
          onChange={handleChange}
          pattern="[A-Za-z]{3-16}"
          required
        />


        <input
          type="text"
          name="email"
          placeholder="Correo electrónico..."
          value={data.email}
          onChange={handleChange}
          pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
          required
        />

        <div className='password-box'>

          <input
            type={showPasswordA ? "text" : "password"}
            name="password"
            placeholder="Contraseña..."
            value={data.password}
            onChange={handleChange}
            pattern="[A-Za-z][0-9]{3-16}"
            required
          />
          <Visibility className='visibility' onClick={toggleShowPasswordA} />
        </div>
        <div className='password-box'>

          <input
            type={showPasswordB ? "text" : "password"}
            name="repeatPassword"
            placeholder="Confirmar contraseña..."
            value={data.repeatPassword}
            onChange={handleChange}
            required
          >
          </input>
          <Visibility className="visibility" onClick={toggleShowPasswordB} />
        </div>

        <input
          type="text"
          name="city"
          placeholder="Ciudad..."
          value={data.city}
          onChange={handleChange}
          pattern="[A-Za-z]{3-16}"
          required
        />
        <div>
          <FormLabel id="demo-radio-buttons-group-label">Género</FormLabel>
          <RadioGroup
            onChange={handleChange}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            value={data.gender}
            name="gender"
          >
            <FormControlLabel value="female" control={<Radio />} label="Femenino" />
            <FormControlLabel value="male" control={<Radio />} label="Masculino" />

          </RadioGroup>
        </div>

        <button className="signup-submit-button" type="submit">Registrarse</button>
      </form>

    </div>
  )
}