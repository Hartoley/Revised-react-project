import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./admidash.css";
import Videos from "./Videos";
import "./dasboardAdmin.css";
import DitVideo from "./DitVideo";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./dit.css";
import Dashheader from "./Dashheader";
import Adminheader from "./AdminHeader";

const Admindas = () => {
  const navigate = useNavigate();
  const coursesSectionRef = useRef(null);
  const studentsSectionRef = useRef(null);
  const uploadSectionRef = useRef(null);
  const [studentsdata, setstudentsdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [realadmin, setrealadmin] = useState({});
  const [video, setvideo] = useState([]);
  const [learn, setlearn] = useState([]);
  const [newvideo, setnewvideo] = useState("");
  const { id } = useParams();
  const Naira = "$";
  const sub = "Video Title:";
  const loadingToastRef = useRef(false);

  useEffect(() => {
    if (loading) {
      if (!loadingToastRef.current) {
        toast.loading("Processing data...");
        loadingToastRef.current = true;
      }
    } else {
      loadingToastRef.current = false;
    }
  }, [loading]);

  useEffect(() => {
    axios
      .get(`https://react-node-project-1.onrender.com/admin/getdata/id/${id}`)
      .then((res) => {
        // console.log(res.data);
        setrealadmin(Object.values(res.data));
        // console.log(realadmin);
        setLoading(false);
        toast.dismiss();
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Failed to fetch admin data");
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        "https://react-node-project-1.onrender.com/udemy/student/getallstudent"
      )
      .then((res) => {
        setstudentsdata(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch students data");
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      sub_title: "",
      Language: "",
      sub_language: "",
      category: "",
      sub_category: "",
      createdBy: "",
      learn: "",
      requirements: "",
      description: "",
      authors_name: "",
      price: "",
      video_preview: null,
    },

    onSubmit: (values) => {
      toast.loading("Uploading course...");
      const formData = new FormData();
      // console.log(values.video_preview);
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      setLoading(true);
      axios
        .post(
          "https://react-node-project-1.onrender.com/courses/upload/course",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          toast.dismiss();
          toast.success("Course uploaded successfully!");
          let courseId = `${res.data.course._id}`;
          // console.log(courseId);
          setLoading(true);
          console.log(formData);
          navigate(`/uploadVideo/${courseId}`);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.dismiss();
          toast.error("Failed Upload course");
        });
    },
  });

  const getstudent = (id) => {
    // console.log("Student ID:", id);
    navigate(`/studentlist/${id}`);
  };

  const handleFileChange = (event) => {
    try {
      formik.setFieldValue("video_preview", event.currentTarget.files[0]);
    } catch (error) {
      console.error("Failed to set field value:", error);
    }
  };

  useEffect(() => {
    axios
      .get("https://react-node-project-1.onrender.com/courses/getallcourses")
      .then((res) => {
        setvideo(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch course");
      });
  }, []);

  // console.log(video);

  const Addvideos = (courses) => {
    let courseId = courses._id;
    navigate(`/editOne/${courseId}`);

    // navigate(`/uploadVideo/${courseId}`);
  };

  const Editcourse = (courses) => {
    let courseId = courses._id;
    navigate(`/editcourse/${courseId}`);
  };

  const scrollToCourses = () => {
    coursesSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToUploadCourses = () => {
    uploadSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToStudents = () => {
    studentsSectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ToastContainer />
      <Adminheader
        scrollToCourses={scrollToCourses}
        scrollToStudents={scrollToStudents}
        scrollToUploadCourses={scrollToUploadCourses}
      />

      <div className="postVideos">
        <h3>Welcome on board {realadmin[1]}</h3>
        <div className="student-section mt-5" ref={studentsSectionRef}>
          <h3>Students List</h3>
          <div className="student-grid">
            {studentsdata.map((student, index) => (
              <div className="student-card" key={index}>
                <div className="student-image">
                  <img
                    src={`https://api.dicebear.com/6.x/avataaars/svg?seed=${student.username}`}
                    alt={student.username}
                  />
                </div>
                <div
                  onClick={() => getstudent(student._id)}
                  className="student-info"
                >
                  <h4>{student.username}</h4>
                  <p>Location: {student.location || "Unknown"}</p>
                  <p>Email: {student.email || "No email provided"}</p>
                  <p>Role: {student.role || "No phone number"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-container container-fluid mt-5">
          <form
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
            ref={uploadSectionRef}
          >
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
                  className="form-control"
                  placeholder="Enter course title"
                  required
                  onChange={formik.handleChange}
                />
              </div>

              {/* Language */}
              <div className="form-group">
                <label htmlFor="language" className="form-label">
                  Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  className="form-control"
                  placeholder="Enter course language"
                  required
                  onChange={formik.handleChange}
                />
              </div>

              {/* Sub-language */}
              <div className="form-group">
                <label htmlFor="sub_language" className="form-label">
                  Sub-language
                </label>
                <input
                  type="text"
                  id="sub_language"
                  name="sub_language"
                  className="form-control"
                  placeholder="Enter course sub-language"
                  required
                  onChange={formik.handleChange}
                />
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
                  placeholder="Enter creator's name"
                  required
                  onChange={formik.handleChange}
                />
              </div>

              {/* What you will learn */}
              <div className="form-group">
                <label htmlFor="learn" className="form-label">
                  What you will learn
                </label>
                <input
                  type="text"
                  id="learn"
                  name="learn"
                  className="form-control"
                  placeholder="Enter what students will learn"
                  required
                  onChange={formik.handleChange}
                />
              </div>

              {/* Requirements */}
              <div className="form-group">
                <label htmlFor="requirements" className="form-label">
                  Requirements
                </label>
                <input
                  type="text"
                  id="requirements"
                  name="requirements"
                  className="form-control"
                  placeholder="Enter course requirements"
                  required
                  onChange={formik.handleChange}
                />
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
                  Next
                </button>
              </div>
            </div>
          </form>
        </div>
        <Container
          className="mt-5"
          ref={coursesSectionRef}
          style={{
            cursor: "pointer",
          }}
        >
          <h2 className="text-center mb-4">Course Section</h2>
          <Row>
            {video.map((courses, index) => (
              <Col key={index} md={4} sm={6} className="mb-4">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Text>{courses.title}</Card.Text>
                    <Card.Text>
                      <strong>Author:</strong> {courses.authors_name}
                    </Card.Text>
                    <Card.Text>
                      <strong>Price:</strong> ₦ {courses.price}
                    </Card.Text>
                    <Button
                      id="edit"
                      variant="primary"
                      onClick={() => Addvideos(courses)}
                      className="w-100"
                    >
                      Preview
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default Admindas;
