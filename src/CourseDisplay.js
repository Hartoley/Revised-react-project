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

  const generateRandomRating = () => (Math.random() * 2 + 3).toFixed(1); // between 3.0 and 5.0
  const generateRandomReviews = () => Math.floor(Math.random() * 9900 + 100); // between 100 and 9999

  useEffect(() => {
    axios
      .get("https://react-node-project-1.onrender.com/courses/getallcourses")
      .then((res) => {
        const enrichedCourses = res.data.map((course) => ({
          ...course,
          rating: parseFloat(generateRandomRating()),
          reviews: generateRandomReviews(),
          isBestseller: Math.random() < 0.4, // 40% chance
        }));
        setCourses(enrichedCourses);
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

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <i className="bi bi-star-fill text-warning" key={`full-${i}`}></i>
      );
    }
    if (halfStar) {
      stars.push(<i className="bi bi-star-half text-warning" key="half"></i>);
    }
    while (stars.length < 5) {
      stars.push(
        <i
          className="bi bi-star text-warning"
          key={`empty-${stars.length}`}
        ></i>
      );
    }

    return stars;
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
                  <Skeleton height={220} />
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
                <div
                  className="card h-100 shadow-sm border-"
                  style={{ border: "1px solid #d1d2e0" }}
                >
                  <video
                    src={course.previewVideo}
                    className="card-img-top rounded"
                    style={{
                      height: "220px",
                      width: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                    muted
                    loop
                    playsInline
                  ></video>
                  <div className="card-body p-2">
                    <h6 className="card-title text-truncate">{course.title}</h6>
                    <p className="text-muted mb-1" style={{ fontSize: "14px" }}>
                      {course.authors_name}
                    </p>

                    <div className="d-flex align-items-center gap-1 mb-1">
                      <span className="text-warning fw-bold">
                        {course.rating}
                      </span>
                      <div>{renderStars(course.rating)}</div>
                      <span className="text-muted" style={{ fontSize: "13px" }}>
                        ({course.reviews})
                      </span>
                    </div>

                    {course.isBestseller && (
                      <div
                        className="badge bg-warning text-dark mb-2"
                        style={{ fontSize: "12px", fontWeight: "500" }}
                      >
                        Bestseller
                      </div>
                    )}

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
