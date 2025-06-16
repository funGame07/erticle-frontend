import AppLayout from '../components/layouts/AppLayout'
import SearchBar from '../components/SearchBar'
import ArticleCard from '../components/ArticleCard'

import './css/bookmark.css'
import { useEffect, useState } from 'react'
import { axiosArticle } from '../api/axios'
import useAuth from '../hooks/useAuth'

function Bookmarks() {
  const {auth, isAuth} = useAuth()
  const [articles, setArticles] = useState([])

  useEffect(() =>{
    async function getBookmark(){
      const response = await axiosArticle.get(`/get/bookmark/${auth.id}`)
      const data = response.data

      setArticles(data.bookmarks?.reverse())
      console.log(data)
    }

    if(isAuth) getBookmark()
    
  }, [isAuth])
  return (
    <AppLayout title={'Bookmark'}>
        <SearchBar />
        {articles.length === 0 && <span>No content</span> }
        <div id="bookmark__main">
          {
            articles.map((article, i) =>{
              return <ArticleCard article={article} key={i}/>
            })
          }
        </div>
    </AppLayout>
  )
}

export default Bookmarks