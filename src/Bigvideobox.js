import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import './bigvideobox.css'
import Videos from './Videos'


const Bigvideobox = ({viewed, vspan, extra}) => {
  const [video, setvideo] = useState([])

  useEffect(()=>{
    axios.get("http://localhost:5009/courses/getallcourses")
    .then((res)=>{
        setvideo(res.data)
    }).catch((err)=>{
      console.log(err);
      toast.error("Failed to fetch course");
    })
  }, [])

  console.log(video);


  return (
    <>
        <div className="bigBox">
            <p className='videoHeadlines'>{viewed}<span>{vspan}</span>{extra} </p>
            <div className="videoBox">
                <  Videos className='Mainvideos'/>
            </div>
            {/* Master Your DevOps Skills with Real challengeRating: 4.7 out of 52915 reviews40 total hours246 lecturesIntermediateCurrent price: ₦39,900 */}
        </div>
    </>
  )
}

export default Bigvideobox