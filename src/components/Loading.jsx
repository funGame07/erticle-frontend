import React from 'react'
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'

function Loading() {
  return (
    <UseAnimations animation={loading}/>
  )
}

export default Loading