import React, { useContext } from 'react'
import Navbar from './componants/Navbar/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'
import Settings from './pages/Settings/Settings.jsx'
import Footer from './componants/Footer/Footer.jsx'
import LoginPopup from './componants/LoginPopup/LoginPopup.jsx'
import { StoreContext } from './context/StoreContext.jsx'

const App = () => {
  const { showLogin } = useContext(StoreContext);
  return (
    <>
      {showLogin ? <LoginPopup /> : <> </>}

      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
      <Footer />
    </>

  )
}

export default App
