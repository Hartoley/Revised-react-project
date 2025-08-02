import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CourseSidebar from "./Subcat";

const CourseHero = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [userData, setUserData] = useState({});
  const [paidVideoIds, setPaidVideoIds] = useState([]);

  const storedId = localStorage.getItem("id");
  const userId = JSON.parse(storedId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await axios.get(
          `https://react-node-project-1.onrender.com/courses/course/${courseId}`
        );
        setCourse(courseRes.data);

        const userRes = await axios.get(
          `https://react-node-project-1.onrender.com/udemy/student/getdata/id/${userId}`
        );
        setUserData(userRes.data);

        const paidRes = await axios.get(
          `https://react-node-project-1.onrender.com/udemy/student/paidCourses/id/${userId}`
        );
        const ids = paidRes.data.map((course) => course._id);
        setPaidVideoIds(ids);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchData();
  }, [courseId, userId]);

  const isPaid = paidVideoIds.includes(courseId);

  return (
    <div
      style={{ backgroundColor: "#1c1d1f", color: "#fff", paddingTop: "13vh" }}
    >
      <div style={styles.container}>
        {/* Main Hero Text */}
        <div style={styles.heroText}>
          <h1 style={styles.title}>{course.title}</h1>

          <div style={styles.stats}>
            <span style={styles.rating}>4.3</span>
            <span style={styles.link}>(1,937 ratings)</span>
            <span> - 127,428 students</span>
          </div>

          <p style={{ marginTop: "1rem" }}>
            Created by <span style={styles.link}>Ing. Tomáš Morávek</span>
          </p>

          <div style={styles.meta}>
            <span>🛠 Last updated 7/2025</span>
            <span>🌍 English</span>
            <span>🎞 English [Auto], Indonesian [Auto], 1 more</span>
          </div>
        </div>

        {/* Sidebar (only floats on desktop) */}
        <div style={styles.sidebarWrapper}>
          <CourseSidebar
            course={course}
            userData={userData}
            isPaid={isPaid}
            id={userId}
          />
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .course-hero-container {
            flex-direction: column !important;
            height: auto !important;
          }

          .course-hero-text {
            max-width: 100% !important;
          }

          .course-sidebar-wrapper {
            position: static !important;
            transform: none !important;
            margin-top: 1rem;
            max-width: 100% !important;
          }

          h1 {
            font-size: 1.4rem !important;
          }

          p, span {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "2rem",
    padding: "2rem",
    minHeight: "400px",
    position: "relative",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  heroText: {
    flex: "1 1 60%",
    minWidth: "280px",
    maxWidth: "60%",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
  },
  description: {
    fontSize: "1.2rem",
    margin: "1rem 0",
  },
  stats: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  rating: {
    color: "#f4c150",
    fontWeight: 600,
  },
  link: {
    textDecoration: "underline",
    cursor: "pointer",
  },
  meta: {
    display: "flex",
    gap: "1.2rem",
    flexWrap: "wrap",
    marginTop: "1rem",
    fontSize: "0.95rem",
  },
  sidebarWrapper: {
    flex: "1 1 300px",
    minWidth: "380px",
    maxWidth: "400px",
    position: "absolute",
    right: "2rem",
    top: "1rem", // FIXED — aligns sidebar near top of hero
    transform: "translateY(0)",
  },
};

export default CourseHero;
