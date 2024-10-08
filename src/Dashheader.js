import React, { useEffect, useState } from "react";
// import "./dashheader.css";
import logo from "./Images/new Udemy.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashheader = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const storedId = localStorage.getItem("id");
  const storedadminId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const id = JSON.parse(storedId);
  const adminId = JSON.parse(storedadminId);
  const [showMenu, setshowMenu] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/getdata/id/${id}`
      )
      .then((res) => {
        setUserData(res.data);
        console.log(res.data.username);
      })
      .catch((error) => {
        console.log("Error:", error);
        // toast.error("Failed to fetch user data");
      });
  });
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
              gap: "0.5rem",
              left: "0%",
              fontSize: "12px",
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
          <p
            style={{
              width: "2.5rem",
              height: "2.5rem",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "black",
              borderRadius: "50%",
              marginTop: "5px",
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            {userData.username && userData.username.charAt(0).toUpperCase()}
          </p>

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
              fontSize: "12px", // Increased font size
              lineHeight: "20px", // Increased line height
              padding: "10px 15px", // Increased padding
              border: "solid 0.5px rgb(135, 137, 138)", // Thicker border for visibility
              top: "10vh",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow for depth
              transition: "all 0.3s ease", // Smooth transition for hover effects
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
            <p
              style={{
                margin: "10px 0",
                cursor: "pointer",
                transition: "color 0.3s, transform 0.3s",
                display: "flex",
                gap: "5px",
                alignItems: "center",
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
              {userData.username}
              <span
                class="material-symbols-outlined"
                style={{
                  fontSize: "10px",
                }}
              >
                account_circle
              </span>
            </p>
            <div
              onClick={logout}
              style={{
                marginTop: "15px", // Space above logout
                cursor: "pointer",
                transition: "color 0.3s, transform 0.3s",
                fontSize: "12px",
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#ff4d4d"; // Hover color for logout
                e.target.style.transform = "scale(1.1)"; // Slight zoom on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.color = ""; // Reset hover color
                e.target.style.transform = "scale(1)"; // Reset zoom
              }}
            >
              Log out
              <span
                style={{
                  fontSize: "12px",
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
