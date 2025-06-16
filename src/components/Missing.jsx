import { Link } from 'react-router-dom'
import "./missing.css"

function Missing() {
  return (
    <div className='missing'>
        {/* <h1 className='missing__header'>404</h1> */}
        <img src="./404.gif" />
        <p className='missing__text'>I think you are lost...</p>
        <Link to={"/home"} className='missing__link'>
            Back to Home?
        </Link>
    </div>
  )
}

export default Missing