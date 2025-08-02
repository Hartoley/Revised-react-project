import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Videos = ({ viewed, vspan, extra }) => {
  const [video, setvideo] = useState([]);
  const [paidvideo, setpaidvideo] = useState([]);
  const navigate = useNavigate();
  const storedId = localStorage.getItem("id");
  const id = JSON.parse(storedId);

  const generateRandomRating = () => (Math.random() * 2 + 3).toFixed(1);
  const generateRandomReviews = () => Math.floor(Math.random() * 9900 + 100);

  useEffect(() => {
    axios
      .get("https://react-node-project-1.onrender.com/courses/getallcourses")
      .then((res) => {
        const enriched = res.data.map((course) => ({
          ...course,
          rating: parseFloat(generateRandomRating()),
          reviews: generateRandomReviews(),
          isBestseller: Math.random() < 0.4,
        }));
        setvideo(enriched);
      })
      .catch(console.error);

    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/paidCourses/id/${id}`
      )
      .then((res) => {
        if (res.data) {
          const enriched = res.data.map((course) => ({
            ...course,
            rating: parseFloat(generateRandomRating()),
            reviews: generateRandomReviews(),
            isBestseller: Math.random() < 0.4,
          }));
          setpaidvideo(enriched);
        }
      })
      .catch(console.error);
  }, []);

  const showmore = (course) => {
    navigate(`/course/${id}/${course._id}`);
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    const stars = [];

    for (let i = 0; i < full; i++) {
      stars.push(
        <i className="bi bi-star-fill text-warning" key={`f-${i}`}></i>
      );
    }
    if (half)
      stars.push(<i className="bi bi-star-half text-warning" key="half"></i>);
    while (stars.length < 5) {
      stars.push(
        <i className="bi bi-star text-warning" key={`e-${stars.length}`}></i>
      );
    }
    return stars;
  };

  const renderCourses = (courses) => (
    <div className="row">
      {courses.map((course, index) => (
        <div
          className="col-sm-6 col-md-4 col-lg-3 mb-4"
          key={index}
          onClick={() => showmore(course)}
          style={{ cursor: "pointer" }}
        >
          <div
            className="card h-100 shadow-sm border"
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
                <span className="text-warning fw-bold">{course.rating}</span>
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
                {course.price?.toLocaleString("en-NG", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container py-4">
      {paidvideo.length > 0 && (
        <>
          <h4 className="mb-4">Current programs you enrolled in</h4>
          {renderCourses(paidvideo)}
        </>
      )}

      <h4 className="mt-5 mb-4">
        {viewed}
        <span className="text-primary">{vspan}</span> {extra}
      </h4>

      {renderCourses(video)}
    </div>
  );
};

export default Videos;
