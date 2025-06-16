import { createContext, useEffect, useState } from 'react'
import axiosAuth from '../api/axios'

const AuthContext = createContext({})

export function AuthProvider({children}) {
    const [auth, setAuth] = useState({})
    const [isAuth, setIsAuth] = useState(false)
    const [isReady, setIsReady] = useState(false)

    useEffect(()=>{
      async function getauth(){
        try{ 
          const {data} = await axiosAuth.get("/refresh")
          setAuth({...data.user, accessToken: data.accessToken})
          setIsAuth(true)
        }catch(err){
          console.log(err)
        }finally{
          setIsReady(true)
        }
      }
      getauth()
    
    }, [])


    const values = {
        auth, // user's object profile
        setAuth,
        isReady,
        isAuth,
        setIsAuth,
    }

  return (
    <AuthContext.Provider value={values}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext