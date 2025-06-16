import { Link } from 'react-router-dom'

import './baseLayout.css'
import url from '../../utils/urlConstants'

function BaseLayout({children}) {

  return (
    <div id='baseLayout'>
      <header className='header__logo'>
        <Link to={url.index} className='logo__link'>
          <img className='logo__image' src="/erticle2.png" alt="logo image" />
          <span className='logo__title'>Erticle</span>
        </Link>
      </header>
      
      {children}
    </div>
  )
}

export default BaseLayout