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
import { useFormik } from "formik";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const DitVideo = () => {
  const [videos, setVideos] = useState([]);
  const [boughtBy, setboughtBy] = useState([]);
  const [course, setCourse] = useState({});
  const { courseId } = useParams();
  const [preview, setPreview] = useState("");
  const [count, setcount] = useState(0);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isEditing, setisEditing] = useState(false);
  const storedadminId = localStorage.getItem("adminId");
  const adminId = JSON.parse(storedadminId);
  const formik = useFormik({
    initialValues: {
      title: course.title || "",
      sub_title: course.sub_title || "",
      language: course.language || {},
      sub_language: course.sub_language || "",
      category: course.category || "",
      sub_category: course.sub_category || "",
      createdBy: course.createdBy || "",
      learn: course.learn || [],
      requirements: course.requirements || [],
      description: course.description || "",
      authors_name: course.authors_name || "",
      price: course.price || "",
      video_preview: course.previewVideo || null,
    },

    enableReinitialize: true,

    onSubmit: (values) => {
      toast.loading("Editing course...");
      const formData = new FormData();
      // console.log(values.video_preview);
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      setLoading(true);
      axios
        .post(
          `https://react-node-project-1.onrender.com/courses/edit/course/${courseId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toast.dismiss();
          toast.success("Course edited successfully!");
          setisEditing(false);
          setLoading(false);
          console.log(formData);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.dismiss();
          toast.error(err?.response?.data?.message);
        });
    },
  });

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

  const editCourse = (courseId) => {
    setisEditing(true);
  };

  const Delete = async (courseId) => {
    toast.loading("Deleting Course...");
    try {
      const response = await axios.delete(
        `https://react-node-project-1.onrender.com/courses/delete/${courseId}`
      );

      if (response.status === 200) {
        console.log("Course deleted successfully");
        toast.dismiss();
        toast.success("Course deleted successfully!");
        setTimeout(() => {
          navigate(`/admindashboard/${adminId}`);
        }, 2500);
      } else {
        toast.dismiss();
        console.log("Failed to delete the course");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error deleting the course:", error.message);
    }
  };

  const deleteVideo = async (videoId) => {
    console.log(videoId, courseId);

    toast.loading("Deleting video...");
    try {
      const response = await axios.delete(
        `https://react-node-project-1.onrender.com/courses/deletevideo/${courseId}/${videoId}`
      );

      if (response.status === 200) {
        console.log("Video deleted successfully");
        toast.dismiss();
        toast.success("Video deleted successfully!");
        setTimeout(() => {
          navigate(`/admindashboard/${adminId}`);
        }, 2500);
      } else {
        toast.dismiss();
        console.log("Failed to delete the course");
      }
    } catch (error) {
      toast.dismiss();
      console.error("Error deleting the course:", error.message);
    }
  };

  const handleFileChange = (event) => {
    try {
      formik.setFieldValue("video_preview", event.currentTarget.files[0]);
    } catch (error) {
      console.error("Failed to set field value:", error);
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
            onClick={() => editCourse(course._id)}
          >
            Edit course
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
        {isEditing && (
          <div className="form-container container-fluid mt-5">
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
              <div className="form-grid">
                {/* Form Title */}
                <h2>Upload a Course</h2>

                {/* Sub-title */}
                <div className="form-group">
                  <label htmlFor="sub_title" className="form-label">
                    Sub-Title
                  </label>
                  <input
                    type="text"
                    id="sub_title"
                    name="sub_title"
                    value={formik.values.sub_title}
                    className="form-control"
                    placeholder="Enter course sub-title"
                    required
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Title */}
                <div className="form-group">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formik.values.title}
                    className="form-control"
                    placeholder="Enter course title"
                    required
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Language */}
                <div className="form-group">
                  <label className="form-label">Languages:</label>
                  {Object.entries(formik.values.language).map(
                    ([key, value], index) => (
                      <div key={index}>
                        <label htmlFor={key} className="form-label">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                          type="text"
                          id={key}
                          name={`language[${key}]`}
                          value={value}
                          className="form-control"
                          onChange={formik.handleChange}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Sub Languages:</label>
                  {Object.entries(formik.values.sub_language).map(
                    ([key, value], index) => (
                      <div key={index}>
                        <label htmlFor={key} className="form-label">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                          type="text"
                          id={key}
                          name={`sub_language[${key}]`}
                          value={value}
                          className="form-control"
                          onChange={formik.handleChange}
                        />
                      </div>
                    )
                  )}
                </div>

                {/* Category */}
                <div className="form-group">
                  <label htmlFor="category" className="form-label">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={formik.values.category}
                    className="form-control"
                    placeholder="Enter course category"
                    required
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Sub-category */}
                <div className="form-group">
                  <label htmlFor="sub_category" className="form-label">
                    Sub-category
                  </label>
                  <input
                    type="text"
                    id="sub_category"
                    name="sub_category"
                    className="form-control"
                    value={formik.values.sub_category}
                    placeholder="Enter course sub-category"
                    required
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Created By */}
                <div className="form-group">
                  <label htmlFor="createdBy" className="form-label">
                    Created by
                  </label>
                  <input
                    type="text"
                    id="createdBy"
                    name="createdBy"
                    className="form-control"
                    value={formik.values.createdBy}
                    placeholder="Enter creator's name"
                    required
                    onChange={formik.handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Learn (Number of items): {formik.values.learn.length}
                  </label>
                  {formik.values.learn.map((item, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`learn[${index}]`}
                      value={formik.values.learn[index]}
                      onChange={formik.handleChange}
                      className="form-control mb-2"
                    />
                  ))}
                </div>

                {/* Requirements */}
                <div className="form-group">
                  <label className="form-label">
                    Requirements (Number of items):{" "}
                    {formik.values.requirements.length}
                  </label>
                  {formik.values.requirements.map((item, index) => (
                    <input
                      key={index}
                      type="text"
                      name={`requirements[${index}]`}
                      value={formik.values.requirements[index]}
                      onChange={formik.handleChange}
                      className="form-control mb-2"
                    />
                  ))}
                </div>

                {/* Description */}
                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    className="form-control"
                    value={formik.values.description}
                    placeholder="Enter course description"
                    required
                    onChange={formik.handleChange}
                  ></textarea>
                </div>

                {/* Author's name */}
                <div className="form-group">
                  <label htmlFor="authors_name" className="form-label">
                    Author's name
                  </label>
                  <input
                    type="text"
                    id="authors_name"
                    value={formik.values.authors_name}
                    name="authors_name"
                    className="form-control"
                    placeholder="Enter author's name"
                    required
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Price */}
                <div className="form-group">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formik.values.price}
                    className="form-control"
                    placeholder="Enter course price"
                    required
                    onChange={formik.handleChange}
                  />
                </div>

                {/* Video Preview */}
                <div className="form-group">
                  <label htmlFor="video_preview" className="form-label">
                    Video Preview
                  </label>
                  <input
                    type="file"
                    id="video_preview"
                    name="video_preview"
                    accept="video/*"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">
                    Save edit
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

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
                <Button
                  id="edit"
                  variant="danger"
                  onClick={() => deleteVideo(videoItem._id)}
                  className="w-100"
                >
                  Delete
                </Button>
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
