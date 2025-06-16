
import { useEffect } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'

import url from '../utils/urlConstants'

import { Link, useNavigate } from 'react-router-dom'

function Index() {
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.getItem('location')){
      navigate(localStorage.getItem('location'))
    }
  }, [])

  return (
    <BaseLayout>
        Introduction
        <Link to={url.home}>go home</Link>
    </BaseLayout>
  )
}

export default Index