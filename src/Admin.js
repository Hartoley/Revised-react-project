import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { successful } from './Redux/Adminlogins';

const Admin = () => {
  const dispatch = useDispatch();
  const endpoint = "https://react-node-project-3.onrender.com";
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    axios.get(`${endpoint}/admin/getdata`)
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
      username: yup.string().min(4, 'Username is too short').required('Username is required'),
      email: yup.string().email('Must be a valid email').required('Email is required'),
      password: yup.string()
        .min(5, 'Password is too short')
        .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/, "Password must include one capital letter, one number, and one special character")
        .required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);

      const existingAdmin = admins.find(admin => 
        admin.email === values.email || 
        admin.password === values.password
      );

      if (existingAdmin) {
        toast.error("User already exists");
      } else {
        axios.post(`${endpoint}/admin/register`, values)
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
    <div>
      <form onSubmit={formik.handleSubmit} className='w-50 mx-auto ps-4 shadow'>
        <div className='form-group'>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            className='form-control'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <p>{formik.touched.username && formik.errors.username ? formik.errors.username : ''}</p>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            className='form-control'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <p>{formik.touched.email && formik.errors.email ? formik.errors.email : ''}</p>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className='form-control'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <p>{formik.touched.password && formik.errors.password ? formik.errors.password : ''}</p>
        </div>
        <div>
          <button type='submit' className='btn btn-dark'>Register</button>
          <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default Admin;
