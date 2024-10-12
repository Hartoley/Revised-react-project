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
  const [loading, setLoading] = useState(false);
  const storedadminId = localStorage.getItem("adminId");
  const adminId = JSON.parse(storedadminId);

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

  const Delete = async (courseId) => {
    toast.loading("Deleting Course course...");
    try {
      const response = await axios.delete(
        `http://localhost:5009/courses/delete/${courseId}`
      );

      if (response.status === 200) {
        console.log("Course deleted successfully");
        toast.dismiss();
        toast.success("Course deleted successfully!");
        setTimeout(() => {
          navigate(`/admindashboard/${adminId}`);
        }, 2500);
      } else {
        console.log("Failed to delete the course");
      }
    } catch (error) {
      console.error("Error deleting the course:", error.message);
    }
  };

  const EditCourse = (courseId) => {
    navigate(`/editcourse/${courseId}`);
  };

  return (
    <>
      <Dashheader />
      <div className="family-div">
        {/* Preview Section */}
        <div id="video-preview" className="video-preview bg-white">
          <video src={preview} controls className="preview-video"></video>
        </div>

        {/* Course Info */}
        <div className="course-info w-75 m-auto text-start bg-white ps-5 ">
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
            onClick={() => Delete(course._id)}
          >
            Delete Course
          </button>

          <button
            style={{
              color: "blue",
            }}
            className="btn btn-custom"
            onClick={() => EditCourse(course._id)}
          >
            Update Course
          </button>
        </div>

        {/* Video Grid Section */}
        <div className="video-grid item-center mt-5">
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
