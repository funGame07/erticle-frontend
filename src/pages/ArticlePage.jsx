import React, { useEffect, useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import url from '../utils/urlConstants'

import UseAnimations from "react-useanimations";
import heart from 'react-useanimations/lib/heart';
import trash2 from 'react-useanimations/lib/trash2';
import bookmark from 'react-useanimations/lib/bookmark';

import './css/articlePage.css'
import imgURLParser from '../utils/imgURLParser';
import axiosAuth, { axiosArticle } from '../api/axios';
import useAuth from '../hooks/useAuth';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import formatDate from '../utils/formatDate';

function ArticlePage() {
    const navigate = useNavigate()
    const {isReady, auth} = useAuth()
    const params = useParams()
    const [article, setArticle] = useState({})
    const [loading, setLoading] = useState(true)
    const [err, setErr] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [totalBookmarks, setTotalBookmarks] = useState(0)
    const [totalLikes, setTotalLikes] = useState(0)
    const [isAuthor, setIsAuthor] = useState(false)

    async function handleBookmark(e){
        if(!auth || !auth.id){
            return
        }
        try{
            // setLoading(true)
            const response = await axiosArticle.patch(`/update/bookmark/${params.id}`, {
                readerId: auth.id
            })
            const data = response.data
            if(data.alreadyBookmarked) setTotalBookmarks(totalBookmarks - 1)
            else setTotalBookmarks(totalBookmarks + 1)

            setIsBookmarked(!data.alreadyBookmarked)
            console.log(data)
        }catch(err){
            console.log(err)
        }finally{
            // setLoading(false)
        }
    }

    async function handleBookmark(e){
        if(!auth || !auth.id){
            return
        }
        try{
            const response = await axiosArticle.patch(`/update/bookmark/${params.id}`, {
                readerId: auth.id
            })
            const data = response.data
            if(data.alreadyBookmarked) setTotalBookmarks(totalBookmarks - 1)
            else setTotalBookmarks(totalBookmarks + 1)

            setIsBookmarked(!data.alreadyBookmarked)
            console.log(data)
        }catch(err){
            console.log(err)
        }
    }

    async function handleLike(e){
        if(!auth || !auth.id){
            return
        }
        try{
            const response = await axiosArticle.patch(`/update/like/${params.id}`, {
                readerId: auth.id
            })
            const data = response.data
            if(data.alreadyLiked) setTotalLikes(totalLikes - 1)
            else setTotalLikes(totalLikes + 1)

            setIsLiked(!data.alreadyLiked)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(() =>{
        const controller = new AbortController()

        async function getArticle(){
            setLoading(true)
            setErr(false)

            try{
                const response = await axiosArticle.get(`/get/${params.id}/${auth.id}`,{
                    signal: controller.signal
                })
                const data = response.data

                // const parser = new DOMParser()
                // const htmlDoc = parser.parseFromString(data.article.content, 'text/html')
                setArticle({...data.article })

                setTotalBookmarks(data.article.totalBookmarks)
                setIsBookmarked(data.isBookmarked)

                setTotalLikes(data.article.totalLikes)
                setIsLiked(data.isLiked)

                setIsAuthor(data.article.author._id === auth?.id)
            }catch(err){
                console.log(err)
                setErr(true)
            }finally{
                setLoading(false)
            }
        }

        if(isReady) getArticle()
        
        return () => controller.abort()
    }, [isReady])

    async function handleDelete(){
        try{
            const response = await axiosArticle.delete(`/delete/${params.id}`)
            const data = response.data
            
            console.log(data)
            navigate(url.articles)
        }catch(err){
            console.log(err)
        }
        
    }

    useEffect(() =>{
        if(Object.keys(article).length !== 0){
            document.getElementById('article__content').innerHTML = article.content
        }
    }, [article])

  return (
    <AppLayout>
        { loading && <Loading /> }
        { !loading && err && <NotFound /> }
        {
            !loading && !err &&
            <div id="article__page">
                <span id='article__title'>{article.title}</span>

                <div className="article__info__container">
                    <Link to={url.profile.replace(':id', article.author._id)} className='article__author'>
                        <div className="author__img__wrapper">
                            <img src={imgURLParser(article.author.picture)} alt="" />
                        </div>
                        <span>{article.author.username}</span>
                    </Link>
                    <div className="article__info">
                        <span>{formatDate(article.createdAt)}</span>
                        <span className='article__info__icons'>
                            <span>
                                <UseAnimations animation={heart} reverse={isLiked} fillColor='red' onClick={handleLike}/>
                                {totalLikes}
                            </span>
                            <span>
                                <UseAnimations animation={bookmark} reverse={isBookmarked} fillColor='' onClick={handleBookmark}/>
                                {totalBookmarks}
                            </span>
                            {
                                isAuthor &&
                                <span onClick={handleDelete}>
                                    <UseAnimations animation={trash2} fillColor=''/>
                                </span>
                            }
                            
                        </span>
                    </div>
                </div>

                <div id="article__content">
                    {/* {article.content} */}
                </div>
            </div>
        }
        
    </AppLayout>
  )
}

export default ArticlePage