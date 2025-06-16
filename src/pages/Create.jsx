import { useEffect, useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'

import './css/create.css'
import Editor from '../components/Editor'
import { axiosArticle } from '../api/axios';

import sanitizeHtml from 'sanitize-html';
import Modal from '../components/Modal';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';
import url from '../utils/urlConstants';

function Create() {
  const navigate = useNavigate()
  const location = useLocation()
  const {isReady, isAuth} = useAuth()
  const {auth} = useAuth()
  const [title, setTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [imgURL, setImgURL] = useState(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(null)

  async function imageCb(formData){
    const response = await axiosArticle.post('/upload/image', formData, {
      headers:{
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true,
    })

    const data = response.data
    return {
      imagePath: data.imagePath,
      apiDomain: import.meta.env.VITE_API_URL
    }
  }

  function handleSave(e){
    e.preventDefault()
    const firstParagraph = document.getElementById('editor__target').firstChild
    const defOverview = firstParagraph.textContent.substring(0, 100)
    setOverview(defOverview)
    setShowConfirmation(true)
  }

  function handleThumbnail(e){
    const url = URL.createObjectURL(e.target.files[0])
    setThumbnail(e.target.files[0])
    setImgURL(url)
    document.getElementById('thumbnail__img').src = url
  }

  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    setErr(null)

    if(!title.trim()){
      setErr('title is required')
      setLoading(false)
      return
    }

    const content = document.getElementById('editor__target').getHTML()
    const clean = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        img: ['src', 'width', 'alt', 'style']
      }
    })
    
    const formData = new FormData()
    formData.append('title', title.trim())
    formData.append('overview', overview)
    formData.append('content', clean)
    formData.append('authorId', auth.id)
    if(thumbnail) formData.append('thumbnail', thumbnail, thumbnail.name)

    try{
      const response = await axiosArticle.post('/post', formData,{
        headers:{
          'Authorization': `Bearer ${auth.accessToken}`,
          'Content-Type': 'multipart/form-data'
        },
      })
      const data = response.data
      console.log(data)
      // redirect to its article page
      // /article/articleId
      navigate(url.articlePage.replace(':id', data.article._id))
      
    }catch(err){
      setErr(err.message)
    }finally{
      setLoading(false)
    }
  }

  function handleOverview(e){
    if(e.target.value.length < 100) setOverview(e.target.value)
  }

  useEffect(() =>{
    if(isReady && !isAuth){
      localStorage.setItem('location', location.pathname)
      navigate(url.signin)
    }
  }, [isReady, isAuth])

  return (
    <AppLayout>
        <div id="create__article">
          <form action="" id='create__form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Title' id='create__title' value={title} onChange={(e) => setTitle(e.target.value)}/>
            <div id="editor__target" contentEditable={true} suppressContentEditableWarning={true}>
              <p>saya suka minum juss apel</p>
            </div>
            <div className='create__button' onClick={handleSave}>
              Save
            </div>
            {
              showConfirmation && 
              
              <Modal setShowModal={setShowConfirmation}>
                <div id="create__confirmation">
                  <label htmlFor="input__thumbnail" id='thumbnail__label'>
                    <div className="conf__thumbnail">
                      {imgURL ?
                        <img src={imgURL} alt="" id='thumbnail__img'/>
                        :
                        <span>Click to select thumbnail</span>
                      }
                      <input type="file" accept='image/png, image/jpg, image/webp, image/avif, image/gif' id='input__thumbnail' style={{display: 'none'}} onChange={handleThumbnail}/>
                    </div>
                  </label>
                    

                  <div>
                    <div className='conf__wrapper'>
                      <label htmlFor="conf__title">Title</label>
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} id='conf__title' required/>
                    </div>

                    <div className='conf__wrapper'>
                      <label htmlFor="conf__overview">Overview [Max: {overview.length}/100 letters]</label>
                      <textarea name="" id="conf__overview" value={overview} onChange={handleOverview}></textarea>
                    </div>

                    <div className='button__wrapper'>
                      <button className='create__button'>Publish</button>
                      {loading && <Loading /> }
                      {!loading && err &&
                        <span className='err_message'>{err}</span>
                      }
                    </div>
                  </div>
                </div>
              </Modal>
              
            }
            <Editor editFieldId={'editor__target'} imageCb={imageCb}/>
          </form>
          {/* <div id="editor__target" contentEditable={true} suppressContentEditableWarning={true} /> */}
          {/* <Editor editFieldId={'editor__target'} imageCb={imageCb}/> */}
          {/* <div id="target"></div> */}
        </div>

    </AppLayout>
  )
}

export default Create