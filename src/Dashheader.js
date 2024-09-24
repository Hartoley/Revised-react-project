import {React, useState} from 'react'
import './dashheader.css'
import logo from './Images/new Udemy.png'

const Dashheader = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(prev => !prev);
  };


  return (
    <>
        <div className='headers'>
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
            <div className="dropdown">
              <p>My learning</p>
            </div>
            <div className='cart'>
              <span class="material-symbols-outlined">
              shopping_cart
              </span>
            </div>
            <div className="cart">
            <span class="material-symbols-outlined">
                favorite
                </span>
            </div>
            <div className="cart">
            <span class="material-symbols-outlined">
                notifications
                </span>
            </div>

          </div> 
          <span className='menu material-symbols-outlined' onClick={toggleMenu}>
              menu
              </span> 
        </div>
    </>
  )
}

export default Dashheader