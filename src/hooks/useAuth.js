import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthProvider'

function useAuth() {
    const refreshAuth = useContext(AuthContext)
    return refreshAuth
}

export default useAuth