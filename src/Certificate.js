import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Certificate = () => {
  const [name, setname] = useState("Brock Woodley");
  const [courseTitle, settitle] = useState("Digital Marketing Course");
  const { courseId, id } = useParams();
  const [userData, setUserData] = useState({});
  const [course, setcourse] = useState([]);
  const currentDate = new Date().toLocaleDateString();
  const certificateRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/courses/course/${courseId}`
      )
      .then((res) => {
        setcourse(res.data);
        settitle(res.data.title);
      });

    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/data/id/${id}`
      )
      .then((res) => {
        setUserData(res.data);
        setname(res.data.studentDetails.username);
      });
  }, [courseId, id]);

  const handleDownload = () => window.print();
  const handleClose = () => navigate(`/students/dashboard/${id}`);

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#e6d3b3",
        padding: "30px",
      }}
    >
      <div
        ref={certificateRef}
        style={{
          background: "linear-gradient(135deg, #0c0f14 0%, #1e2129 100%)",
          color: "#d4af37",
          padding: "40px 50px",
          borderRadius: "8px",
          maxWidth: "900px",
          width: "100%",
          fontFamily: "'Georgia', serif",
          boxShadow: "0 0 40px rgba(0,0,0,0.5)",
          position: "relative",
        }}
      >
        {/* Ribbon */}
        <div
          style={{
            position: "absolute",
            left: "30px",
            top: "30px",
            backgroundColor: "gold",
            color: "#000",
            padding: "10px 15px",
            borderRadius: "50%",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "2px 2px 10px rgba(0,0,0,0.3)",
          }}
        >
          2020
          <br />
          AWARD
        </div>

        <h2
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "700",
            letterSpacing: "2px",
            marginBottom: "0.5rem",
            color: "#d4af37",
          }}
        >
          CERTIFICATE
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "1.2rem",
            marginBottom: "2rem",
            fontWeight: "500",
          }}
        >
          OF ACHIEVEMENT
        </p>

        <p
          style={{
            textAlign: "center",
            fontSize: "0.9rem",
            color: "#ccc",
            marginBottom: "1.5rem",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Proudly Presented To
        </p>

        <h3
          style={{
            textAlign: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            fontFamily: "cursive",
            color: "#eac676",
            marginBottom: "1.5rem",
          }}
        >
          {name}
        </h3>

        <p
          style={{
            fontSize: "14px",
            textAlign: "center",
            color: "#aaa",
            maxWidth: "700px",
            margin: "0 auto 2rem auto",
            lineHeight: "1.6",
          }}
        >
          Congratulations on completing the <b>{courseTitle}</b>. Your
          dedication and hard work have truly paid off. This certificate
          recognizes your efforts and accomplishments in mastering the content.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "40px",
          }}
        >
          <div>
            <p
              style={{
                borderTop: "1px solid #888",
                paddingTop: "5px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              DATE
            </p>
          </div>
          <div>
            <p
              style={{
                borderTop: "1px solid #888",
                paddingTop: "5px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              SIGNATURE
            </p>
          </div>
        </div>
      </div>

      <div
        className="d-flex gap-3 mt-4"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <button
          onClick={handleDownload}
          style={{
            backgroundColor: "#ffc107",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Download
        </button>
        <button
          onClick={handleClose}
          style={{
            backgroundColor: "#6c757d",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Certificate;
