import React from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/googleLogin.css"



export const GoogleLogin = () => {

  const navigate = useNavigate();
  const [googleUser, setGoogleUser] = useState("");
  const [userData, setUserData] = useState(null);

  
  const signUp = useGoogleLogin({
    onSuccess: (codeResponse) => {setGoogleUser(codeResponse)
      console.log(codeResponse)
    },
    onError: (error) => console.log("Login Failed:", error),
    
    
  });

  useEffect(() => {
    if (googleUser) {
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${googleUser.access_token}`,
                Accept: "application/json",
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("Received data:", data);
            const googleUserData = {
                "google_id": data.id,
                "name": data.name,
                "email": data.email
            };
            setUserData(googleUserData);  
        })
        .catch(error => console.error("Error al autenticar y almacenar el usuario:", error));
    }
}, [googleUser]); 

useEffect(() => {
    if (userData) {
        fetch(`${process.env.BACKEND_URL}api/signup/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log("Response from backend:", data);
            if (data.token) {
                console.log("Token received:", data.token);
                localStorage.setItem("token", data.token);
                navigate("/home");
            } else {
                console.error("No token received:", data);
            }
        })
        .catch((error) => console.error("Error al registrar usuario:", error));
    }
}, [userData]);



  return (
          <div className="shadow-2xl">
            <button
              type="button"
              className="Google-login"
              onClick={() => signUp()}
            ><img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" alt="Logo_google" style={{width:"25px", height:"25px", marginRight:"10px"}}/>
              Google
            </button>
          </div>
  );
};