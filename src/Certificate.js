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

  // Inject print styles
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden !important;
        }
        #certificate-section, #certificate-section * {
          visibility: visible !important;
        }
        #certificate-section {
          position: absolute;
          left: 0;
          top: 0;
          width: 100vw;
          background: linear-gradient(to right, #0f1c2e, #1c263b) !important;
          color: #d4af37 !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          box-shadow: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleDownload = () => window.print();
  const handleClose = () => navigate(`/students/dashboard/${id}`);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#d6c2a6",
        padding: "30px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        id="certificate-section"
        ref={certificateRef}
        style={{
          background: "linear-gradient(to right, #0f1c2e, #1c263b)",
          color: "#d4af37",
          padding: "8vw 5vw",
          borderRadius: "10px",
          maxWidth: "950px",
          width: "100%",
          fontFamily: "'Georgia', serif",
          position: "relative",
          boxSizing: "border-box",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          WebkitPrintColorAdjust: "exact",
          printColorAdjust: "exact",
        }}
      >
        {/* Responsive Ribbon */}
        <div
          style={{
            position: "absolute",
            top: "2vw",
            left: "2vw",
            backgroundColor: "#d4af37",
            color: "#1a1a1a",
            padding: "0.8vw",
            borderRadius: "50%",
            fontWeight: "bold",
            fontSize: "clamp(10px, 1.2vw, 14px)",
            width: "clamp(50px, 6vw, 70px)",
            height: "clamp(50px, 6vw, 70px)",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <div>{new Date().getFullYear()}</div>
          <div style={{ fontSize: "clamp(8px, 0.9vw, 10px)" }}>AWARD</div>
        </div>

        <h1
          style={{
            textAlign: "center",
            fontWeight: "700",
            letterSpacing: "2px",
            marginBottom: "0.2em",
            fontSize: "clamp(24px, 5vw, 40px)",
          }}
        >
          CERTIFICATE
        </h1>
        <p
          style={{
            textAlign: "center",
            fontSize: "clamp(16px, 3vw, 20px)",
            fontWeight: "500",
            marginBottom: "30px",
          }}
        >
          OF ACHIEVEMENT
        </p>

        <p
          style={{
            textAlign: "center",
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          Proudly Presented To
        </p>
        <h2
          style={{
            textAlign: "center",
            fontFamily: "cursive",
            fontSize: "clamp(24px, 4vw, 32px)",
            color: "#eac676",
            marginBottom: "30px",
          }}
        >
          {name}
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#cccccc",
            fontSize: "14px",
            lineHeight: "1.8",
            maxWidth: "700px",
            margin: "0 auto",
          }}
        >
          Congratulations on successfully completing the{" "}
          <strong>{courseTitle}</strong>. Your commitment and achievement are
          commendable. We hereby recognize your accomplishment and award you
          this certificate.
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginTop: "50px",
            gap: "20px",
          }}
        >
          <div style={{ textAlign: "center", flex: "1 1 40%" }}>
            <p style={{ fontSize: "14px", color: "#999" }}>{currentDate}</p>
            <div
              style={{
                borderTop: "1px solid #888",
                width: "100px",
                margin: "5px auto 0 auto",
              }}
            ></div>
            <p style={{ fontSize: "12px", color: "#aaa" }}>DATE</p>
          </div>
          <div style={{ textAlign: "center", flex: "1 1 40%" }}>
            <p
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "28px",
                fontStyle: "italic",
                color: "#eac676",
                margin: "0",
                textAlign: "center",
              }}
            >
              {course.createdBy || "Dr. Keena"}
            </p>
            <div
              style={{
                borderTop: "1px solid #888",
                width: "100px",
                margin: "5px auto 0 auto",
              }}
            ></div>
            <p style={{ fontSize: "12px", color: "#aaa" }}>SIGNATURE</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <button
          onClick={handleDownload}
          style={{
            backgroundColor: "#d4af37",
            color: "#000",
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
