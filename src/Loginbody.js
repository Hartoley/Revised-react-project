import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import Studentlogin, { saving, successful, failed } from "./Studentlogin";
import { useSelector, useDispatch } from "react-redux";
import "./Loginbody.css";
import google from "./Images/google1.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import facebook from "./Images/facebook.png";
import apple from "./Images/apple.png";

const Loginbody = () => {
  const [showPassword, setShowPassword] = useState(false);

  const disptach = useDispatch();
  const navigate = useNavigate();
  const endpoint = "https://react-node-project-1.onrender.com";
  const [loggedin1, setloggedin1] = useState([]);

  useEffect(() => {
    // axios
    //   .get(https://react-node-project-1.onrender.com/udemy/student/getdata)
    axios
      .get(`${endpoint}/udemy/student/getdata`)
      .then((res) => {
        console.log("students data from API:", res.data);
        setloggedin1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log(loggedin1);

  // console.log(loggedin1);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      const trimmedEmail = value.email.trim();
      const trimmedPassword = value.password.trim();

      const loggedinstudents = loggedin1.find(
        (exist) => exist.email == value.email
      );
      // console.log(loggedinstudents);
      if (loggedinstudents) {
        axios
          .post(
            `https://react-node-project-1.onrender.com/udemy/student/login`,
            { email: trimmedEmail, password: trimmedPassword }
          )
          .then((res) => {
            // Handle success
          })
          .catch((err) => {
            // Handle error
          });
      } else {
        console.log("User not found");
        toast.error("User not found");
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {" "}
      <form action="" id="body" className="body" onSubmit={formik.handleSubmit}>
        <div id="inputBox" className="inputBox">
          <p>Log in to your Udemy account</p>
          <div className="others">
            <img id="google" src={google} alt="" />
            <span>Continue with Google</span>
          </div>
          <div className="others">
            <img src={facebook} id="google" alt="" />
            <span>Continue with Facebook</span>
          </div>
          <div className="others">
            <img src={apple} id="google" alt="" />

            <span> Continue with Apple</span>
          </div>

          <div
            className="carrier"
            style={{
              height: "auto",
            }}
          >
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="email"
              type="text"
              placeholder="Email"
            />
            <p>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </p>

            <div className="password-container">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                id="input"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="password-toggle"
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
            </div>
            <p>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </p>
          </div>

          <div className="lineBox">
            <div className="lines"></div>
            <div className="lines"></div>
            <div className="lines"></div>
            <div className="lines"></div>
          </div>
          <div className="carrier">
            <button type="submit" className="buttonSignin">
              Sign in
            </button>
          </div>
          <ToastContainer />
          <div className="carrier1">
            <div className="termsBox">
              <p>
                Or <span>Forgot Password</span>
              </p>
            </div>

            <div className="loginBox" id="loginBox">
              <p>
                Don't have an account?{" "}
                <span>
                  <a href="/students/signup">Sign up with our organization</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Loginbody;
