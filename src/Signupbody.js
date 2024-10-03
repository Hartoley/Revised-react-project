import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./signupbody.css";

const Signupbody = () => {
  const dispatch = useDispatch();
  const endpoint = "https://react-node-project-3.onrender.com";
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const loadingToastRef = useRef(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${endpoint}/udemy/student/getdata`)
      .then((res) => {
        console.log("students data from API:", res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    if (loading) {
      if (!loadingToastRef.current) {
        toast.loading("Processing data...");
        loadingToastRef.current = true;
      }
    } else {
      loadingToastRef.current = false;
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(4, "Username is too short")
        .required("Username is required"),
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(5, "Password is too short")
        .matches(
          `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])`,
          "Password must have at least one capital letter, an integer, and a special character"
        )
        .required("Password is required"),
    }),
    onSubmit: (value) => {
      console.log(value);
      setLoading(true);
      toast.loading("Saving data...");
      const existingStudent = students.find(
        (exist) =>
          exist.email === value.email || exist.password === value.password
      );
      if (existingStudent) {
        setLoading(false);
        toast.dismiss();
        toast.error("User already exists");
      } else {
        axios
          .post(`${endpoint}/udemy/student/register`, value)
          .then((res) => {
            console.log("Students signed up successfully");
            toast.success("Students signed up successfully");
            navigate("/students/login");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
            toast.dismiss();
            toast.error("Signup failed");
          });
      }
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <form className="body" action="" id="body" onSubmit={formik.handleSubmit}>
        <div className="inputBox" id="bodydiv">
          <p>Sign up and start learning</p>
          <div id="inputMainBox">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="username"
              type="text"
              placeholder="Full name"
            />
            <p>
              {formik.touched.username && formik.errors.username
                ? formik.errors.username
                : ""}
            </p>
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
            {/* <p>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </p> */}
          </div>
          <div className="lineBox">
            <div className="lines"></div>
            <div className="lines"></div>
            <div className="lines"></div>
            <div className="lines"></div>
          </div>

          <button type="submit" className="buttonSignin">
            Sign up
          </button>
          <ToastContainer />
          <div className="termsBox" id="termsBox">
            <p>
              By signing up, you agree to our <span>Terms of Use</span> and{" "}
              <span>Privacy Policy.</span>
            </p>
          </div>

          <div id="loginBox" className="loginBox">
            <p>
              Already have an account?{" "}
              <span>
                <a href="/students/login">Log in</a>
              </span>
            </p>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signupbody;
