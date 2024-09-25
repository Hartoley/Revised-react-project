import React from 'react'
import './students.css'
import logo from './Images/new Udemy.png'
import { useState } from 'react'

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(prev => !prev);
  };


  return (
    <>
        <div className='headers'id="header">
           <div className="imageCon">
              <img className='logo' src={logo} alt="" />
           </div>
           <div className="main">
           <div className='dropdown'>
                <p>Categories</p>
                <div className='dropdownContent'>
                    <p>Hello World</p>
                    <p>Hello World</p>
                    <p>Hello World</p>
                    <p>Hello World</p>
                </div>
            </div>
            <div className='search'>
              <span class="material-symbols-outlined" id='searchLogo'>
                  search
                </span>
                <input type="text"  placeholder='Search for anything' />
                
            </div>
            <div className="dropdown">
              <p>Udemy Business</p>
            </div>
            <div className="dropdown">
              <p>Teach on Udemy</p>
            </div>
            <div className='cart'>
              <span class="material-symbols-outlined">
              shopping_cart
              </span>
            </div>
            <button className='buttonSignup'>
              Log in
            </button>
            <button className='buttonLogin'>
              Sign up
            </button>
            <div className='globeBox'>
              <span class="material-symbols-outlined">
              language
              </span>
            </div>
           </div>
            
           {/* <span className='menu material-symbols-outlined' onClick={toggleMenu}>
              menu
              </span> */}
            
        </div>
    </>
  )
}

export default Header