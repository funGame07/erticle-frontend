import React, { useEffect, useState } from 'react'
import AppLayout from '../components/layouts/AppLayout'

import { Link } from 'react-router-dom'
import url from '../utils/urlConstants.js'
import { axiosArticle } from '../api/axios.js'
import overviewCut from '../utils/overviewCut'

import './css/home.css'
import './js/home.js'
import imgURLParser from '../utils/imgURLParser.js'
import formatDate from '../utils/formatDate.js'
import ServerError from '../components/ServerError.jsx'

function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)

  useEffect(() =>{
    async function getArticles(){
      setLoading(true)
      setErr(false)
      try{
        const response = await axiosArticle.get('/get/limit/4')
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
      { err && <ServerError /> }

      {
        !err && 
        <>
          <section className="hp-hero" id="home">
            <div className="hp-hero-content">
                <h1>Discover Stories That Matter</h1>
                <p>Explore thoughtful articles, insights, and perspectives from writers around the world. Join our community of curious minds.</p>
                <div className="hp-hero-cta">
                    <Link to={url.articles} className="hp-cta-primary">Start Reading</Link>
                </div>
            </div>
          </section>

          <section className="hp-featured-section" id="articles">
            <div className="hp-section-header fade-in">
                <h2>Featured Articles</h2>
                <p>Handpicked stories from our editorial team</p>
            </div>

            <div className="hp-featured-grid fade-in">
              {
              !loading && 
                <Link to={url.home}>
                <article className="hp-featured-main">
                    <img src={imgURLParser(articles[0].thumbnail)} alt="Featured article" />
                    <div className="hp-featured-main-content">
                        <span className="hp-category">Technology</span>
                        <h3>{articles[0].title}</h3>
                        <p>{overviewCut(articles[0].overview)}</p>
                        <div className="hp-article-meta">
                            <span>By {articles[0].author.username}</span>
                            <span>•</span>
                            <span>{formatDate(articles[0].createdAt)}</span>
                        </div>
                    </div>
                </article>
                </Link>      
              }


                <aside className="hp-featured-sidebar">
                  {
                    articles.map((article, i) =>{
                        if(i === 0) return
                        return <Link key={i} to={url.home} className="hp-sidebar-article">
                                  <img src={imgURLParser(article.author.picture)} alt="Article" />
                                  <div className="hp-sidebar-article-content">
                                      <h4>{article.title}</h4>
                                      <p>{overviewCut(article.overview, 70)}</p>
                                      <div className="hp-meta">{article.author.username} • {formatDate(article.createdAt)}</div>

                                  </div>
                              </Link>
                      }
                    )
                  }
                </aside>
            </div>
          </section>

          <section className="hp-categories-section" id="categories">
            <div className="hp-categories-container">
                <div className="hp-section-header fade-in">
                    <h2>Explore Categories</h2>
                    <p>Find articles that match your interests</p>
                </div>

                <div className="hp-categories-grid">
                    <Link to={url.home} className="hp-category-card fade-in">
                        <div className="hp-category-icon">💡</div>
                        <h3>Technology</h3>
                        <p>Latest trends in tech, AI, and innovation</p>
                    </Link>

                    <Link to={url.home} className="hp-category-card fade-in">
                        <div className="hp-category-icon">🌱</div>
                        <h3>Sustainability</h3>
                        <p>Environmental insights and green living</p>
                    </Link>

                    <Link to={url.home} className="hp-category-card fade-in">
                        <div className="hp-category-icon">🎨</div>
                        <h3>Design</h3>
                        <p>Creative inspiration and design thinking</p>
                    </Link>

                    <Link to={url.home} className="hp-category-card fade-in">
                        <div className="hp-category-icon">📚</div>
                        <h3>Culture</h3>
                        <p>Society, books, and cultural commentary</p>
                    </Link>
                </div>
            </div>
          </section>

        

          <footer className='hp-footer'>
            <div className="hp-footer-content">
                <div className="hp-footer-section">
                    <h3>ERTICLE</h3>
                    <p>A modern platform for thoughtful writing and meaningful conversations.</p>
                </div>

                <div className="hp-footer-section">
                    <h3>Categories</h3>
                    <ul>
                        <li><Link to={url.home}>Technology</Link></li>
                        <li><Link to={url.home}>Design</Link></li>
                        <li><Link to={url.home}>Culture</Link></li>
                        <li><Link to={url.home}>Sustainability</Link></li>
                    </ul>
                </div>

            </div>
          </footer>
        </>
      }
    </AppLayout>
  )
}

export default Home