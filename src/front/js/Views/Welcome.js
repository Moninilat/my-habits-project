import React, { useState } from 'react';
import "../../styles/welcome.css";
import { Login } from '../component/Login-form';
import { SignUp } from '../component/Sign-up-form';
import CloseIcon from '@mui/icons-material/Close';


export const Welcome = () => {

  const [loginModal, setLoginModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);

  const openLoginModal = () => { setLoginModal(true) };
  const closeLoginModal = () => { setLoginModal(false) };

  const openSignUpModal = () => { setSignUpModal(true) };
  const closeSignUpModal = () => { setSignUpModal(false) };

  return (
    <SignUp />
    /* <div className="container">
      <div></div>
      <h1>Bienvenid@ a tu habbit tracker</h1>
      <div className="accesos">
          <div className="login">
            <p>¿Ya tienes cuenta?</p>
            <button className="Login" onClick={openLoginModal}>Login</button>
          </div>
          <div className="divider"></div>
          <div className="signup">
            <p>¿Eres nuevo?</p>
            <button className="sign-up" onClick={openSignUpModal}>Sign up</button>
          </div>
      </div>
      <div className="acceso-google">
        <p>O si lo prefieres:</p>
        <button className="google">Google</button>
      </div>

      <div className="modal-login"  
        isOpen={loginModal}
        style={loginModal ? {display: "flex"} : {display: "none"}}
        onRequestClose={closeLoginModal}
        >
        
        <div className='wrapper'>
          <CloseIcon className="close" onClick={closeLoginModal}/>
          <h5>Accede con tu cuenta</h5>
          <Login loginAction={""}/>
        </div>
      </div>
    </div>
    </> */
  );
}