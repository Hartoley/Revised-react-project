// CourseHero.jsx
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
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(
          `https://react-node-project-1.onrender.com/courses/course/${courseId}`
        );
        setCourse(data);
      } catch (err) {
        console.error("Course fetch error:", err);
      }
    };

    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(
          `https://react-node-project-1.onrender.com/udemy/student/getdata/id/${userId}`
        );
        setUserData(data);
      } catch (err) {
        console.error("User fetch error:", err);
      }
    };

    const fetchPaidCourses = async () => {
      try {
        const { data } = await axios.get(
          `https://react-node-project-1.onrender.com/udemy/student/paidCourses/id/${userId}`
        );
        const ids = data.map((course) => course._id);
        setPaidVideoIds(ids);
      } catch (err) {
        console.error("Paid courses fetch error:", err);
      }
    };

    fetchCourse();
    fetchUserData();
    fetchPaidCourses();
  }, [courseId, userId]);

  const isPaid = paidVideoIds.includes(courseId);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "2rem",
        marginTop: "13vh",
        padding: "2rem",
        background: "#1c1d1f",
        color: "#fff",
      }}
    >
      <div
        style={{
          flex: "1 1 600px",
          minWidth: "300px",
          maxWidth: "900px",
        }}
      >
        <h1 style={{ fontSize: "2.4rem", fontWeight: 700 }}>{course.title}</h1>
        <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
          {course.description}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ color: "#f4c150", fontWeight: 600 }}>4.3</span>
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            (1,937 ratings)
          </span>
          <span> - 127,428 students</span>
        </div>

        <p style={{ marginTop: "1rem" }}>
          Created by{" "}
          <span style={{ textDecoration: "underline" }}>
            Ing. Tomáš Morávek
          </span>
        </p>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            marginTop: "1rem",
            flexWrap: "wrap",
            fontSize: "14px",
            color: "#d1d1d1",
          }}
        >
          <span>🛠 Last updated 7/2025</span>
          <span>🌍 English</span>
          <span>🎞 English [Auto], Indonesian [Auto], 1 more</span>
        </div>
      </div>

      <div
        style={{
          flex: "0 0 340px",
          width: "100%",
          maxWidth: "360px",
        }}
      >
        <CourseSidebar
          course={course}
          userData={userData}
          isPaid={isPaid}
          id={userId}
        />
      </div>
    </div>
  );
};

export default CourseHero;
