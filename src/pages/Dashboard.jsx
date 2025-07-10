
import { useEffect } from 'react'
import BaseLayout from '../components/layouts/BaseLayout'

import url from '../utils/urlConstants'

import { Link, useNavigate } from 'react-router-dom'
import './css/dashboard.css'
import './js/dashboard.js'

function Dashboard() {
  const navigate = useNavigate()

  // useEffect(()=>{
  //   if(localStorage.getItem('location')){
  //     navigate(localStorage.getItem('location'))
  //   }
  // }, [])

  return (
    <BaseLayout>
    <>
      <div class="idx-bg-animation"></div>
    
      <div class="idx-floating-shapes">
          <div class="idx-shape"></div>
          <div class="idx-shape"></div>
          <div class="idx-shape"></div>
      </div>

      <section class="idx-hero">
          <div class="idx-container">
              <div class="idx-hero-content">
                  <div class="idx-hero-badge">
                      <span>🚀 New Platform Launch</span>
                  </div>
                  <h1>Where Stories Come Alive</h1>
                  <p class="idx-hero-subtitle">Discover, create, and share extraordinary stories with a global community of passionate writers and readers. Your voice matters.</p>
                  <div class="idx-hero-cta">
                      <Link to={url.create} class="idx-btn idx-btn-primary">
                          Start Creating
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                      </Link>
                      <Link to={url.articles} class="idx-btn idx-btn-secondary">
                          Explore Stories
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="11" cy="11" r="8"/>
                              <path d="m21 21-4.35-4.35"/>
                          </svg>
                      </Link>
                  </div>
                  <div class="idx-stats">
                      <div class="idx-stat-item">
                          <span class="idx-stat-number">25K+</span>
                          <span class="idx-stat-label">Stories Published</span>
                      </div>
                      <div class="idx-stat-item">
                          <span class="idx-stat-number">12K+</span>
                          <span class="idx-stat-label">Active Writers</span>
                      </div>
                      <div class="idx-stat-item">
                          <span class="idx-stat-number">150K+</span>
                          <span class="idx-stat-label">Monthly Readers</span>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section class="idx-features">
          <div class="idx-container">
              <div class="idx-section-header idx-fade-in">
                  <h2 class="idx-section-title">Craft Your Narrative</h2>
                  <p class="idx-section-subtitle">Powerful tools and features designed to elevate your storytelling experience</p>
              </div>
              <div class="idx-features-grid">
                  <div class="idx-feature-card idx-fade-in">
                      <div class="idx-feature-icon">
                          <svg viewBox="0 0 24 24">
                              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                          </svg>
                      </div>
                      <h3 class="idx-feature-title">Intuitive Editor</h3>
                      <p class="idx-feature-description">Write with focus using our distraction-free editor. Rich formatting, real-time collaboration, and seamless media integration make storytelling effortless.</p>
                  </div>
                  <div class="idx-feature-card idx-fade-in">
                      <div class="idx-feature-icon">
                          <svg viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                      </div>
                      <h3 class="idx-feature-title">Smart Discovery</h3>
                      <p class="idx-feature-description">AI-powered recommendations connect you with stories that match your interests. Discover hidden gems and trending narratives tailored just for you.</p>
                  </div>
                  <div class="idx-feature-card idx-fade-in">
                      <div class="idx-feature-icon">
                          <svg viewBox="0 0 24 24">
                              <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H16.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5H17l1.8 5.4L16 22h4zm-11.5 0v-4.5h-2v-3A2.5 2.5 0 0 1 9 12h2a2.5 2.5 0 0 1 2.5 2.5v3h-2V22h-3z"/>
                          </svg>
                      </div>
                      <h3 class="idx-feature-title">Vibrant Community</h3>
                      <p class="idx-feature-description">Connect with fellow creators, share feedback, and grow together. Join writing groups, participate in challenges, and build meaningful relationships.</p>
                  </div>
              </div>
          </div>
      </section>

      <section class="idx-cta-section">
          <div class="idx-container">
              <div class="idx-cta-container idx-fade-in">
                  <h2 class="idx-cta-title">Ready to Begin?</h2>
                  <p class="idx-cta-subtitle">Join thousands of storytellers who've already discovered their voice on Zenith.</p>
                  <div class="idx-hero-cta">
                      <Link to={url.home} class="idx-btn idx-btn-primary">
                          Start Your Journey
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                      </Link>
                      <Link to="#" class="idx-btn idx-btn-secondary">
                          Learn More
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                              <circle cx="12" cy="12" r="10"/>
                              <path d="M9 12l2 2 4-4"/>
                          </svg>
                      </Link>
                  </div>
              </div>
          </div>
      </section>
    </>
    </BaseLayout>
  )
}

export default Dashboard