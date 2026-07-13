import React, { useState, useContext, useRef, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, setCartItems, setShowLogin, searchQuery, setSearchQuery } = useContext(StoreContext);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    const targetSection = location.state?.scrollToSection || (location.state?.scrollToFoodDisplay ? 'food-display' : null);
    if (targetSection) {
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location, navigate]);

  useEffect(() => {
    if (location.pathname !== '/') {
      setMenu("");
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setMenu("home");
    navigate("/");
  }

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val && location.pathname !== '/') {
      navigate('/');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (location.pathname === '/') {
        const foodDisplayElement = document.getElementById('food-display');
        if (foodDisplayElement) {
          foodDisplayElement.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/', { state: { scrollToFoodDisplay: true } });
      }
    }
  }

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery("");
    }
  }

  const handleNavClick = (sectionId, menuName) => {
    setMenu(menuName);
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollToSection: sectionId } });
    }
  };

  const handleHomeClick = (e) => {
    setMenu("home");
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className='navbar'>
      <Link to='/' onClick={() => setMenu("home")}><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className='menu-items'>
        <Link to="/" onClick={handleHomeClick} className={menu === "home" ? "active" : ""}>Home</Link>
        <a href='#explore-menu' onClick={(e) => { e.preventDefault(); handleNavClick("explore-menu", "menu"); }} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href="#app-downloads" onClick={(e) => { e.preventDefault(); handleNavClick("app-downloads", "mobile-app"); }} className={menu === "mobile-app" ? "active" : ""}>mobile - app</a>
        <a href="#footer" onClick={(e) => { e.preventDefault(); handleNavClick("footer", "contact-us"); }} className={menu === "contact-us" ? "active" : ""}>Contact us </a>
      </ul>
      <div className="navbar-right">
        <div className={`navbar-search-container ${isSearchActive ? 'active' : ''}`}>
          <img 
            src={assets.search_icon} 
            alt="Search" 
            onClick={toggleSearch} 
            className="navbar-search-btn-icon"
          />
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search menu..." 
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="navbar-search-input"
          />
          {searchQuery && (
            <button className="navbar-search-clear" onClick={() => setSearchQuery("")}>&times;</button>
          )}
        </div>
        <div className="navbar-basket-container">
          <Link to='/cart' className="navbar-search-icon">
            <img src={assets.basket_icon} alt="" />
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
          </Link>
          {!token ? (
            <button onClick={() => setShowLogin(true)} className='sign-in-btn'>Sign in</button>
          ) : (
            <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
