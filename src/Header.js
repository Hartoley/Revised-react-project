import React from "react";
import styles from "./students.module.css";
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
      </div>
    </>
  );
};

export default Header;
