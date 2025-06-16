import React from 'react'
import Navbar from '../Navbar'

import './appLayout.css'

function AppLayout({children}) {
  return (
    <div id='appLayout'>
        <Navbar />

        <main id='main'>
          {children}
        </main>
        
    </div>
  )
}

export default AppLayout