import { useEffect, useState } from "react"
import axios from "axios"
import axiosAuth from "../api/axios"

/**
 * @returns {string}
 * 
 * return the csrf-token
 */
function useCsrf() {
    const [csrfToken, setCsrfToken] = useState()

    useEffect(() =>{
        async function getCsrfToken(){
        const response = await axiosAuth.get('/csrf', {
            withCredentials: true
        })
        const data = response.data
        
        setCsrfToken(data.csrfToken)
        }
        getCsrfToken()
    }, [])

    return csrfToken
}

export default useCsrf