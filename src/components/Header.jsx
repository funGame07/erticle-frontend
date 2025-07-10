import React from 'react'

import url from '../utils/urlConstants'

function Header() {
  return (
    <header class="idx-header">
          <div class="idx-container">
            <a href={url.home}>
              <div class="idx-logo">
                  <div class="idx-logo-icon">
                      <img src="/erticle2.png" width={"100%"} alt="" />
                  </div>
                  <span class="idx-logo-text">Erticle</span>
              </div>
            </a>
          </div>
      </header>
  )
}

export default Header
