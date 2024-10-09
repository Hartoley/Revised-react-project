import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { successful } from "./Redux/Adminlogins";
import Header from "./Header";
import Footer from "./Footer";
import "./admin2.css";

const AdminSignup = () => {
  const dispatch = useDispatch();
  const endpoint = "https://react-node-project-3.onrender.com";
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios
      .get(`${endpoint}/admin/getdata`)
      .then((res) => {
        console.log("Admin data from API:", res.data);
        setAdmins(res.data);
        dispatch(successful(res.data));
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch admin data");
      });
  }, [dispatch]);

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
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/,
          "Password must include one capital letter, one number, and one special character"
        )
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);

      const existingAdmin = admins.find(
        (admin) =>
          admin.email === values.email || admin.password === values.password
      );

      if (existingAdmin) {
        toast.error("User already exists");
      } else {
        axios
          .post(`${endpoint}/admin/register`, values)
          .then(() => {
            console.log("Admin signed up successfully");
            toast.success("Admin signed up successfully");
            navigate("/adminlogin");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Signup failed");
          });
      }
    },
  });

  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: "red", // Light background for contrast
          height: "10vh",
        }}
      ></div>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#f8f9fa",
          height: "100vh",
          width: "100%",
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          className="shadow-lg p-4 rounded w-50"
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            // maxWidth: "400px",
            width: "100%",
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "#343a40" }}>
            Admin Signup
          </h3>

          {/* Username Input */}
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder="Enter your username"
              style={{ borderRadius: "5px" }}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-danger">{formik.errors.username}</p>
            ) : null}
          </div>

          {/* Email Input */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
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
              id="password"
              name="password"
              type="password"
              className="form-control"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
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
              className="btn btn-dark w-50"
              style={{
                borderRadius: "20px",
                padding: "10px",
                margin: "auto",
              }}
            >
              Register
            </button>
          </div>

          {/* Redirect to Admin Login */}
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <a
                href="/adminlogin"
                style={{
                  color: "#007bff",
                  textDecoration: "underline",
                }}
              >
                Log in here
              </a>
            </p>
          </div>

          <ToastContainer />
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AdminSignup;
