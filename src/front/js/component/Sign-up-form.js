import React, { useContext, useState } from 'react';
import { Context } from '../store/appContext';
import "../../styles/signup.css";
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
  });

  const [showPasswordA, setShowPasswordA] = useState(false);
  const [showPasswordB, setShowPasswordB] = useState(false);
  const { store, actions } = useContext(Context);
  const [userProfilePicture, setUserProfilePicture] = useState("")
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggleShowPasswordA = () => setShowPasswordA(!showPasswordA);
  const toggleShowPasswordB = () => setShowPasswordB(!showPasswordB);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserProfilePicture(file);
      actions.handleImageUpload(file);
    }
  };

  const handleDeletePicture = () => {
    actions.handleDeletePicture();
    setUserProfilePicture("");
    const fileInput = document.querySelector("input[name='file-loader']");
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.repeatPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    actions.signUp(data, navigate);
  };

  return (
    <div className="signup-box">
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="Nombre..."
          value={data.first_name}
          onChange={handleChange}
          required />

        <input
          type="text"
          name="last_name"
          placeholder="Apellido..."
          value={data.last_name}
          onChange={handleChange}
          required />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico..."
          value={data.email}
          onChange={handleChange}
          required
        />

         <input type="text"
          name="city"
          placeholder="Ciudad..."
          value={data.city}
          onChange={handleChange}
          required
        />

        <div className='password-box'>
          <input
            type={showPasswordA ? "text" : "password"}
            name="password" placeholder="Contraseña..."
            value={data.password} onChange={handleChange}
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
            required />
          <Visibility className="visibility" onClick={toggleShowPasswordB} />
        </div>

        <div className='gender'>
          <RadioGroup
            style={{flexDirection:"row"}}
            onChange={handleChange}
            value={data.gender}
            name="gender">
              <div>
              <img src="https://cdn-icons-png.flaticon.com/128/6833/6833595.png" style={{width:"50px", marginRight:"10px"}}/>
              <FormControlLabel
                value="female"
                control={<Radio />}/>
              </div>
              <div>
              <img src="https://cdn-icons-png.flaticon.com/512/236/236831.png" style={{width:"50px", marginRight:"10px"}}/>
              <FormControlLabel
                value="male"
                control={<Radio />}/>
              </div>
          </RadioGroup>
        </div>
        <button className="signup-submit-button" type="submit">Registrarse</button>
      </form>
    </div>
  );
};
