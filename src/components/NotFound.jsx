
import './notFound.css'

function NotFound({children}){
  return(
    <div id='resource__notfound'>
      <img src="/404.png" alt="" />
      <span>The resource you're looking for is not found.</span>
      <span>That's all we know.</span>
      {children}
    </div>
  )
}

export default NotFound