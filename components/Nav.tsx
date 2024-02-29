
import React from 'react'
import { useDispatch } from 'react-redux'
import { openLoginModal } from '../redux/modalSlice'

function Nav() {

  const dispatch = useDispatch()

  function openModal() {
    dispatch(openLoginModal())
  }
  return (
    <div>
        <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <img className="nav__img" src="/assets/logo.png" width={300} height = {300} alt="logo" />
        </figure>
        <ul className="nav__list--wrapper">
          <li className="nav__list nav__list--login"
          onClick={openModal}
          >Login</li>
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
    </div>
  )
}

export default Nav