import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./dit.css";
import "./App.css";

const App = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://react-node-project-1.onrender.com/courses/getallcourses")
      .then((res) => {
        setVideos(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch courses");
      });
  }, []);

  const AddVideos = (courseId) => {
    navigate(`/uploadVideo/${courseId}`);
  };

  const EditCourse = (courseId) => {
    navigate(`/editcourse/${courseId}`);
  };

  return (
    <div className="container">
      <div className="header-section">
        <h1 className="header-title">Course Video Management</h1>
        <p>Manage all your uploaded courses and videos here</p>
      </div>
      <div className="row">
        {videos.map((course, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
            <div className="video-card">
              <p className="title">{course.title}</p>
              <p className="authorName">Author: {course.authors_name}</p>
              <p className="price">₦ {course.price}</p>
              <button
                className="btn btn-custom mb-3"
                onClick={() => AddVideos(course._id)}
              >
                Add More Videos
              </button>

              {course.videos &&
                course.videos.map((videoItem, videoIndex) => (
                  <div key={videoIndex} className="videoItem">
                    <video src={videoItem.url} controls></video>
                    <h4 className="title">Subtitle: {videoItem.sub_title}</h4>
                  </div>
                ))}

              <button
                className="btn btn-custom"
                onClick={() => EditCourse(course._id)}
              >
                Edit Course
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
