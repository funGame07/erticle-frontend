import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

function useAxiosPrivate() {
    const refresh = useRefreshToken()
    const {auth} = useAuth()
  
    useEffect(()=>{
        axiosPrivate.interceptors.request.use(
            config =>{
                if(!config.headers["Authorization"]){
                    console.log("accesstoken: " , auth.accessToken)
                    console.log("auth", auth)
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`
                    // send the request with the access token
                    // right here acccess token could be a null or valid token
                }
                return config
            },
            err => Promise.reject(err)
        )

        axiosPrivate.interceptors.response.use(
            response => response,
            async err=>{
                const prevResponse = err.config
                if(!prevResponse?.sent && err.response.status == 403){// 403 is sent when api foundout token is no/nolonger valid
                    // checking if the previous the first send, if yes, then retry but gain the refresh token first
                    prevResponse.sent = true
                    const newAccessToken = await refresh()
                    err.config.headers["Authorization"] = `Bearer ${newAccessToken}`
                    console.log("token1: ",newAccessToken)
                    return axiosPrivate(prevResponse)
                }
                return Promise.reject(err)
            }
        )

        return ()=>{
            axiosPrivate.interceptors.response.eject()
            axiosPrivate.interceptors.request.eject()
        }
    }, [auth, refresh])

    return axiosPrivate
}

export default useAxiosPrivate