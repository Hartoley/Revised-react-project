import React from "react";
import "./students.css";
import logo from "./Images/new Udemy.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const login = (courses) => {
    navigate("/students/login");
  };

  const signup = (courses) => {
    navigate("/students/signup");
  };

  return (
    <>
      <div className="headers" id="header">
        <div className="imageCon">
          <img className="logo" src={logo} alt="" />
        </div>
        <div className="main">
          <div className="dropdown">
            <p>Categories</p>
            <div className="dropdownContent">
              <p>Hello World</p>
              <p>Hello World</p>
              <p>Hello World</p>
              <p>Hello World</p>
            </div>
          </div>
          <div className="search">
            <span class="material-symbols-outlined" id="searchLogo">
              search
            </span>
            <input type="text" placeholder="Search for anything" />
          </div>
          <div className="dropdown">
            <p>Udemy Business</p>
          </div>
          <div className="dropdown">
            <p>Teach on Udemy</p>
          </div>
          <div className="cart">
            <span class="material-symbols-outlined">shopping_cart</span>
          </div>
          <button onClick={login} className="buttonSignup">
            Log in
          </button>
          <button onClick={signup} className="buttonLogin">
            Sign up
          </button>
          <div className="globeBox">
            <span class="material-symbols-outlined">language</span>
          </div>
        </div>

        {/* <span className='menu material-symbols-outlined' onClick={toggleMenu}>
              menu
              </span> */}
      </div>
    </>
  );
};

export default Header;
