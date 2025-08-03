import React from "react";
import "./footer.css";
import logo from "./Images/logo.png";
import logo3 from "./Images/logo3.png";

const Footer = () => {
  return (
    <>
      <div className="footerBox">
        <div className="topBox">
          <div className="companiesBox">
            <p>
              Top companies choose <span>Learnova Business</span> to build
              in-demand career skills.
            </p>
          </div>
          <div className="companiesBox1">
            <img
              className="logobox"
              src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg"
              alt=""
            />
            <img
              className="logobox"
              src="https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg"
              alt=""
            />
            <img
              className="logobox"
              src="https://s.udemycdn.com/partner-logos/v4/box-light.svg"
              alt=""
            />
            <img
              className="logobox"
              src="https://s.udemycdn.com/partner-logos/v4/netapp-light.svg"
              alt=""
            />
            <img
              className="logobox"
              src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg"
              alt=""
            />
          </div>
        </div>
        <div className="udemyBox">
          <div className="udemyBoxText">
            <div className="udemyMini">
              <p>Learnova Business</p>
              <p>Teach on Learnova </p>
              <p>Get the app</p>
              <p>About us</p>
              <p>Contact us</p>
            </div>
            <div className="udemyMini">
              <p>Careers</p>
              <p>Blog</p>
              <p>Help and Support</p>
              <p>Affiliate</p>
              <p>Investors</p>
            </div>
            <div className="udemyMini">
              <p>Terms</p>
              <p>Privacy policy</p>
              <p>Cookie settings</p>
              <p>Sitemap</p>
              <p>Accessibility statement</p>
            </div>
          </div>
          <div className="englishBox">
            <button>
              <span class="material-symbols-outlined">language</span>
              English
            </button>
          </div>
        </div>
        <div className="udemyBox1">
          <img id="logo1" src={logo3} alt="" />
          <p>© 2024 Learnova, Inc.</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
