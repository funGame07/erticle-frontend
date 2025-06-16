import {Routes, Route } from 'react-router-dom'

import Index from './pages/Index'
import Home from './pages/Home'
import Articles from './pages/Articles'
import Missing from './pages/Missing'
import Create from './pages/Create'
import Bookmarks from './pages/Bookmarks'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Redirect from './pages/Redirect'
import ArticlePage from './pages/ArticlePage'

function App() {
  // breakpoints
  // <= 480 phone
  // <= 990 tablet
  // > 990 pc

  return (
    <>
          <Routes>
            <Route path='/' element={<Index />}/>
            <Route path='/home' element={<Home />}/>
            <Route path='/articles'element={<Articles />}/>
            <Route path='/bookmarks'element={<Bookmarks />}/>
            <Route path='/article/new'element={<Create />}/>
            <Route path='/article/:id'element={<ArticlePage />}/>
            <Route path='/profile/:id'element={<Profile />}/>
            <Route path='/auth/signup'element={<Signup />}/>
            <Route path='/auth/signin'element={<Signin />}/>
            <Route path='/auth/forgotpassword'element={<ForgotPassword />}/>
            <Route path='/auth/resetpassword'element={<ResetPassword />}/>
            <Route path='/auth/redirect'element={<Redirect />}/>
            <Route path='/articles/:name/upload'element={<div>upload (in nav maybe?)</div>}/>
            <Route path='/articles/update/:id'element={<div>update article (within article)</div>}/>
            <Route path='*' element={<Missing/>}/>
          </Routes>
    </>
    
  )
}

export default App
