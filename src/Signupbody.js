import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import Studentlogin, {saving, successful, failed} from './Redux/Studentsredux' 
import { useSelector, useDispatch } from 'react-redux'
import './signupbody.css'

const Signupbody = () => {
    const disptach = useDispatch() 
    const endpoint = "https://react-node-project-3.onrender.com"
    const navigate = useNavigate()
    const [students, setstudents] = useState([])


    useEffect(() => {
      axios.get(`https://react-node-project-1.onrender.com/udemy/student/getdata`)
        .then((res) => {
          console.log("students data from API:", res.data);
          setstudents(res.data); 
          // console.log(res.data[0].username);
          disptach(successful(res.data))
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);
    
  
  
    const formik = useFormik({
      initialValues:{
        username:"",
        email:"",
        password:"",
    },
      validationSchema: yup.object({
        username: yup.string().min(4, 'username is too short').required('username is required'),
        email: yup.string().email('must be a valid email').required('email is required'),
        password: yup.string().min(5, 'password is too short').matches(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])` , "password must have at least one capital letter, an integer and a special character").required('password is required')
      }),
  
      onSubmit:(value)=>{
        console.log(value);
        
        const existingstudents = students.find(exist=> exist.email == value.email || exist.password == value.password || exist.email == value.email)
       
        if (existingstudents) {
          toast.error("user already exist")
        }else{
          axios.post(`https://react-node-project-1.onrender.com/udemy/student/register`, value)
          .then((res)=>{
              console.log("students signed up successful");
              toast.success("students signed up successful")
              navigate("/students/login")
          }).catch((error)=>{
            console.log(error);
            toast.error("Signup failed")
          })
        }
  
      }
    })



  return (
    <>
        <form className="body" action="" id='body' onSubmit={formik.handleSubmit} >
       
            <div className="inputBox" id='bodydiv'>
                <p>Sign up and start learning</p>
                <div id="inputMainBox">
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} name="username" type="text" placeholder='Full name'/>
                    <p>{formik.touched.username && formik.errors.username? formik.errors.username:''}</p>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' type="text" placeholder='Email'/>
                    <p>{formik.touched.email && formik.errors.email? formik.errors.email:''}</p>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' type="text" placeholder='Password'/>
                    <p>{formik.touched.password && formik.errors.password? formik.errors.password:''}</p>
                </div>
                <div className="lineBox">
                    <div className="lines"></div>
                    <div className="lines"></div>
                    <div className="lines"></div>
                    <div className="lines"></div>
                </div>

                <button type='submit' className='buttonSignin'>Sign up</button>
                <ToastContainer/>
                <div className="termsBox" id='termsBox'>
                    <p>By signing up, you agree to our <span>Terms of Use</span> and <span>Privacy Policy.</span></p>
                </div>

                <div id='loginBox' className="loginBox">
                    <p>
                        Already have an account? <span>
                        <a href="/students/login">
                                Log in
                            </a>
                        </span>
                    </p>
                </div>
            </div>
            
            
           
            </form>
    </>
  )
}

export default Signupbody