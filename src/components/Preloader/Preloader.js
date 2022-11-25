import React from 'react'
import './Preloader.css'

function Preloader({isPreloaderActive}) {
  return (
    <div className={`preloader ${!isPreloaderActive && 'preloader_invisible'}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
