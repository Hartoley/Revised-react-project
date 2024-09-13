import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import Studentlogin, {saving, successful, failed} from './Studentlogin' 
import { useSelector, useDispatch } from 'react-redux'
import './Loginbody.css'
import google from './Images/google1.png'
import facebook from './Images/facebook.png'
import apple from './Images/apple.png'


const Loginbody = () => {
    const disptach = useDispatch()
    const navigate = useNavigate()
    const endpoint = "https://react-node-project-3.onrender.com"
    const [loggedin1, setloggedin1] = useState ([])
    

    useEffect(() => {
    axios.get(`http://localhost:5009/udemy/student/getdata`)
    // axios.get(`${endpoint}/students/getdata`)
        .then((res) => {
            // console.log("students data from API:", res.data);
            setloggedin1(res.data)
            console.log(loggedin1);
        }).catch((err) =>{
            console.log(err);
        })
    }, [])
    console.log(loggedin1);
    const formik =useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit:(value) =>{
        const loggedinstudents = loggedin1.find(exist => exist.email == value.email)
        // console.log(loggedinstudents);
            if (loggedinstudents) {
                
                axios.post(`http://localhost:5009/udemy/student/login`, value)
                .then((res) => {  
                    let id = `${loggedinstudents._id}`
                    
                    // console.log(loggedinstudents._id);
                    toast.success("students successfully logged in")
                    navigate(`/students/dashboard/${id}`)
                 
                }).catch((err) =>{
                    console.log(err);
                    toast.error("Failed to log in. Please try again.");
                })
                
            }else{
                console.log("usernot found");
                toast.error("user doesn't exist")
            }
        }
    }) 

  return (
    <>    <form action="" className="body" onSubmit={formik.handleSubmit} >  
         
            <div className="inputBox">
                <p>Log in to your Udemy account</p>
                <div className="others">
                <img id='google' src={google} alt="" />
                    <div className="small">
                     
                        <p>Continue with Google</p>
                    </div>
                </div>
                <div className="others">
                <img src={facebook} id='google' alt="" />
                <div className="small">
                  
                    <p>Continue with Facebook</p>
                </div>
                </div>
                <div className="others">
                <img src={apple} id='google' alt="" />
                <div className="small">
                       
                        <p> Continue with Apple</p>
                    </div>
                </div>
                
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' type="text" placeholder='Email'/>
                <p>{formik.touched.email && formik.errors.email? formik.errors.email:''}</p>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} name='password' type="text" placeholder='Password'/>
                <p>{formik.touched.password && formik.errors.password? formik.errors.password:''}</p>

                <div className="lineBox">
                    <div className="lines"></div>
                    <div className="lines"></div>
                    <div className="lines"></div>
                    <div className="lines"></div>
                </div>

                <div className="checkContainer">
                    <input type="checkbox" />
                    <p>Send me special offers, personalized, recommendations, and learning tips</p>
                </div>
                <button type='submit' className='buttonSignin'>Sign in</button>
                <ToastContainer/>
                <div className="termsBox">
                    <p>Or <span>Forgot Password</span></p>
                </div>

                <div className="loginBox">
                    <p>
                        Don't have an account?  <span>
                        <a href="/students/signup">
                            Sign up
                            Log in with your organization
                            </a>
                           
                        </span>
                    </p>
                </div>
            </div>
            
            
           
      
        </form>
    </>
  )
}

export default Loginbody