import React from 'react'
import "../css/HomePage.css"

function HomePage({onButtonClick}) {
  return (
    <>
    <div className="home-h1">
    <img src="../../images/iteration-1-images/logo.svg"/>
    </div>
    <div className='home-h2'> 
    <h2>KOD ACIKTIRIR</h2> 
    <h2>PİZZA, DOYURUR</h2>
    </div>
    <div className='home-button'>
      <button data-cy="home-button" onClick={onButtonClick}> ACIKTIM </button>
    </div>
    </>
  )
}

export default HomePage