import React, { useState } from 'react';
import './dashheader.css';
import logo from './Images/new Udemy.png';
import { ToastContainer, toast } from 'react-toastify';

const Dashheader = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const storedId = localStorage.getItem('id');
  const id = JSON.parse(storedId);

  const logout = () => {
    localStorage.removeItem('id'); 
    window.location.href = '/students/login'; 
    toast.success("Log out successful!"); 
  };

  const toggleMenu = () => {
    setIsMenuVisible(prev => !prev);
  };

  return (
    <>
      <div className='headers' id='header'>
        <div className="imageCon">
          <img className='logo' src={logo} alt="Udemy Logo" />
        </div>
        <div className="main">
          <div className='dropdown'>
            <p>Categories</p>
            {isMenuVisible && (
              <div className='dropdownContent'>
                <p>Hello World</p>
                <p>Hello World</p>
                <p>Hello World</p>
                <p>Hello World</p>
              </div>
            )}
          </div>
          <div className='search'>
            <span className="material-symbols-outlined" id='searchLogo'>
              search
            </span>
            <input type="text" placeholder='Search for anything' />
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
            <span className="material-symbols-outlined">shopping_cart</span>
          </div>
          <div className="cart">
            <span className="material-symbols-outlined">favorite</span>
          </div>
          <div className="cart">
            <span className="material-symbols-outlined">notifications</span>
          </div>
          <div onClick={logout} className="cart">
            <span className="material-symbols-outlined">logout</span>
          </div>
        </div>
        <span className='menu material-symbols-outlined' onClick={toggleMenu}>
          menu
        </span>
      </div>
      <ToastContainer />
    </>
  );
}

export default Dashheader;
