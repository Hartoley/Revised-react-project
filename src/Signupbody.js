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
        @media (max-width: 768px) {
          .wrapper {
            flex-direction: column;
          }
          .imageContainer {
            width: 100% !important;
            padding: 20px;
            order: 1;
          }
          .formContainer {
            width: 100% !important;
            padding: 20px;
            order: 2;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .formBox {
            width: 100%;
            max-width: 100% !important;
          }
        }
      `}</style>

      <div style={styles.wrapper} className="wrapper">
        <div style={styles.imageContainer} className="imageContainer">
          <img
            src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x2.webp"
            alt="Login Visual"
            style={styles.image}
          />
        </div>

        <div style={styles.formContainer} className="formContainer">
          <form
            onSubmit={formik.handleSubmit}
            style={styles.formBox}
            className="formBox"
          >
            <h2 style={styles.heading}>Log in to your Udemy account</h2>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input
                style={styles.input}
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <p style={styles.error}>
                {formik.touched.email && formik.errors.email}
              </p>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.passwordWrapper}>
                <input
                  style={styles.input}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.toggleIcon}
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              <p style={styles.error}>
                {formik.touched.password && formik.errors.password}
              </p>
            </div>

            <button type="submit" style={styles.button}>
              Log In
            </button>

            <p style={styles.redirectText}>
              Don’t have an account?{" "}
              <a href="/students/signup" style={styles.link}>
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

const styles = {
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    minHeight: "120vh",
    backgroundColor: "#f9f9f9",
  },
  imageContainer: {
    width: "50%",
    minHeight: "60vh",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    objectFit: "contain",
  },
  formContainer: {
    width: "50%",
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: "40px",
  },
  formBox: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "25px",
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
    boxSizing: "border-box",
  },
  passwordWrapper: {
    position: "relative",
  },
  toggleIcon: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#a435f0",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  redirectText: {
    fontSize: "14px",
    textAlign: "center",
    marginTop: "20px",
  },
  link: {
    color: "#a435f0",
    textDecoration: "none",
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
  },
};

export default Loginbody;
