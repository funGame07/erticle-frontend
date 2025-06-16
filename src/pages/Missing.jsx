import BaseLayout from '../components/layouts/BaseLayout'
import url from '../utils/urlConstants'

import { Link } from 'react-router-dom'
import NotFound from '../components/NotFound'

import './css/missing.css'

function Missing() {
  return (
    <BaseLayout>
      <NotFound>
        <Link to={url.home} className='missing__link'>
            Back to Home?
        </Link>
      </NotFound>
    </BaseLayout>
  )
}

export default Missing