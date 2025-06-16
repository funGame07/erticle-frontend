
import AppLayout from '../components/layouts/AppLayout'
import SearchBar from '../components/SearchBar'
import ArticleCard from '../components/ArticleCard'

import Loading from '../components/Loading'

import './css/article.css'
import { useEffect, useState } from 'react'
import { axiosArticle } from '../api/axios'

function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() =>{
    setLoading(true)
    
    async function getArticles(){
      try{
        const response = await axiosArticle.get('/get')
        const data = response.data
        console.log(data)
        setArticles(data.articles)
      }catch(err){
        console.log(err)
      }finally{
        setLoading(false)
      }
    }
    getArticles()
  }, [])

  return (
    <AppLayout>
        <SearchBar />
        
        <div id="article__main">
          {articles.length === 0 && <span>No content</span> }
          {
            loading ? 
            <Loading />
            :
            articles.map((article, i) =>{
              return <ArticleCard article={article} key={i}/>
            })
          }
        </div>
    </AppLayout>
  )
}

export default Articles