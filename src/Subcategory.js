import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./subcategory.css";
import Dashheader from "./Dashheader";
import Star from "./Star";
import Footer from "./Footer";
import Subcat from "./Subcat";


const Subcategory = () => {
  const { courseId } = useParams();
  const [course, setcourse] = useState([]);
  const [videos, setvideos] = useState([]);
  const [learn, setlearn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Naira = "$";
  const sub = "Video Title:";
  const subCategory = document.querySelector('.subCategory');
  const category3 = document.querySelectorAll('.category');
  const subCategoryRef = useRef(null);
  const [paidvideo, setPaidVideo] = useState([]);
  const [paidvideoId, setPaidVideoId] = useState([]);
  const storedId = localStorage.getItem('id');
  const id = JSON.parse(storedId);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5009/courses/course/${courseId}`)
      .then((res) => {
        setcourse(res.data);
        setvideos(res.data.videos);
        setlearn(res.data.learn);
      })
      .catch((error) => {
        console.log(error);

        toast.error("Failed to fetch corse data");
      });

      axios.get(`http://localhost:5009/udemy/student/getdata/id/${id}`)
      .then((res) => {
        setUserData(res.data);
        setLoading(true);
      }).catch((error) => {
        console.log('Error:', error);
        setLoading(false);
        toast.error("Failed to fetch user data");
      })

      axios.get(`http://localhost:5009/udemy/student/paidCourses/id/${id}`)
      .then((res) => {
        if (res.data) {
          setPaidVideo(res.data);
          const ids = res.data.map(course => course._id);  
          setPaidVideoId(ids);
          toast.success("Course fetching successful!");
        } else {
          toast.error("Course fetching failed");
        }
      }).catch((err) => {
        console.error(err);
        toast.error("Failed to fetch paid courses. Please try again later.");
      });
  }, [courseId]);

  // console.log(course);
  // console.log(videos);
  const handleStarClick = () => {
    console.log("Star clicked!");
  };
  const playVideo = (videoId) => {
    const isPaid = paidvideoId.includes(videoId); 
    if (isPaid) {
      const video = videos.find(v => v._id === videoId);
      if (video) {
        console.log("Paid video URL:", video.url);
      } else {
        console.error("Video not found!");
      }
    } else {
      console.log("This video is not paid.");
  
    }
  };
  
  const headerChange = () => {
    const subCategory = subCategoryRef.current; 
    if (subCategory) {
      const windowScrollY = window.scrollY;
      const subCategoryHeight = subCategory.clientHeight;

      if (windowScrollY >= subCategoryHeight - window.innerHeight) {
        category3.style.position = "fixed";
        category3.style.backgroundColor = "black";
        category3.style.top = "-50vh";
      } else {
        category3.style.position = "absolute";
        category3.style.top = "0";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll",headerChange); 
    return () => window.removeEventListener("scroll",headerChange);
  },[])

  // console.log(learn);

  return (
    <>
      <Dashheader />
      
      <div onScroll={headerChange} className="subCategory">
        <div className="category">
          <div className="category1">

          </div>

          <Subcat/>
          <div className="Mainvideos3">
          {/* {videos.map((videoItem, index) => (
                  <div key={index} className="videoItem">
                    <video className="vidImage" src={videoItem.url} controls></video>
                    <h4 className="title">{sub} {videoItem.sub_title}</h4>
                  </div>
                ))} */}
          </div>
          <div className="category2">
            <p className="line1">
              TOTAL: Cloud Computing / CompTIA Cloud+ (CV0-003)
            </p>
            <p className="line2">
              Learn the basics of Cloud Computing and/or prepare for the CompTIA
              Cloud+ Certification Exam.
            </p>
            <p>
              <Star
                isSelected={false}
                size={20}
                color="orange"
                onClick={handleStarClick}
              />
              <Star
                isSelected={false}
                size={16}
                color="orange"
                onClick={handleStarClick}
              />
              <Star
                isSelected={false}
                size={16}
                color="orange"
                onClick={handleStarClick}
              />
              <Star
                isSelected={false}
                size={16}
                color="orange"
                onClick={handleStarClick}
              />
              <Star
                isSelected={false}
                size={16}
                color="orange"
                onClick={handleStarClick}
              />
            </p>
            <p className="line3">Created by </p>
          </div>
          <div className="last">
            <div className="time">
              <span class="material-symbols-outlined">new_releases</span>
              <p>Last updated </p>
            </div>
            <div className="time">
              <span class="material-symbols-outlined">language</span>
              <p>{course.language}</p>
            </div>
            <div className="time">
              <span class="material-symbols-outlined">subtitles</span>
              <p>English [Auto], Arabic [Auto] , Italian [Auto]</p>
            </div>
          </div>
          
        </div>
        <div className="section1">
          <div className="subsection1">
            <div className="sub1">
              <p className="subtext1">What you'll learn</p>
              <div className="check">
                {learn.map((learnItem, index) => (
                  <div key={index} className="check1">
                    <p className="checkText">
                      <span class="material-symbols-outlined" id="span1">
                        check
                      </span>
                      {learnItem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="sub1">
              <p className="sub1text">
                Top companies offer this course to their employees
              </p>
              <p className="sub1text1">
                This course was selected for our collection of top-rated courses
                trusted by businesses worldwide. <span> Learn more</span>
              </p>
              <div className="companiesBox1">
                <img
                  src="https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg"
                  alt=""
                />
                <img
                  src="https://s.udemycdn.com/partner-logos/v4/volkswagen-dark.svg"
                  alt=""
                />
                <img
                  src="https://s.udemycdn.com/partner-logos/v4/box-dark.svg"
                  alt=""
                />
                <img
                  src="https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg"
                  alt=""
                />
                <img
                  src="https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg"
                  alt=""
                />
              </div>
            </div>
            <div className="subb">
              <p>Course content</p>
            </div>
            <div className="subb1">
              <p className="subbtext">
                {videos.length}
                <span>Sections</span>
              </p>
            </div>
            <div className="sub2">
              {videos.map((videoItem, index) => (
                <div key={index} className="videoItem">
                  <div  onClick={(()=>playVideo(videoItem._id))} className="videocon">
                    <h4 className="title">                   
                      <span class="material-symbols-outlined">star</span>

                      {videoItem.sub_title}
                    </h4>
                    {videoItem.duration && ( 
                      <span className="duration">
                        {" "}
                        ({Math.floor(videoItem.duration / 60)} min){" "}
                      </span>
                    )}
                    
                  </div>
                </div>
              ))}

           
             
            </div>
            <div className="sub3">
                <div className="subb2">
                    <p>Requirements</p>
                </div>

                <p className="checkText1">
                <span class="material-symbols-outlined" id="span1">
                    check_circle
                    </span>

                    {course.requirements}
                </p>
            </div>
            <div className="sub4">
                <div className="subb2">
                    <p>Description</p>
                    <p id="subbP2" >{course.description}</p>
                </div>
            </div>
          </div>
        </div>

        <Footer/>
      </div>
    </>
  );
};

export default Subcategory;
