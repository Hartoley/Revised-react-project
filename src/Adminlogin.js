import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import "./admin2.css";

const Adminlogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const endpoint = "https://react-node-project-3.onrender.com";
  const [loggedin, setloggedin] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  useEffect(() => {
    axios
      .get(`${endpoint}/admin/getdata`)
      .then((res) => {
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
      if (!loggedin) {
        toast.error("Still loading admin data. Please wait...");
        return;
      }

      const loggedinadmin = loggedin.find(
        (exist) => exist.email === value.email
      );

      if (loggedinadmin) {
        setIsLoggingIn(true); // Start spinner

        axios
          .post(`https://react-node-project-1.onrender.com/admin/login`, value)
          .then((res) => {
            let id = `${loggedinadmin._id}`;
            localStorage.setItem("adminId", JSON.stringify(id));
            toast.success("Admin successfully logged in");
            navigate(`/admindashboard/${id}`);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Failed to log in. Please try again.");
          })
          .finally(() => setIsLoggingIn(false)); // Stop spinner
      } else {
        toast.error("User doesn't exist");
      }
    },
  });

  return (
    <>
      <Header />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#f8f9fa",
          height: "100vh",
          marginTop: "10vh",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="shadow-lg p-5 rounded"
          style={{
            backgroundColor: "#ffffff",
            maxWidth: "450px", // Adjust form width for medium screens
            width: "100%", // Ensure the form is responsive
            // Margin for large screens
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
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              type="email"
              name="email"
              placeholder="Enter your email"
              style={{ borderRadius: "5px" }}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="invalid-feedback">{formik.errors.email}</div>
            ) : null}
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group">
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                className={`form-control ${
                  formik.touched.password && formik.errors.password
                    ? "is-invalid"
                    : ""
                }`}
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password"
                placeholder="Enter your password"
                style={{ borderRadius: "5px" }}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
                style={{ borderRadius: "0 5px 5px 0" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="invalid-feedback">{formik.errors.password}</div>
            ) : null}
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-dark"
              disabled={isLoggingIn}
              style={{
                borderRadius: "25px",
                padding: "10px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isLoggingIn ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Logging in...
                </>
              ) : (
                "Log in"
              )}
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a href="/admin/signup" className="text-decoration-underline">
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
