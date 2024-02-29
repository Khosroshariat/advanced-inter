'use client'

import React from 'react'
import Nav from './Nav'
import Features from './Features'
import Reviews from './Reviews'
import Numbers from './Numbers'
import Footer from './Footer'
import { useDispatch } from 'react-redux'
import { openLoginModal } from '../redux/modalSlice'



function Landing() {

  const dispatch = useDispatch()


  return (
    <>
    <div>
        <Nav />
          <section id="landing">
      <div className="container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
              </div>
              <button className="btn home__cta--btn"
              onClick={() => dispatch(openLoginModal())}
              >
                Login</button>
            </div>
            <figure className="landing__image--mask">
                <img src="/assets/landing.png" alt="landing" width={300} height = {300} />
            </figure>
          </div>
        </div>
      </div>
    </section>
    <Features />
    <Reviews/>
    <Numbers />
    <Footer />
    </div>
    </>
  )
}

export default Landing