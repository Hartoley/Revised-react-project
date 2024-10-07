import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import Adminlogins, { saving, successful, failed } from "./Redux/Adminlogins";
import { useSelector, useDispatch } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";

const Adminlogin = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const endpoint = "https://react-node-project-3.onrender.com";
  const [loggedin, setloggedin] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5009/admin/getdata`)
      // axios.get(`${endpoint}/admin/getdata`)
      .then((res) => {
        // console.log("Admin data from API:", res.data);
        setloggedin(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      const loggedinadmin = loggedin.find(
        (exist) => exist.email == value.email
      );

      if (loggedinadmin) {
        axios
          .post(`http://localhost:5009/admin/login`, value)
          .then((res) => {
            let id = `${loggedinadmin._id}`;

            toast.success("Admin successfully logged in");
            navigate(`/admindashboard/${id}`);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to log in. Please try again.");
          });
      } else {
        console.log("usernot found");
        toast.error("user doesn't exist");
      }
    },
  });
  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#f8f9fa", // Light background for contrast
          height: "100vh",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="shadow-lg p-4 rounded w-50"
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "#343a40" }}>
            Admin Login
          </h3>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="form-control"
              type="email"
              name="email"
              placeholder="Enter your email"
              style={{ borderRadius: "5px" }}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-danger">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="form-control"
              type="password"
              name="password"
              placeholder="Enter your password"
              style={{ borderRadius: "5px" }}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-danger">{formik.errors.password}</p>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-dark"
              style={{
                borderRadius: "20px",
                padding: "10px",
              }}
            >
              Log in
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a
                href="/admin/signup"
                style={{
                  color: "#007bff",
                  textDecoration: "underline",
                }}
              >
                Register here
              </a>
            </p>
          </div>

          {/* Toast Container */}
          <ToastContainer />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Adminlogin;
