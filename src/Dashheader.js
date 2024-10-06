import React, { useState, useEffect } from "react";
import "./dashheader.css";
import logo from "./Images/new Udemy.png";

const Dashheader = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const storedId = localStorage.getItem("id");
  const id = JSON.parse(storedId);
  const [showMenu, setShowMenu] = useState(false);
  const [headerMargin, setHeaderMargin] = useState("0");

  const logout = () => {
    localStorage.removeItem("id");
    window.location.href = "/students/login";
    // Removed the toast notification
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
    setShowMenu((prev) => !prev);
  };

  // Media query logic for screen width <= 760px
  useEffect(() => {
    const updateHeaderMargin = () => {
      if (window.innerWidth <= 760) {
        setHeaderMargin("5vh");
      } else {
        setHeaderMargin("0");
      }
    };

    // Update margin when the component mounts
    updateHeaderMargin();

    // Update margin when the window is resized
    window.addEventListener("resize", updateHeaderMargin);

    return () => {
      window.removeEventListener("resize", updateHeaderMargin);
    };
  }, []);

  return (
    <>
      <div
        className="headers"
        id="header"
        style={{ marginBottom: headerMargin }}
      >
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
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              left: "60vw",
              width: "40vw",
              height: "auto",
              fontSize: "14px",
              lineHeight: "20px",
              padding: "10px 15px",
              border: "solid 0.5px rgb(135, 137, 138)",
              top: "10vh",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
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
              Udemy Business
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
              Search
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
              My learning
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
              Favorite
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
              Shopping cart
            </p>
            <div
              onClick={logout}
              style={{
                marginTop: "15px",
                cursor: "pointer",
                transition: "color 0.3s, transform 0.3s",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#ff4d4d";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "";
                e.target.style.transform = "scale(1)";
              }}
            >
              Logout
              <span
                style={{
                  fontSize: "14px",
                }}
                className="material-symbols-outlined"
              >
                logout
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashheader;
