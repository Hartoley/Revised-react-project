import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Signupbody = () => {
  const endpoint = "https://react-node-project-3.onrender.com";
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get(`${endpoint}/udemy/student/getdata`)
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().min(4).required("Username required"),
      email: yup.string().email("Invalid email").required("Email required"),
      password: yup
        .string()
        .min(5)
        .matches(
          `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])`,
          "Password must include upper, number & special char"
        )
        .required("Password required"),
    }),
    onSubmit: (value) => {
      toast.loading("Processing...");
      const exists = students.find(
        (s) => s.email === value.email || s.username === value.username
      );
      if (exists) {
        toast.dismiss();
        toast.error("User already exists");
      } else {
        axios
          .post(`${endpoint}/udemy/student/register`, value)
          .then(() => {
            toast.dismiss();
            toast.success("Signed up successfully");
            navigate("/students/login");
          })
          .catch((err) => {
            toast.dismiss();
            toast.error(err?.response?.data?.message || "Error");
          });
      }
    },
  });

  return (
    <div style={styles.wrapper}>
      {/* Image Section */}
      <div style={styles.imageContainer}>
        <img
          src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x2.webp"
          alt="Signup"
          style={styles.image}
        />
      </div>

      {/* Form Section */}
      <form style={styles.form} onSubmit={formik.handleSubmit}>
        <h2 style={styles.title}>Sign up with email</h2>

        <input
          type="text"
          name="username"
          placeholder="Full Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          style={styles.input}
        />
        {formik.touched.username && formik.errors.username && (
          <p style={styles.error}>{formik.errors.username}</p>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          style={styles.input}
        />
        {formik.touched.email && formik.errors.email && (
          <p style={styles.error}>{formik.errors.email}</p>
        )}

        <div style={{ position: "relative", width: "100%" }}>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            style={{ ...styles.input, paddingRight: "40px" }}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            style={styles.eyeIcon}
          >
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p style={styles.error}>{formik.errors.password}</p>
        )}

        <label style={styles.checkboxWrapper}>
          <input type="checkbox" defaultChecked />
          <span style={styles.checkboxLabel}>
            Send me offers, recommendations, and tips.
          </span>
        </label>

        <button type="submit" style={styles.button}>
          Continue with email
        </button>

        <p style={styles.terms}>
          By signing up, you agree to our <u>Terms of Use</u> and{" "}
          <u>Privacy Policy</u>.
        </p>
        <p style={styles.loginLink}>
          Already have an account?{" "}
          <a
            href="/students/login"
            style={{ color: "#5624d0", fontWeight: "bold" }}
          >
            Log in
          </a>
        </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signupbody;

const styles = {
  wrapper: {
    marginTop: "13vh",
    display: "flex",
    flexDirection: "row",
    minHeight: "120vh",
    padding: "2rem",
    gap: "2rem",
    background: "#fff",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  imageContainer: {
    flex: "1 1 300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    objectFit: "contain",
  },
  form: {
    flex: "1 1 300px",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
  },
  button: {
    backgroundColor: "#5624d0",
    color: "#fff",
    border: "none",
    padding: "14px",
    fontWeight: "bold",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "1rem",
  },
  error: {
    color: "red",
    fontSize: "13px",
    marginTop: "-0.5rem",
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    fontSize: "14px",
  },
  checkboxLabel: {
    lineHeight: "1.2",
  },
  eyeIcon: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "20px",
    color: "#555",
  },
  terms: {
    fontSize: "12px",
    color: "#555",
    textAlign: "center",
    marginTop: "1rem",
  },
  loginLink: {
    fontSize: "14px",
    textAlign: "center",
  },
};
