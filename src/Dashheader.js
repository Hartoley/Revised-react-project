import React from 'react'
import './dashheader.css'
import logo from './Images/logo.png'

const Dashheader = () => {
  return (
    <>
        <div className='headers'>
            <img className='logo' src={logo} alt="" />
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
            <div className='round'>
              <p>JT</p>
            </div>
            
        </div>
    </>
  )
}

export default Dashheader