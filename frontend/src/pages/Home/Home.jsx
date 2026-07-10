import React , { useState }  from 'react'

import './Home.css'
import Header from '../../componants/Header/Header.jsx'
import ExploreMenu from '../../componants/ExploreMenu/ExploreMenu.jsx'
import FoodDisplay from '../../componants/FoodDisplay/FoodDisplay.jsx'
import AppDownloads from '../../componants/AppDownloads/AppDownloads.jsx'

const Home = () => {

  const [category , setCategory] = useState('All');
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <AppDownloads/>
    </div>
  )
}

export default Home
