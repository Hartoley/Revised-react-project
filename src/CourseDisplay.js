// CoursesDisplay.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "bootstrap/dist/css/bootstrap.min.css";

const CoursesDisplay = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://react-node-project-1.onrender.com/courses/getallcourses")
      .then((res) => {
        setCourses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching courses:", err);
        setLoading(false);
      });
  }, []);

  const showmore = (course) => {
    navigate("/students/login");
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4">
        Because you viewed{" "}
        <span className="text-primary">
          “DevOps Beginners to Advanced with Projects”
        </span>
      </h4>

      <div className="row">
        {loading
          ? Array(6)
              .fill()
              .map((_, i) => (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={i}>
                  <Skeleton height={180} />
                  <Skeleton count={3} />
                </div>
              ))
          : courses.map((course, index) => (
              <div
                className="col-sm-6 col-md-4 col-lg-3 mb-4"
                key={index}
                onClick={() => showmore(course)}
                style={{ cursor: "pointer" }}
              >
                <div className="card h-100 shadow-sm border-0">
                  <video
                    src={course.previewVideo}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover" }}
                  ></video>
                  <div className="card-body p-2">
                    <h6 className="card-title text-truncate">{course.title}</h6>
                    <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                      {course.authors_name}
                    </p>
                    <p className="fw-bold text-dark">
                      ₦
                      {course.price.toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default CoursesDisplay;
