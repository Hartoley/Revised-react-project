import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import './bigvideobox.css'

const Videos = () => {
  const [video, setvideo] = useState([])
  const [paidvideo, setpaidvideo] = useState([])
  const Naira = "$"
  const navigate = useNavigate()
  const storedId = localStorage.getItem('id');
  const id = JSON.parse(storedId);

  useEffect(()=>{
    axios.get("http://localhost:5009/courses/getallcourses")
    .then((res)=>{
        setvideo(res.data)
    }).catch((err)=>{
      console.log(err);
      toast.error("Failed to fetch course");
    })

    axios.get(`http://localhost:5009/udemy/student/paidCourses/id/id/${id}`)
    .then((res) => {
      if (res.data.success) {
        setpaidvideo(res.data)
        toast.success("Payment successful!");
      } else {
        toast.error("Payment verification failed");
      }
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
     <div className='bigContinerDiv' >
     <div className='Mainvideos2'>
        {video.map((courses, index) => (
          <div key={index} className="videos" onClick={(()=>showmore(courses))}>
            <div className="videoImage">
              <video src={courses.previewVideo} controls></video>
            </div>
            <p className="title">{courses.title}</p>
            <p className="authorName">{courses.authors_name}</p>
            <p className="price">{Naira} {courses.price}</p>
          </div>
        ))}
      </div>

      <div className='Mainvideos2'>
        {video.map((courses, index) => (
          <div key={index} className="videos" onClick={(()=>showmore(courses))}>
           <div className="videoImage">
              <video src={courses.previewVideo} controls></video>
            </div>
            <p className="title">{courses.title}</p>
            <p className="authorName">{courses.authors_name}</p>
            <p className="price">{Naira} {courses.price}</p>
          </div>
        ))}
      </div>

      </div>
    </>
  )
}

export default Videos

