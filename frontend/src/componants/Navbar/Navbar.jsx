import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");

  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className='logo' />
      <ul className='menu-items'>
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href ='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-downloads" onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile - app</a>
        <a href="#footer" onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>Contact us </a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div>
          <img src={assets.cart_icon} alt="" />
          <div className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            <div className="dot"></div>
          </div>
          <button onClick={() => setShowLogin(true)} className='sign-in-btn'>Sign in</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
