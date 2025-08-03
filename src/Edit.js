import React, { useEffect, useRef, useState } from "react";
import "./certificate.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import signature from "./Images/0385f5b95a6f4cedacc84c0bd9fccff7-removebg-preview.png";

const Certificate = () => {
  const id = useParams();
  const [name, setName] = useState("Brock Woodley");
  const navigate = useNavigate();
  const [courseTitle, setTitle] = useState("Digital Marketing Course");
  const [subcourseTitle, setSubtitle] = useState("Digital Marketing Course");
  const { courseId } = useParams();
  const [userData, setUserData] = useState({});
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [certificationStatus, setCertificationStatus] = useState("");
  const [isEligibleForDownload, setIsEligibleForDownload] = useState(false);
  const currentDate = new Date().toLocaleDateString();
  const certificateRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await axios.get(
          `http://localhost:5009/courses/course/${courseId}`
        );
        setCourse(courseRes.data);
        setTitle(courseRes.data.title);
        setSubtitle(courseRes.data.subtitle);

        const userRes = await axios.get(
          `http://localhost:5009/udemy/student/getdata/id/${id}`
        );
        setUserData(userRes.data);
        setName(userRes.data.username);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId, id]);

  const handleDownload = () => {
    const printContents = certificateRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const certified = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5009/udemy/student/certification",
        {
          userId: id,
          courseId: courseId,
        }
      );

      if (response.data.success) {
        alert(response.data.message);
        setCertificationStatus(response.data.message);
        setIsEligibleForDownload(true);
      } else {
        setCertificationStatus(response.data.message);
      }
    } catch (error) {
      console.error("Error checking certification:", error);
      alert("An error occurred while checking eligibility.");
    }
  };

  const handleClose = () => {
    navigate(`/course/${courseId}`);
  };

  return (
    <div className="Mainvideos4">
      <div className="showCertificate" ref={certificateRef}>
        <h3 className="certificate-title">CERTIFICATE OF COMPLETION</h3>
        <div className="certificate-content">
          <p className="certificate-name">{name}</p>
          <p className="certificate-course">{courseTitle}</p>
          <p className="certificate-details">{subcourseTitle}</p>
          <div className="instructors-div">
            <div className="certificate-instructors">
              <p>{course.createdBy}</p>
              <p>Virtual Teacher</p>
            </div>
            <div className="certificate-instructors">
              <p>{course.authors_name}</p>
              <p>Virtual Instructor</p>
            </div>
          </div>
          <div className="certificate-instructors">
            <p>{currentDate}</p>
            <p>Date</p>
          </div>
        </div>
        <div className="certificate-signature">
          <img className="signature" src={signature} alt="Signature" />
          <p>Instructor Signature</p>
        </div>
      </div>

      <div className="buttons">
        <button
          className="btn-download"
          onClick={handleDownload}
          disabled={!isEligibleForDownload}
        >
          Download Certificate
        </button>
        <button className="btn-closed" onClick={handleClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Certificate;
