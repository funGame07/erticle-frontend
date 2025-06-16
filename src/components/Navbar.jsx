import { useContext, useEffect, useState } from 'react'
import { Link, useLocation, matchPath } from 'react-router-dom'
import axiosAuth from '../api/axios'

import url from '../utils/urlConstants'

import useAuth from '../hooks/useAuth'

import "./navbar.css"

import { IoHomeOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import { GoBookmark } from "react-icons/go";
import { MdOutlineArticle, MdAddCircleOutline, MdOutlineBadge } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import { useResizer } from '../hooks/useResizer'
import imgURLParser from '../utils/imgURLParser'


const navPrimaryLinks = [
  {
    link: url.home,
    icon: <IoHomeOutline size={23}/>,
    text: "Home"
  },
  {
    link: url.articles,
    icon: <MdOutlineArticle size={23}/>,
    text: "Articles"
  },
  {
    link: url.bookmark,
    icon: <GoBookmark size={23}/>,
    text: "Bookmarks"
  },
  {
    link: url.create,
    icon: <MdAddCircleOutline size={23}/>,
    text: "Create Article"
  }
]

function Navbar() {
  const width = useResizer()
  const {setAuth, auth, isAuth, setIsAuth, isReady, setIsReady} = useAuth()

  const location = useLocation()
  
  function handleToggle(){
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.toggle("collapse")
  }

  async function handleSignOut(){
    try{
      width <= 480 && handleToggle()

      const response = await axiosAuth.get("/signout", {
        withCredentials: true
      })
      console.log(response)
      setAuth({})
      setIsAuth(false)
    }catch(err){
      console.log(err)
    }finally{
      setIsReady(false)
    }
  }

  useEffect(() =>{
    // window.location.reload()
    console.log('change')
    if(!Object.keys(auth).length){
      setIsAuth(false)
    }else{
      setIsAuth(true)
    }
  }, [auth])

  return (
    <aside className={`sidebar ${width <= 480? "mobile collapse": width <=990 ? "tablet": ''}`} id='sidebar'>
      <div className='overlay' onClick={handleToggle}></div>

      <header className='sidebar__header'>
        <Link to={url.home} className='sidebar__logo'>
          <img src="/erticle2.png" alt="" width={40}/>
          <span className='sidebar__title'>Erticle</span>
        </Link>
        <button className='sidebar__toggle' onClick={handleToggle}>
          {/* <span className="material-symbols-rounded"><IoIosArrowBack size={20}/></span> */}
          <IoIosArrowBack className="toggle__icon"size={20}/>
        </button>
      </header>

      <nav className='sidebar__nav'>
        <ul className='nav__list nav__primary'>
          {
            navPrimaryLinks.map((link, i)=>{
              const isActive = location.pathname === link.link
              return (
                <li className='nav__item' key={i}>
                  <Link to={link.link} className={`nav__link ${isActive ? 'active': ''}`} onClick={width <= 480 && handleToggle}>
                    {/* <span className="material-symbols-rounded">{link.icon}</span> */}
                    <span>{link.icon}</span>
                    <span className="nav__label">{link.text}</span>
                  </Link>
                  <span className="nav__tool-tip">{link.text}</span>
                </li>
              )
            })
          }
        </ul>

        <span className='nav__filler'>
            {/* <img src="/lunar.png" alt="" width={"90%"}/> */}
        </span>

        <span className='nav__accountinfo'>
          <img src={imgURLParser(auth.picture)|| '/guest.png'} alt="profile image" className='nav__profile' crossOrigin="anonymous" referrerPolicy="no-referrer"/>
          <div>
            <p>Logged in as:</p>
            <p>{isAuth ? auth.email : "Guest"}</p>
          </div>
          
        </span>

        <ul className='nav__list nav__secondary'>
          {
            // display profile menu if user already auth
            isAuth &&
            <li className='nav__item'>
              <Link to={url.profile.replace(':id', auth.id || '')} className={`nav__link ${matchPath({path: url.profile, end: false}, location.pathname) && 'active'}`}  onClick={width <= 480 && handleToggle}>
                <span><MdOutlineBadge size={20}/></span>
                <span className="nav__label">Profile </span>
              </Link>
              <span className="nav__tool-tip">Profile</span>
            </li>
          }
          
          <li className='nav__item'>
            <Link to={isAuth? "#" : url.signin} className='nav__link'  onClick={isAuth && handleSignOut}>
              <span>{isAuth ? <PiSignOutBold size={20}/> : <PiSignInBold size={20}/>}</span>
              <span className="nav__label">{isAuth ? "Signout" : "Signin"}</span>
            </Link>
             <span className="nav__tool-tip" >{isAuth ? "Signout" : "Signin"}</span>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default Navbar