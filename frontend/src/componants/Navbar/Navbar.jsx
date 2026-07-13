import React, { useState, useContext, useRef, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets.js'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, setCartItems, setShowLogin, searchQuery, setSearchQuery, userProfile } = useContext(StoreContext);
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
      return;
    }

    // Set default menu to 'home' when landing on home page
    setMenu("home");

    const sectionIds = [
      { id: 'header', menuName: 'home' },
      { id: 'explore-menu', menuName: 'menu' },
      { id: 'food-display', menuName: 'menu' },
      { id: 'app-downloads', menuName: 'mobile-app' },
      { id: 'footer', menuName: 'contact-us' }
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px', // Focuses on the middle portion of the viewport
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetId = entry.target.id;
          const matchingSection = sectionIds.find(s => s.id === targetId);
          if (matchingSection) {
            setMenu(matchingSection.menuName);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Give a short delay to make sure DOM elements are rendered
    const timer = setTimeout(() => {
      sectionIds.forEach(section => {
        const el = document.getElementById(section.id);
        if (el) {
          observer.observe(el);
        }
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
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
              <img src={userProfile.avatar || assets.profile_icon} alt="" />
              <ul className="navbar-profile-dropdown">
                <li onClick={() => navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={() => navigate('/settings')}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="tomato" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '2px'}}>
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <p>Settings</p>
                </li>
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
