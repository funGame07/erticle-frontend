import AppLayout from '../components/layouts/AppLayout'
import SearchBar from '../components/SearchBar'
import ArticleCard from '../components/ArticleCard'

import './css/bookmark.css'
import { useEffect, useState } from 'react'
import { axiosArticle } from '../api/axios'
import useAuth from '../hooks/useAuth'
import ServerError from '../components/ServerError'
import Loading from '../components/Loading'

function Bookmarks() {
  const {auth, isAuth} = useAuth()
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState([])
  const [err, setErr] = useState(false)

  useEffect(() =>{
    async function getBookmark(){
      setErr(false)
      setLoading(true)
      try{
        const response = await axiosArticle.get(`/get/bookmark/${auth.id}`)
        const data = response.data

        setArticles(data.bookmarks?.reverse())
      }catch(err){
        console.log(err)
        setErr(true)
      }finally{
        setLoading(false)
      }
    }

    if(isAuth) getBookmark()
    
  }, [isAuth])

  return (
    <AppLayout title={'Bookmark'}>
        <SearchBar />
        {err && !loading && <ServerError/>}

        {!err && loading && <Loading /> }

        {!err && !loading && 
          <div id="bookmark__main">
            {
              articles.map((article, i) =>{
                return <ArticleCard article={article} key={i}/>
              })
            }
          </div>
        }
    </AppLayout>
  )
}

export default Bookmarks