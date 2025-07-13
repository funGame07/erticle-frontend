import AuthLayout from "../components/layouts/AuthLayout"

import url from "../utils/urlConstants";

import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";

import { Link, useNavigate } from "react-router-dom";
import useCsrf from "../hooks/useCsrf";
import axios from "axios";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import axiosAuth, { axiosUser } from "../api/axios";

function Signin() {
  const {setAuth, setIsAuth} = useAuth()
  const navigate = useNavigate()
  const csrfToken = useCsrf()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [err, setErr] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()

    try{
      const response = await axiosAuth.post('/signin',{
        email,
        password
      },
      {
        headers: {
          'X-CSRF-Token': csrfToken
        },
        withCredentials: true
      }
    )
    const data = response.data

    setAuth({...data.user, accessToken: data.accessToken})
    setIsAuth(true)

    setErr('')

    const prevLocation = localStorage.getItem('location');
    localStorage.removeItem('location')
    navigate(prevLocation ? prevLocation : url.home)

    }catch(err){
      console.log(err)
      setErr(err.response.data.message)
    }
  }
  

  return (
    <AuthLayout 
        title={'Welcome Back'}
        type={'Signin'}
    >
        <form method='POST' id='auth__form' onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <div className="auth__input">
              <HiOutlineMail className='input__icon'/>
              <input type="email" id='email' placeholder='Type your email' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            
            <label htmlFor="password">Password</label>
            <div className="auth__input">
              <RiLockPasswordLine className='input__icon'/>
              <input type="password" id='password' placeholder='Type your password' onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <Link to={url.forgotpassword} className='auth__forgotpassword'>Forgot password?</Link>
            <span id="err_message">{err}</span>
            <button className='auth__submit-form'>Signin</button>
          </form>
    </AuthLayout>
  )
}

export default Signin