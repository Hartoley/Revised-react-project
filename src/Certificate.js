import React, { useEffect, useRef, useState } from "react";
import "./certificate.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import signature from "./Images/0385f5b95a6f4cedacc84c0bd9fccff7-removebg-preview.png";

const Certificate = () => {
  const [name, setname] = useState("Brock Woodley");
  const navigate = useNavigate();
  const [courseTitle, settitle] = useState("Digital Marketing Course");
  const [subcourseTitle, setsubtitle] = useState("Digital Marketing Course");
  const { courseId } = useParams();
  const [userData, setUserData] = useState({});
  const [course, setcourse] = useState([]);
  const [videos, setvideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [learn, setlearn] = useState([]);
  const { id } = useParams();
  let [certificationStatus, setcertification] = useState("");
  let [isEligibleForDownload, setIsEligibleForDownload] = useState(false);
  const currentDate = new Date().toLocaleDateString();
  const certificateRef = useRef(null);

  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/courses/course/${courseId}`
      )
      .then((res) => {
        setcourse(res.data);
        setvideos(res.data.videos);
        setlearn(res.data.learn);
        settitle(res.data.title);
        setsubtitle(res.data.subtitle);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch course data");
      });

    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/getdata/id/${id}`
      )
      .then((res) => {
        setUserData(res.data);
        setname(res.data.username);
        setLoading(true);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
        toast.error("Failed to fetch user data");
      });
  });

  console.log(course);
  console.log(userData);

  //     const printContents = certificateRef.current.innerHTML;
  //     const originalContents = document.body.innerHTML;

  //     document.body.innerHTML = printContents;

  //     window.print();

  //     document.body.innerHTML = originalContents;
  //   };

  const handleDownload = () => {
    window.print();
  };

  const certified = async (courseId) => {
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
        setcertification(response.data.message);
        setIsEligibleForDownload(true);
      } else {
        // alert(response.data.message);
        setcertification(response.data.message);
      }
      if (response.data.failed) {
        // alert(response.data.message);
        console.log(response);
        setcertification(response.data.message);
      }
    } catch (error) {
      console.error("Error checking certification:", error);
      alert("An error occurred while checking eligibility.");
    }
  };

  const handleClose = () => {
    navigate(`/students/dashboard/${id}`);
    console.log("Close certificate");
  };

  return (
    <div className="Mainvideos4">
      <div
        ref={certificateRef}
        className="showCertificate"
        id="showCertificate123"
      >
        <h3 className="certificate-title">CERTIFICATE OF COMPLETION</h3>
        <div className="certificate-content">
          <p className="certificate-name">{name}</p>
          <p className="certificate-details">{courseTitle}</p>
          <p className="certificate-course">
            Congratulations on completing the of <span>{courseTitle}</span>
            Your dedication and hard work have truly paid off. We are proud of
            your achievement and excited to see how you'll apply your new
            skills!
          </p>

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
        <div className="carrier">
          <div className="certificate-signature">
            <img className="signature" src={signature} alt="Signature" />
            <p>Instructor Signature</p>
          </div>
          <div className="certificate-buttons"></div>
        </div>

        <div className="buttons">
          <button className="btn-download" onClick={handleDownload}>
            Download Certificate
          </button>
          <button className="btn-closed" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
