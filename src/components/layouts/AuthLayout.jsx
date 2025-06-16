import BaseLayout from './BaseLayout';
import url from '../../utils/urlConstants';

import { FcGoogle } from "react-icons/fc";

import { Link, useNavigate } from 'react-router-dom';
import './authLayout.css'
import axios from 'axios';

function AuthLayout({children, title, type}) {
  const navigate = useNavigate()

  async function handleGoogleOauth(){
    const response = await axios.get('http://localhost:3000/auth/google', {
      withCredentials: true
    })
    const data = response.data

    localStorage.setItem('location', '/articles')
    
    window.location.href = data.url
  }

  return (
    <BaseLayout>
        <div className="auth">
          <h2 className="auth__title">{title}</h2>
          
          {children}

          <div className='divider'>
            <div className="line" />
            <span>or</span>
            <div className="line" />
          </div>

          <div className='auth__oauth' onClick={handleGoogleOauth}>
            <div className='oauth__logo'>
              <FcGoogle size={25} />
            </div>
            <span>{type} with Google</span>
          </div>
          
          <div className='auth__reminder'>
            <span>{type === 'Signin'? "Don't have an account?" : 'Already have an account?'}</span>
            <Link className='reminder__link' to={type === 'Signin'? url.signup : url.signin}>
                {type === 'Signin'? 'Signup' : 'Signin'}
            </Link>
          </div>
        </div>
    </BaseLayout>
  )
}

export default AuthLayout