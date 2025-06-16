import React, { useEffect, useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'
import ArticleCard from '../components/ArticleCard'
import SearchBar from '../components/SearchBar'

import './css/profile.css'
import useAuth from '../hooks/useAuth';
import Modal from '../components/Modal'
import { axiosUser } from '../api/axios'
import { useParams, Link } from 'react-router-dom'
import url from '../utils/urlConstants'
import useCsrf from '../hooks/useCsrf'
import imgURLParser from '../utils/imgURLParser'
import Loading from './../components/Loading'
import NotFound from '../components/NotFound'

function Profile() {
  const params = useParams()
  const {auth, isReady } = useAuth()
  const [showPopup, setShowPopup] = useState(false)
  const [articles, setArticles] = useState([])
  const [profile, setProfile] = useState({})

  const [isUser, setIsUser] = useState(false)
  const [isErr, setIsErr] = useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(() =>{
    const controller = new AbortController();

    async function getProfile (){
      setLoading(true)
      setIsErr(false)
      try{
        const response = await axiosUser.get(`/profile/${params.id}`, {signal: controller.signal})
        const data = response.data

        setIsUser(data.profile._id === auth.id)
        
        setProfile(data.profile)
        setArticles(data.articles)
      }catch(err){
        console.log(err)
        setIsErr(true)
      }finally{
        setLoading(false)
      }
    }

    if(isReady) getProfile()

    return () => controller.abort()
  }, [isReady])

  return (
    <AppLayout>
      { loading && <Loading /> }

      { isErr && !loading && <NotFound /> }
        
      { !isErr && !loading &&
          <div id='profile'>
            <div id='profile__article'>
              <h2>{profile.username}'s Articles</h2>
              <SearchBar />
              {
                articles?.length > 0 ?

                articles.map((article, i) =>{
                  return <ArticleCard article={article} key={i}/>
                })
                :
                <div className="no__articles">
                  <span>Loos like you haven't write any article yet.</span>
                  <Link className='create__one' to={url.create}>Create One</Link>
                </div>
                
              }

            </div>

            <div id="profile__main">
              <div id="profile__img">
                <img src={imgURLParser(profile.picture) || '/guest.png'} alt="" crossOrigin='anonymous' referrerPolicy='no-referrer'/>
              </div>
              
              <div id="profile__info">
                <div className="profile__info__wrapper">
                  <span>Username</span>
                  <h2>{profile.username}</h2>
                </div>

                <div className="profile__info__wrapper">
                  <span>Email</span>
                  <h4>{profile.email}</h4>
                </div>
              </div>
              
              <div id="profile__desc">
                <span>Description</span>
                <div className='desc'>
                  <p>
                    {profile.description}
                  </p>
                </div>
              </div>
              <br />
              
              {
                isUser &&
                <div className="edit__profile" onClick={() => setShowPopup(true)}>
                  Customize Your Profile
                </div>
              }
              

            </div>
          </div>
      }
      {
        showPopup &&
        <Modal setShowModal={setShowPopup}>
          <EditPopup profile={profile} setProfile={setProfile} setShowPopup={setShowPopup}/>
        </Modal>
      }
    </AppLayout>
  )
}

function EditPopup({profile, setProfile, setShowPopup}){
  const csrfToken = useCsrf()
  const {auth} = useAuth()
  const [newDescription, setNewDescription] = useState(profile.description)
  const [newImg, setNewImg] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  async function handleSubmit(e){
    e.preventDefault()

    if(!newImg && newDescription?.trim() === profile.description?.trim()) return;

    const formData = new FormData()
    if(newImg){
      formData.append('profilePic', newImg, newImg.name)
    }
    formData.append('description', newDescription)
    formData.append('userId', auth.id)
    
    try{
      await axiosUser.patch('/update/profile', formData, {
        headers:{
          'X-CSRF-TOKEN': csrfToken,
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })

      setProfile(profile => {
        return {...profile, description: newDescription, picture: imgURL || profile.picture}
      })

    }catch(err){
      console.log(err)
    }

    setShowPopup(false)
  }

  function handleImgChange(e){
    const img = e.target.files[0]
    setNewImg(img)

    const url = URL.createObjectURL(img)
    setImgURL(url)
    document.getElementById('edit__img').src = url
  }

  return(
      <form action="" method="POST" id='edit__form' onSubmit={handleSubmit}>
        
        <div className="top__field">
          <label htmlFor="img" className='img__label'>
            <img src={imgURLParser(profile.picture) || '/guest.png'} id='edit__img' alt="" crossOrigin='anonymous' referrerPolicy='no-referrer'/>
            <input type="file" accept='image/png, image/jpg, image/webp, image/avif, image/gif' style={{display: 'none'}} id='img' onChange={handleImgChange}/>
          </label>

          <div id="top__right">
            <div className="input__wrapper">
              <label htmlFor="username__edit">Username</label>
            <input type="text" value={profile.username} id='username__edit' className='edit__input' disabled/>
            </div>

            <div className="input__wrapper">
              <label htmlFor="email__edit">Email</label>
            <input type="text" value={profile.email} id='email__edit' className='edit__input' disabled/>
            </div>
          </div>
        </div>

        <div className="bottom__field">
          <label htmlFor="desc__edit">Description</label>
          <textarea name="" id="desc__edit" onChange={(e) => setNewDescription(e.target.value)}>
            {newDescription}
          </textarea>
        </div>

        <button className="edit__profile save__profile" onClick={() => setShowPopup(true)}>
          Save Changes
        </button>
       
      </form>
  )
}

export default Profile