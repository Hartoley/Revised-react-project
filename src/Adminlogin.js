import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import Adminlogins, {saving, successful, failed} from './Redux/Adminlogins'
import { useSelector, useDispatch } from 'react-redux'

const Adminlogin = () => {
    const disptach = useDispatch()
    const navigate = useNavigate()
    const endpoint = "https://react-node-project-3.onrender.com"
    const [loggedin, setloggedin] = useState (null)

    useEffect(() => {
    axios.get(`http://localhost:5009/admin/getdata`)
    // axios.get(`${endpoint}/admin/getdata`)
        .then((res) => {
            // console.log("Admin data from API:", res.data);
            setloggedin(res.data)
        }).catch((err) =>{
            console.log(err);
        })
    }, [])
    const formik =useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit:(value) =>{
        const loggedinadmin = loggedin.find(exist => exist.email == value.email)
        
            if (loggedinadmin) {
                
                axios.post(`http://localhost:5009/admin/login`, value)
                .then((res) => {  
                   
                    let id = `${loggedinadmin._id}`
                    
                    
                   
                    toast.success("Admin successfully logged in")
                    navigate(`/admindashboard/${id}`)
                 
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
    <>
        <form action="" onSubmit={formik.handleSubmit} className='w-50 mx-auto ps-4 shadow'>  
            <div>
                    <label htmlFor="">Email</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="text" name='email'/>
                    <p>{formik.touched.email && formik.errors.email? formik.errors.email:''}</p>
            </div>
            <div>
                    <label htmlFor="">Password</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="text" name='password'/>
                    <p>{formik.touched.password && formik.errors.password? formik.errors.password:''}</p>
            </div>
            <div>
                <button type='submit' className='btn btn-dark'>Log in</button>
                <ToastContainer/>
            </div>
        </form>
    
    </>
  )
}

export default Adminlogin