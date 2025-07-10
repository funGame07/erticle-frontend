import React from 'react'

import "./serverError.css"

function ServerError({children}){
  return (
    <div id='server__error'>
      <img src="/error.png" alt="" />
      <span>Looks like our server is running into a problem</span>
      <span>We will comeback soon.</span>
      {children}
    </div>
  )
}

export default ServerError