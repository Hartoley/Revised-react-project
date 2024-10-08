import React, { useState } from "react";
// import "./dashheader.css";
import logo from "./Images/new Udemy.png";
import { useNavigate } from "react-router-dom";

const Adminheader = ({
  scrollToCourses,
  scrollToUploadCourses,
  scrollToStudents,
}) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const storedId = localStorage.getItem("id");
  const storedadminId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const id = JSON.parse(storedId);
  const adminId = JSON.parse(storedadminId);
  const [showMenu, setshowMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("adminId");
    window.location.href = "/adminlogin";
    // Removed the toast notification
  };

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
    setshowMenu((prev) => !prev);
  };

  //   console.log(adminId);

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
              fontSize: "14px",
              // backgroundColor: "red",
            }}
          >
            <p
              onClick={scrollToStudents}
              style={{
                cursor: "pointer",
              }}
            >
              Students
            </p>
            <p
              onClick={scrollToUploadCourses}
              style={{
                cursor: "pointer",
              }}
            >
              Upload course
            </p>
            <p
              onClick={scrollToCourses}
              style={{
                cursor: "pointer",
              }}
            >
              Manage Courses
            </p>
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
              fontSize: "14px", // Increased font size
              lineHeight: "20px", // Increased line height
              padding: "10px 15px", // Increased padding
              border: "solid 0.5px rgb(135, 137, 138)", // Thicker border for visibility
              top: "10vh",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Added shadow for depth
              transition: "all 0.3s ease", // Smooth transition for hover effects
            }}
          >
            <p
              onClick={scrollToUploadCourses}
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
              Upload a course
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
              onClick={scrollToStudents}
            >
              Students
            </p>
            <p
              onClick={scrollToCourses}
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
              Manage Courses
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
                marginTop: "15px", // Space above logout
                cursor: "pointer",
                transition: "color 0.3s, transform 0.3s",
                fontSize: "10px",
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
                  fontSize: "10px",
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

export default Adminheader;
