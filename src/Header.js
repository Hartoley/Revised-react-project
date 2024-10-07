import React from "react";
import styles from "./students.module.css";
import logo from "./Images/new Udemy.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
    setshowMenu((prev) => !prev);
  };

  const login = (courses) => {
    navigate("/students/login");
  };

  const signup = (courses) => {
    navigate("/students/signup");
  };

  return (
    <>
      <div className={styles.headers} id="header">
        <div className={styles.imageCon}>
          <img className={styles.logo} src={logo} alt="" />
        </div>
        <div className={styles.main}>
          {/* <div className={styles.dropDown}>
            <p>Categories</p>
            <div className={styles.dropDownContent}>
              <p>Hello World</p>
              <p>Hello World</p>
              <p>Hello World</p>
              <p>Hello World</p>
            </div>
          </div> */}
          <div className={styles.search}>
            <span className="material-symbols-outlined" id="searchLogo">
              search
            </span>
            <input type="text" placeholder="Search for anything" />
          </div>
          <div className={styles.carier}>
            <div className={styles.dropDown}>
              <p>Udemy Business</p>
            </div>
            <div className={styles.dropDown}>
              <p>Teach on Udemy</p>
            </div>
            <div className={styles.cart}>
              <span className="material-symbols-outlined">shopping_cart</span>
            </div>
          </div>
          <button onClick={login} className={styles.buttonSignup}>
            Log in
          </button>
          <button onClick={signup} className={styles.buttonLogin}>
            Sign up
          </button>
          <div className={styles.globeBox}>
            <span className="material-symbols-outlined">language</span>
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
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              left: "10%",
              width: "20vw",
              height: "auto",
              fontSize: "14px",
              lineHeight: "20px",
              padding: "10px 15px",
              border: "solid 0.5px rgb(135, 137, 138)",
              top: "10vh",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              zIndex: "999", // Ensures it's above other elements
              ...(window.innerWidth <= 600 && {
                left: "50vw", // Shifted more center on smaller screens
                width: "50vw", // Take up more space on smaller screens
                fontSize: "12px", // Reduce font size for better fit
                padding: "8px 12px",
              }),
            }}
          >
            <p
              style={{
                margin: "10px 0", // Spacing between menu items
                cursor: "pointer",
                transition: "color 0.3s, transform 0.3s", // Smooth transition for hover effects
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#007BFF"; // Hover color
                e.target.style.transform = "scale(1.05)"; // Slight zoom
              }}
              onMouseLeave={(e) => {
                e.target.style.color = ""; // Reset hover color
                e.target.style.transform = "scale(1)"; // Reset zoom
              }}
            >
              <a href="/students/signup">Sign up</a>
            </p>
            <p
              style={{
                margin: "10px 0",
                cursor: "pointer",
                transition: "color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#007BFF";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "";
                e.target.style.transform = "scale(1)";
              }}
            >
              <a href="/students/login">Sign in</a>
            </p>
            <p
              style={{
                margin: "10px 0",
                cursor: "pointer",
                transition: "color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#007BFF";
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "";
                e.target.style.transform = "scale(1)";
              }}
            >
              <a href="/adminlogin">Admin?</a>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
