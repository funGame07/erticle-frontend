import BaseLayout from '../components/layouts/BaseLayout';
import url from '../utils/urlConstants';

import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";

import { Link } from 'react-router-dom';
import './css/auth.css'

function Auth() {
  function handleSubmit(){
    e.preventDefault()
  }

  return (
    <BaseLayout>
        <div className="auth">
          <h2 className="auth__title">Welcome</h2>
          <form method='POST' id='auth__form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <div className="auth__input">
              <CiUser className='input__icon'/>
              <input type="text" id='username' placeholder='Type your username'/>
            </div>
            
            <label htmlFor="email">Email</label>
            <div className="auth__input">
              <HiOutlineMail className='input__icon'/>
              <input type="email" id='email' placeholder='Type your email'/>
            </div>
            
            <label htmlFor="password">Password</label>
            <div className="auth__input">
              <RiLockPasswordLine className='input__icon'/>
              <input type="password" id='password' placeholder='Type your password'/>
            </div>
            {/* <span className='auth__forgotpassword'>Forgot password?</span> */}
            <button className='auth__submit-form'>Signup</button>
          </form>

          <div className='divider'>
            <div className="line" />
            <span>or</span>
            <div className="line" />
          </div>

          <div className='auth__oauth'>
            <div className='oauth__logo'>
              <FcGoogle size={25} />
            </div>
            <span>Signup with Google</span>
          </div>
          
          <div className='auth__reminder'>
            <span>Already have an account?</span>
            <Link className='reminder__link' to={url.signin}>Signin</Link>
          </div>
        </div>
    </BaseLayout>
  )
}

export default Auth