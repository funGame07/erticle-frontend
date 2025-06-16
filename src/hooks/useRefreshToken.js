import axiosAuth from "../api/axios"
import useAuth from "./useAuth"

function useRefreshToken() {
    const {setAuth} = useAuth()

    async function refresh(){
        try{
            console.log("start refreshing")
            const response = await axiosAuth.get("/refresh")
            setAuth({...response.data.user, accessToken: response.data.accessToken})
            console.log("refresh: ", response)
            return response
        }catch(err){
            console.log(err)
        }
    }

    return refresh
}

export default useRefreshToken