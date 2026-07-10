import React from 'react'
import './AppDownloads.css'
import { assets } from '../../assets/assets.js'
const AppDownloads = () => {
  return (
    <div className='app-downloads' id='app-downloads'>
        <p>For best experience, download our <br/> Tomato app</p>
        <div className="app-downloads-platform">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
      
    </div>
  )
}

export default AppDownloads
