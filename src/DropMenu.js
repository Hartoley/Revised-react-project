import React from "react";

const DropdownMenu = () => {
  const isMobile = window.innerWidth <= 600;

  const menuStyle = {
    position: "absolute",
    top: "10vh",
    left: isMobile ? "25vw" : "10%",
    width: isMobile ? "50vw" : "20vw",
    backgroundColor: "#fff",
    fontSize: isMobile ? "13px" : "14px",
    lineHeight: "20px",
    padding: isMobile ? "12px" : "15px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    zIndex: 999,
  };

  const linkStyle = {
    display: "block",
    padding: "12px 10px",
    marginBottom: "8px",
    color: "#333",
    borderRadius: "8px",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all 0.3s ease",
  };

  const hoverEffect = (e, enter) => {
    e.target.style.backgroundColor = enter ? "#f0f0f0" : "transparent";
    e.target.style.transform = enter ? "translateX(5px)" : "translateX(0)";
  };

  return (
    <div style={menuStyle}>
      <a
        href="/students/signup"
        style={linkStyle}
        onMouseEnter={(e) => hoverEffect(e, true)}
        onMouseLeave={(e) => hoverEffect(e, false)}
      >
        Sign up
      </a>
      <a
        href="/students/login"
        style={linkStyle}
        onMouseEnter={(e) => hoverEffect(e, true)}
        onMouseLeave={(e) => hoverEffect(e, false)}
      >
        Sign in
      </a>
      <a
        href="/adminlogin"
        style={linkStyle}
        onMouseEnter={(e) => hoverEffect(e, true)}
        onMouseLeave={(e) => hoverEffect(e, false)}
      >
        Admin?
      </a>
    </div>
  );
};

export default DropdownMenu;
