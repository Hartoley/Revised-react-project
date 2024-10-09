import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./certificate.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import signature from "./Images/0385f5b95a6f4cedacc84c0bd9fccff7-removebg-preview.png";
import background from "./Images/certi.jpg";

const Certificate = () => {
  const [name, setname] = useState("Brock Woodley");
  const navigate = useNavigate();
  const [courseTitle, settitle] = useState("Digital Marketing Course");
  const { courseId } = useParams();
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [course, setcourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date().toLocaleDateString();
  const certificateRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        ` https://react-node-project-1.onrender.com/courses/course/${courseId}`
      )
      .then((res) => {
        setcourse(res.data);
        settitle(res.data.title);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/data/id/${id}`
      )
      .then((res) => {
        setUserData(res.data);
        setname(res.data.studentDetails.username);
        setLoading(true);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
      });
  }, [courseId]);

  const handleDownload = () => {
    window.print();
  };

  const handleClose = () => {
    navigate(`/students/dashboard/${id}`);
  };

  return (
    <div
      className="d-flex justify-content-center flex-column align-items-center bg-dark text-light"
      style={{ height: "100vh" }}
    >
      <div
        ref={certificateRef}
        className="certificate-container text-center bg-maroon text-gold p-4 rounded shadow-lg"
        style={{ maxWidth: "85%" }}
      >
        <p id="myP" className="h4 mb-2 mt-3">
          CERTIFICATE OF COMPLETION
        </p>
        <p id="myP" className="h4 mb-2">
          {name}
        </p>
        <p id="myP" className="w-75 mx-auto text-center">
          Congratulations on completing the <span>{courseTitle}</span>. Your
          dedication and hard work have truly paid off. We are proud of your
          achievement and excited to see how you'll apply your new skills!
        </p>

        <div className="row my-2">
          <div className="col">
            <p id="myP">{course.createdBy || "Darren Ko"}</p>
            <p id="myP">Virtual Teacher</p>
          </div>
          <div className="col">
            <p id="myP">{course.authors_name || "Josh Walter"}</p>
            <p id="myP">Virtual Instructor</p>
          </div>
        </div>

        <p id="myP">{currentDate}</p>
        <p id="myP">Date</p>

        <div className="mt-1">
          <img
            src={signature}
            alt="Signature"
            className="mb-2"
            style={{ width: "80px" }}
          />
          <p id="myP">Instructor Signature</p>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-1 gap-3">
        <button
          id="downloadBtn"
          style={{
            backgroundColor: "#ffc107",
            border: "none",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleDownload}
        >
          Download Certificate
        </button>
        <button
          id="closeBtn"
          style={{
            backgroundColor: "#6c757d",
            border: "none",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Certificate;
