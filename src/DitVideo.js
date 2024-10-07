import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./dit.css";
import Dashheader from "./Dashheader";
import Footer from "./Footer";

const DitVideo = () => {
  const [videos, setVideos] = useState([]);
  const [boughtBy, setboughtBy] = useState([]);
  const [course, setCourse] = useState({});
  const { courseId } = useParams();
  const [preview, setPreview] = useState("");
  const [count, setcount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/courses/course/${courseId}`
      )
      .then((res) => {
        setCourse(res.data);
        setPreview(res.data.previewVideo);
        setVideos(res.data.videos);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/getStudents/${courseId}`
      )
      .then((res) => {
        setcount(res.data.count);
        setboughtBy(res.data.students);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [courseId]);

  const AddVideos = (courseId) => {
    navigate(`/uploadVideo/${courseId}`);
  };

  const EditCourse = (courseId) => {
    navigate(`/editcourse/${courseId}`);
  };

  return (
    <>
      <Dashheader />
      <div className="family-div">
        {/* Preview Section */}
        <div className="video-preview">
          <video src={preview} controls className="preview-video"></video>
        </div>

        {/* Course Info */}
        <div className="course-info text-center">
          <h3 className="course-title">{course.title}</h3>
          <p className="subtitle">Author: {course.authors_name}</p>
          <p className="subtitle">Price: ${course.price}</p>
          <h4 className="subtitle">Sections: {videos.length}</h4>
          <h4 className="subtitle">
            Registered By: {count}{" "}
            <span>{count > 1 ? "Students" : "Student"}</span>
          </h4>

          <button
            style={{
              color: "blue",
            }}
            className="btn btn-custom"
            onClick={() => AddVideos(course._id)}
          >
            Add More Videos
          </button>

          <button
            style={{
              color: "blue",
            }}
            className="btn btn-custom"
            onClick={() => EditCourse(course._id)}
          >
            Edit Course
          </button>
        </div>

        {/* Video Grid Section */}
        <div className="video-grid">
          {videos &&
            videos.map((videoItem, index) => (
              <div key={index} className="video-item">
                <video
                  src={videoItem.url}
                  controls
                  className="sub-video"
                ></video>
                <h4 className="subtitle">Title: {videoItem.sub_title}</h4>
              </div>
            ))}
        </div>

        <ToastContainer />
      </div>
      <Footer />
    </>
  );
};

export default DitVideo;
