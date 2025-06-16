import { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import "./dashboard.css"
import { 
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    FaNodeJs,
    FaInstagram,
    FaFacebookF,
    FaGithub
} from "react-icons/fa";
import { 
    SiExpress,
    SiMongodb,
    SiJsonwebtokens,
    SiMongoose,
    SiAxios
 } from "react-icons/si";

function Dashboard() {
    const {width} = useAuth()
    const [showAbout, setShowAbout] = useState(false)

  return (
    <section className={`dashboard ${width <= 550? "mobile": width <= 1260? "tablet": ""}`}>
        {
            showAbout && <About showAbout={showAbout} setShowAbout={setShowAbout}/>
        }
        <main className="dashboard__main">
            <div className='main__image'>
                <img src="/dashboard.png" alt="dashbaord image"/>
                <span className="material-symbols-rounded" onClick={()=> setShowAbout(!showAbout)}>info</span>
            </div>


            <div className="main__title">
                <h1><span className='no-wrap'>Welcome to Erticle</span></h1>
                <h5>Create and share you article</h5>
            </div>

            <aside className="main__left-aside">
                <span className="dot dot-db1"></span>
                <span className="dot dot-db2"></span>
                <span className="dot dot-db5"></span>
                <span className="dot dot-db6"></span>
                <span className="dot dot-db7"></span>
                <div className="aside__content">
                    <div>
                        <p>Build the habits</p>
                        <Link to={"/articles"}>
                            <button className='aside__button-tablet'>
                                Get Started
                            </button>
                        </Link>
                    </div>
                    <div>
                        <header>
                            <span className="material-symbols-rounded icon">neurology</span>
                            <h4>Sharpen your brain</h4>
                        </header>
                        <header>
                            <span className="material-symbols-rounded icon">sentiment_satisfied</span>
                            <h4>Self-confidence</h4>
                        </header>
                        <header>
                            <span className="material-symbols-rounded icon">favorite</span>
                            <h4>Positive Response</h4>
                        </header>
                        <header>
                            <span className="material-symbols-rounded icon">chat</span>
                            <h4>Get feedback</h4>
                        </header>
                        <header>
                            <span className="material-symbols-rounded icon">face</span>
                            <h4>Nerd</h4>
                        </header>
                    </div>

                    <Link to={"/articles"}>
                        <button className='aside__button'>
                            Get Started
                        </button>
                    </Link>
                </div>
            </aside>

            <aside className="main__right-aside">
                <div className="aside__content">
                    <header>
                        <span className="material-symbols-rounded icon">book_ribbon</span>
                        <h2>Benefits</h2>
                    </header>
                    <p>
                        Read enganging article written by community with various 
                        perspective and thought 
                    </p>
                </div>

                <div className="aside__content">
                    <header>
                        <span className="material-symbols-rounded icon">workspace_premium</span>
                        <h2>Creativity</h2>
                    </header>
                    <p>
                        Develop a comprehensive article outlining your journey
                        and knowledge to earn achievements.
                    </p>
                </div>
            </aside>
        </main>


    </section>
  )
}

function About({showAbout, setShowAbout}){
    return(
        <figure className='about'>
            <div className='about__overlay' onClick={()=> setShowAbout(!showAbout)}/>
            <div className='about__main'>
                <h1 className='about__title'>About Erticle</h1>
                <div className='about__section'>
                    <p>
                        Erticle is built for my personal project,
                        I build this Erticle with
                    </p>
                    <div className="about__icon__container">
                        <FaHtml5 className='about__icon'/>
                        <FaCss3Alt className='about__icon'/>
                        <FaJs className='about__icon'/>
                        <FaReact className='about__icon'/>
                        <FaNodeJs className='about__icon'/>
                        <SiExpress className='about__icon'/>
                        <SiMongodb className='about__icon'/>
                        <SiMongoose className='about__icon'/>
                        <SiJsonwebtokens className='about__icon'/>
                        <SiAxios className='about__icon'/>
                    </div>
                    
                </div>
                <div className='about__footer'>
                    <h1>Follow me</h1>
                    <div className="about__icon__container">
                        <Link to={"https://instagram.com/ellbrtt"} target='__blank'>
                            <FaInstagram className="footer__icon"/>
                        </Link>
                        <Link to={"https://facebook.com/elbert.austen"} target='__blank'>
                            <FaFacebookF className="footer__icon"/>
                        </Link>
                        <Link to={"https://github.com/funGame07"} target='__blank'>
                            <FaGithub className="footer__icon"/>
                        </Link>
                    </div>
                </div>
            </div>
        </figure>
    )
}

export default Dashboard