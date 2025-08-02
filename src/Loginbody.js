import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";

const Loginbody = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loggedin1, setloggedin1] = useState([]);
  const navigate = useNavigate();
  const endpoint = "https://react-node-project-1.onrender.com";

  useEffect(() => {
    axios
      .get(`${endpoint}/udemy/student/getdata`)
      .then((res) => setloggedin1(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (value) => {
      const user = loggedin1.find((u) => u.email === value.email);
      if (user) {
        axios
          .post(`${endpoint}/udemy/student/login`, value)
          .then(() => {
            toast.success("Login successful");
            navigate(`/students/dashboard/${user._id}`);
          })
          .catch((err) => toast.error(err.response.data.message));
      } else {
        toast.error("User not found");
      }
    },
  });

  return (
    <>
      <style>{`
   .wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 120vh;
  background-color: #f9f9f9;
  margin-top: 13vh;
}

        .imageContainer {
          width: 50%;
          min-height: 60vh;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        .image {
          width: 100%;
          max-width: 500px;
          object-fit: contain;
        }
        .formContainer {
          width: 50%;
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
          padding: 40px;
        }
        .formBox {
          width: 100%;
          max-width: 400px;
          background-color: #ffffff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .heading {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 25px;
          text-align: center;
        }
        .inputGroup {
          margin-bottom: 20px;
        }
        .label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        .input {
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 6px;
          outline: none;
          box-sizing: border-box;
        }
        .passwordWrapper {
          position: relative;
        }
        .toggleIcon {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          cursor: pointer;
        }
        .button {
          width: 100%;
          padding: 12px;
          background-color: #a435f0;
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }
        .redirectText {
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
        }
        .link {
          color: #a435f0;
          text-decoration: none;
          font-weight: 600;
        }
        .error {
          color: red;
          font-size: 12px;
          margin-top: 4px;
        }

        @media (max-width: 768px) {
          .wrapper {
            flex-direction: column;
          }
          .imageContainer,
          .formContainer {
            width: 100% !important;
            padding: 20px;
          }
          .formBox {
            padding: 20px;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div className="wrapper">
        <div className="imageContainer">
          <img
            src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x2.webp"
            alt="Login Visual"
            className="image"
          />
        </div>

        <div className="formContainer">
          <form onSubmit={formik.handleSubmit} className="formBox">
            <h2 className="heading">Log in to your Udemy account</h2>

            <div className="inputGroup">
              <label className="label">Email</label>
              <input
                className="input"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <p className="error">
                {formik.touched.email && formik.errors.email}
              </p>
            </div>

            <div className="inputGroup">
              <label className="label">Password</label>
              <div className="passwordWrapper">
                <input
                  className="input"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="toggleIcon"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <p className="error">
                {formik.touched.password && formik.errors.password}
              </p>
            </div>

            <button type="submit" className="button">
              Log In
            </button>

            <p className="redirectText">
              Don’t have an account?{" "}
              <a href="/students/signup" className="link">
                Sign up
              </a>
            </p>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Loginbody;
