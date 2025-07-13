
import AppLayout from '../components/layouts/AppLayout'
import SearchBar from '../components/SearchBar'
import ArticleCard from '../components/ArticleCard'

import Loading from '../components/Loading'
import ServerError from '../components/ServerError'

import './css/article.css'
import { useEffect, useState } from 'react'
import { axiosArticle } from '../api/axios'

function Articles() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)

  useEffect(() =>{
    async function getArticles(){
      setLoading(true)
      setErr(false)
      try{
        const response = await axiosArticle.get('/get')
        const data = response.data
        console.log(data)
        setArticles(data.articles)
      }catch(err){
        console.log(err)
        setErr(true)
      }finally{
        setLoading(false)
      }
    }
    getArticles()
  }, [])

  return (
    <AppLayout>
        <SearchBar />

        {err && !loading && <ServerError /> }

        {!err && loading && <Loading /> }

        {!err && !loading && 
          <div id="article__main">
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

export default Articles