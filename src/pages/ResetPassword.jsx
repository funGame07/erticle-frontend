import React, { useEffect, useState } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'

import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";

import './css/resetPassword.css'
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import useCsrf from '../hooks/useCsrf';
import url from '../utils/urlConstants';
import axiosAuth, { axiosUser } from '../api/axios';

function ResetPassword() {
    const navigate = useNavigate()
    const csrfToken = useCsrf()
    const [searchParams, setSearchParams] = useSearchParams()
    const [email, setEmail] = useState(searchParams.get('email'))
    const [code, setCode] = useState(searchParams.get('code'))
    const [newPassword, setNewPassword] = useState(null)
    const [err, setErr] = useState(null)

    async function handleSubmit(e){
        e.preventDefault()

        try{
            const response = await axiosAuth.post('/resetPassword', {
                email,
                newPassword,
                resetPasswordToken: code
            }, {
                withCredentials: true,
                headers:{
                    'X-CSRF-TOKEN': csrfToken
                }
            })
            const data = response.data

            setErr('')
            // save access token

            const prevLocation = localStorage.getItem('location');
            navigate(prevLocation ? prevLocation : url.home)

        }catch(err){
            if(err.response){
                setErr(err.response.data.message)
            }else{
                setErr(err.message)
            }
            
        }
    }

  return (
    <BaseLayout>
        <div id="reset_password">
            <h2>Reset Password</h2>
            <p id='reset_password__text'>
                Enter your new password and dont forget it again.
            </p>

            <form action="" method='post' id='reset_password__form' onSubmit={handleSubmit}>
            <div className="reset_password__input__container">
                <HiOutlineMail className='reset_password__icon'/>
                <input type="email" name='email' disabled={true} value={email} className='reset_password__input'/>
            </div>

            <div className="reset_password__input__container">
                <RiLockPasswordLine className='reset_password__icon'/>
                <input type="password" name='password' placeholder='Enter New Password' className='reset_password__input' onChange={(e) => setNewPassword(e.target.value)}/>
            </div>
            <button id='reset_password__submit'>Reset Password</button>
            </form>
            <span id='err_message'>{err}</span>
        </div>
    </BaseLayout>
  )
}

export default ResetPassword