
import BaseLayout from '../components/layouts/BaseLayout'

import {HiOutlineMail} from 'react-icons/hi'

import './css/forgotPassword.css';
import useCsrf from '../hooks/useCsrf';
import { useEffect, useState } from 'react';
import axiosAuth from '../api/axios';

function ForgotPassword() {
  const csrfToken = useCsrf()
  const [email, setEmail] = useState(null)
  const [message, setMessage] = useState(null)
  const [err, setErr] = useState(null)
  const [time, setTime] = useState(60)
  const [startCount, setStartCount] = useState(false)

  async function handleSubmit(e){
    e.preventDefault()

    try{
      if(!email) return setErr('email cannot be empty')

      const response = await axiosAuth.post('/forgotpassword', {
        email
      },{
        headers:{
          'X-CSRF-TOKEN': csrfToken
        },
        withCredentials: true
      })
      const data = response.data
      setErr('')
      setMessage(data.message)
      setStartCount(true)
    }catch(err){
      console.log(err)
      setErr(err.response.data.message)
    }
  }

  useEffect(()=>{
    if(startCount){
      const id = setTimeout(() => {
        setTime(time => time - 1)
      }, 1000)

      if(time <=0){
          setTime(60)
          setStartCount(false)
          clearInterval(id)
      }

      return () => clearTimeout(id)
    }
  }, [startCount, time])

  return (
    <BaseLayout>
        <div id="forgot_password">
          <h2>Forgot Password</h2>
          <p id='forgot_password__text'>
            Please fill this form if you have forgotten your password, 
            we will send you an email to reset your password
          </p>

          <form action="" method='post' id='forgot_password__form' onSubmit={handleSubmit}>
            <div id="forgot_password__input__container">
              <HiOutlineMail id='forgot_password__icon'/>
              <input type="email" name='email' placeholder='Enter Your Email' id='forgot_password__input' onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <button id='forgot_password__submit' className={startCount? 'disabled' : ''} disabled={startCount}>Send Email</button>
          </form>
          <span id='time_limit'>{startCount && `send again in ${time} seconds`}</span>
          <span id='err_message'>{err}</span>
          <span id='message'>{message}</span>
        </div>
    </BaseLayout>
  )
}

export default ForgotPassword