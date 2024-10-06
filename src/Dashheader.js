import React, { useState } from "react";
// import "./dashheader.css";
import logo from "./Images/new Udemy.png";

const Dashheader = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const storedId = localStorage.getItem("id");
  const id = JSON.parse(storedId);
  const [showMenu, setshowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("id");
    window.location.href = "/students/login";
    // Removed the toast notification
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
    setshowMenu((prev) => !prev);
  };

  return (
    <>
      <div className="headers" id="header">
        <div className="imageCon">
          <img className="logo" src={logo} alt="Udemy Logo" />
        </div>
        <div className="main">
          <div className="search">
            <span className="material-symbols-outlined" id="searchLogo">
              search
            </span>
            <input type="text" placeholder="Search for anything" />
          </div>
          <div
            className="carried"
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              width: "28%",
              gap: "1rem",
              left: "0%",
              fontSize: "14px",
              // backgroundColor: "red",
            }}
          >
            <p>Udemy Business</p>
            <p>Teach on Udemy</p>
            <p>My learning</p>
          </div>

          <div className="cart">
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
        <span
          id="menu"
          className="menu material-symbols-outlined"
          onClick={toggleMenu}
        >
          menu
        </span>
        {showMenu && (
          <div className="menuitem">
            <p>Udemy Business</p>
            <p>Search</p>
            <p>My learning</p>
            <p>Favorite</p>
            <p>Shopping cart</p>
            <div onClick={logout} className="cart1">
              Logout
              <span className="material-symbols-outlined">logout</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashheader;
