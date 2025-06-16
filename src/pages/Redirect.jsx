
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Missing from './Missing'

function Redirect() {
    const navigate = useNavigate()

    useEffect(() =>{
        if(localStorage.getItem('location')){
            navigate(localStorage.getItem('location'))
        }
    }, [])
    
  return (
    <Missing />
  )
}

export default Redirect