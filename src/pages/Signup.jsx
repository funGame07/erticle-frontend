import AuthLayout from "../components/layouts/AuthLayout"

import { CiUser } from "react-icons/ci";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { useEffect, useState } from "react";
import axios from "axios";
import useCsrf from "../hooks/useCsrf";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosAuth, { axiosUser } from "../api/axios";

function Signup() {
  const {setAuth, setIsAuth} = useAuth()
  const navigate = useNavigate()
  const csrfToken = useCsrf()
  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [err, setErr] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()

    try{
      const response = await axiosAuth.post('/signup',{
        username,
        email,
        password,
      },
      {
        headers: {
          'X-CSRF-Token': csrfToken
        },
        withCredentials: true
      }
    )
    setErr('')
    
    const data = response.data
    setAuth({...data.user, accessToken: data.accessToken})
    setIsAuth(true)
    
    const prevLocation = localStorage.getItem('location');
    navigate(prevLocation ? prevLocation : url.home)

    }catch(err){
      setErr(err.response.data.message)
    }
  }

  return (
    <AuthLayout 
        title={'Welcome'}
        type={'Signup'}
    >
        <form method='POST' id='auth__form' onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <div className="auth__input">
              <CiUser className='input__icon'/>
              <input type="text" id='username' placeholder='Type your username' onChange={(e) => setUsername(e.target.value)}/>
            </div>
            
            <label htmlFor="email">Email</label>
            <div className="auth__input">
              <HiOutlineMail className='input__icon'/>
              <input type="email" id='email' placeholder='Type your email'onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
            <label htmlFor="password">Password</label>
            <div className="auth__input">
              <RiLockPasswordLine className='input__icon'/>
              <input type="password" id='password' placeholder='Type your password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <span id="err_message">{err}</span>
            {/* <span className='auth__forgotpassword'>Forgot password?</span> */}
            <button className='auth__submit-form'>Signup</button>
          </form>
    </AuthLayout>
  )
}

export default Signup