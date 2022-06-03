import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div>
            <span onClick={() => window.scrollTo(0,0)} className='header'>Fl-ick Movie App</span>
    </div>
  )
}

export default Header
