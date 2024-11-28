import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Header from "./Header";
import "./bigvideobox.css";
import Dashheader from "./Dashheader";
import Subheader from "./Subheader";
import Body1 from "./Body1";
import Footer from "./Footer";
import Bigvideobox from "./Bigvideobox";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(true);
  const [realadmin, setrealadmin] = useState({});
  const [video, setvideo] = useState([]);
  const navigate = useNavigate();
  let Naira = "$";
  let viewed = "Because you viewed “";
  let vspan = "DevOps Beginners to Advanced with Projects";
  let extra = "”";
  const showmore = (courses) => {
    let courseId = courses._id;
    // console.log(courseId);
    navigate("/students/login");
  };

  useEffect(() => {
    axios
      .get("https://react-node-project-1.onrender.com/courses/getallcourses")
      .then((res) => {
        setvideo(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to fetch course");
      });
  });

  return (
    <>
      <Header></Header>
      <Subheader></Subheader>
      <Body1></Body1>
      <div
        className="videoBox1"
        style={{
          padding: "20px",
        }}
      >
        <div className="bigContainerDiv">
          <p className="videoHeadlines">
            {viewed}
            <span>{vspan}</span>
            {extra}{" "}
          </p>
          <div
            className="Mainvideos2"
            id="Mainvideos3"
            style={{
              flexWrap: "wrap",
            }}
          >
            {video.map((courses, index) => (
              <div
                key={index}
                className="videos"
                id="videos"
                onClick={() => showmore(courses)}
              >
                <div className="videoImage">
                  <video src={courses.previewVideo} controls></video>
                </div>
                <p className="title">{courses.title}</p>
                <p className="authorName">{courses.authors_name}</p>
                <p className="price">
                  ₦
                  {courses.price.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Landing;
