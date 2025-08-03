import React from "react";
import styles from "./students.module.css";
import logo from "./Images/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu } from "react-bootstrap";

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

  const Admin = (courses) => {
    navigate("/adminlogin");
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
              <p>Learnova Business</p>
            </div>
            <div className={styles.dropDown}>
              <p>Teach on Learnova </p>
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
          <button onClick={Admin} className={styles.buttonSignup}>
            Admin?
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
              top: "12vh",
              right: "5%",
              width: "200px",
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "10px",
              boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
              zIndex: 1000,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <a
              href="/students/signup"
              style={{
                textDecoration: "none",
                color: "#111",
                padding: "10px",
                borderRadius: "8px",
                fontWeight: "500",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f1f1f1")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Sign up
            </a>
            <a
              href="/students/login"
              style={{
                textDecoration: "none",
                color: "#111",
                padding: "10px",
                borderRadius: "8px",
                fontWeight: "500",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f1f1f1")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Sign in
            </a>
            <a
              href="/adminlogin"
              style={{
                textDecoration: "none",
                color: "#111",
                padding: "10px",
                borderRadius: "8px",
                fontWeight: "500",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f1f1f1")}
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Admin?
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
