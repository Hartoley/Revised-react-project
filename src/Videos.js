import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import './bigvideobox.css'

const Videos = () => {
  const [video, setvideo] = useState([])
  const Naira = "$"
  const navigate = useNavigate()

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

  const showmore = (courses) =>{
    let courseId = (courses._id)
    console.log(courseId);
    navigate(`/course/${courseId}`); 
    
}

 

  return (
    <>
      <div className='Mainvideos2'>
        {video.map((courses, index) => (
          <div key={index} className="videos" onClick={(()=>showmore(courses))}>
            <video className="vidImage" src={courses.previewVideo} controls></video>
            <p className="title">{courses.title}</p>
            <p className="authorName">{courses.authors_name}</p>
            <p className="price">{Naira} {courses.price}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Videos