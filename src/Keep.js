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



const Admin = () => {
  const {username, email, password} = useSelector ( state => state.Adminlogins) 
  const disptach = useDispatch()
  
  const endpoint = "https://react-node-project-3.onrender.com"
  const navigate = useNavigate()
  const [admins, setadmins] = useState([])
  useEffect(() => {
    axios.get(`${endpoint}/admin/getdata`)
      .then((res) => {
        
        setadmins(res.data); 
        // console.log(res.data[0].username);
        disptach(successful(res.data))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  

  const formik = useFormik({
    validationSchema: yup.object({
      username: yup.string().min(4, 'username is too short').required('username is required'),
      email: yup.string().email('must be a valid email').required('email is required'),
      password: yup.string().min(5, 'password is too short').matches(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])` , "password must have at least one capital letter, an integer and a special character").required('password is required')
    }),

    onSubmit:(value)=>{
      console.log(value);
      
      const existingadmin = admins.find(exist=> exist.email == value.email || exist.password == value.password || exist.email == value.email)
     
      if (existingadmin) {
        toast.error("user already exist")
      }else{
        axios.post("https://react-node-project-3.onrender.com", value)
        .then((res)=>{
  
        }).catch((error)=>{
    
        })
      }

    }
  })

  return (
    
    <div>
        <form action="" onSubmit={formik.handleSubmit} className='w-50 mx-auto ps-4 shadow'>
            <div className='form-group'>
                    <label htmlFor="">Username</label>
                    <input onBlur={formik.handleBlur} onChange={formik.handleChange} className='form-control' type="text" name="username" />
                    <p>{formik.touched.username && formik.errors.username? formik.errors.username:''}</p>
            </div>
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
                <button type='submit' className='btn btn-dark'>Register</button>
                <ToastContainer/>
            </div>
        </form>
    </div>
  )
}

export default Admin