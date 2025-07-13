
import { FaRegBookmark, FaRegHeart  } from "react-icons/fa";

import './articleCard.css'
import imgURLParser from "../utils/imgURLParser";
import { useNavigate } from "react-router-dom";
import url from "../utils/urlConstants";
import formatDate from "../utils/formatDate";
import overviewCut from "../utils/overviewCut";

function ArticleCard({article}) {
    const navigate = useNavigate()

    function handleRedirect(){
        navigate(url.articlePage.replace(':id', article._id))
    }

  return (
    <div className="article_card" onClick={handleRedirect}>

        <div className='card__content'>
            <div className='content__top'>
                <div className="author">
                    <img src={imgURLParser(article.author.picture) || '/guest.png'} alt="" crossOrigin="anonymous" referrerPolicy="no-referrer"/>
                    <span>{article.author.username}</span>
                </div>
                <h3>{article.title}</h3>
                {/* <span><FaRegBookmark /></span> */}
            </div>

            <div className='content__mid'>
                {
                    overviewCut(article.overview, 90)
                }
            </div>

            <div className="content__bottom">
                <span>{formatDate(article.createdAt)}</span>
                <span><FaRegBookmark /> {article.totalBookmarks}</span>
                <span><FaRegHeart /> {article.totalLikes}</span>
            </div>
        </div>
            
        <div className="card__content__img">
            <div className="card__img">
                {article.thumbnail && <img src={imgURLParser(article.thumbnail)} alt=""/>  }
            </div>
        </div>
        
    </div>
  )
}

export default ArticleCard