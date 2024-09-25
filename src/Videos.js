import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import './bigvideobox.css'

const Videos = ({viewed, vspan, extra}) => {
  const [video, setvideo] = useState([])
  const [paidvideo, setpaidvideo] = useState([])
  const Naira = "$"
  const navigate = useNavigate()
  const storedId = localStorage.getItem('id');
  const id = JSON.parse(storedId);

  useEffect(()=>{
    axios.get("https://react-node-project-1.onrender.com/courses/getallcourses")
    .then((res)=>{
        setvideo(res.data)
    }).catch((err)=>{
      console.log(err);
      toast.error("Failed to fetch course");
    })

    axios.get(`https://react-node-project-1.onrender.com/udemy/student/paidCourses/id/${id}`)
    .then((res) => {
      if (res.data) {
        setpaidvideo(res.data)
        // console.log(res.data);
        toast.success("course fetching successful!");
      } else {
        console.log('I do not have the data');
        toast.error("course fetching failed");
      }
    }).catch((err) => {
      console.error(err);
      toast.error("Failed to fetch paid courses. Please try again later.");
    })

  }, [])

  

  const showmore = (courses) =>{
    let courseId = (courses._id)
    // console.log(courseId);
    navigate(`/course/${id}/${courseId}`); 
    
}

 

  return (
    <>
     <div className='bigContainerDiv' >
     <div className='Mainvideos2' id='Mainvideos2'>
        {paidvideo.map((courses, index) => (
          <div key={index} className="videos" id='videos'  onClick={(()=>showmore(courses))}>
            <div className="videoImage">
              <video src={courses.previewVideo} controls></video>
            </div>
            <p className="title">{courses.title}</p>
            <p className="authorName">{courses.authors_name}</p>
            <p className="price">{Naira} {courses.price}</p>
          </div>
        ))}
      </div>
      <p className='videoHeadlines'>{viewed}<span>{vspan}</span>{extra} </p>
      <div className='Mainvideos2' id='Mainvideos3' >
        {video.map((courses, index) => (
          <div key={index} className="videos" id='videos' onClick={(()=>showmore(courses))}>
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

