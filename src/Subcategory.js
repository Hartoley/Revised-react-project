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
import { useNavigate } from "react-router-dom";



const Subcategory = () => {
  const { courseId } = useParams();
  const [course, setcourse] = useState([]);
  const [videos, setvideos] = useState([]);
  const [learn, setlearn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Naira = "$";
  const sub = "Video Title:"
  const subcategoryRef = useRef(null);
  const headerRef = useRef(null);
  const videoToplayRef = useRef(null);
  const [paidvideo, setPaidVideo] = useState([]);
  let [playvideo, setplayVideo] = useState("");
  const [paidvideoId, setPaidVideoId] = useState([]);
  const storedId = localStorage.getItem('id');
  const id = JSON.parse(storedId);
  const [userData, setUserData] = useState({});
  let [statusText, setStatusText] = useState('');
  let [certificationStatus, setcertification] = useState('')
  const navigate =useNavigate()
  let [isEligibleForDownload, setIsEligibleForDownload] = useState(false); 
  
    


  useEffect(() => {
    // console.log('Is Eligible for Download:', isEligibleForDownload);
    axios
      .get(`https://react-node-project-1.onrender.com/courses/course/${courseId}`)
      .then((res) => {
        setcourse(res.data);
        setvideos(res.data.videos);
        setlearn(res.data.learn);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch course data");
      });

    axios.get(`https://react-node-project-1.onrender.com/udemy/student/getdata/id/${id}`)
      .then((res) => {
        setUserData(res.data);
        setLoading(true);
      }).catch((error) => {
        console.log('Error:', error);
        setLoading(false);
        toast.error("Failed to fetch user data");
      });

    axios.get(`https://react-node-project-1.onrender.com/udemy/student/paidCourses/id/${id}`)
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

  const handleStarClick = () => {
    console.log("Star clicked!");
  };

  const isPaid = paidvideoId.includes(courseId);

  const playVideo = (videoId, index) => {
    if (isPaid) {
      const video = videos.find(v => v._id === videoId);
      console.log(video.watched);
      setplayVideo(video.url)
      if (video) {
        if (subcategoryRef.current) {
          subcategoryRef.current.style.position = 'fixed';
        }
        if (videoToplayRef.current) {
          videoToplayRef.current.style.display = 'flex';
        }
       
    
      }
       else {
        toast.error("Video not found!");
        console.error("Video not found!");
      }
    } else {
      toast.info("This video is not paid.");
      console.log("This video is not paid.");
    }
  };

  const stop =() => {
    subcategoryRef.current.style.position = 'static';
    videoToplayRef.current.style.display = 'none';
    setplayVideo(null)
    
  }

  
  const handleVideoEnded = (videoId) => {
    axios.post(`https://react-node-project-1.onrender.com/udemy/student/updateProgress`, {
        userId: id,
        courseId: courseId,
        videoId: videoId,

    })
    .then(response => {
      console.log('Video status updated:', response.data);
    })
    .catch(error => {
      console.error('Error updating video status:', error);
    })
  };

  const handleDownload = () => {
    navigate(`/download/certificate/${courseId}/${id}`);
    console.log('Download certificate');
  };

  const handlePlay = (videoId) => {
    const url = `https://react-node-project-1.onrender.com/udemy/student/isWatched`;
    console.log('Requesting URL:', url);
  
    axios.post(url, { userId: id, courseId: courseId, videoId: videoId })
      .then(response => {
        const { success, message } = response.data;
  
        if (success) {
          const watchedStatus = message === 'Student is eligible for certification.'; 
          const newStatusText = watchedStatus ? 'Video has been watched' : 'Video has not been watched';
          setStatusText(newStatusText);
        } else {
          console.warn('Failed to check watched status:', message);
          setStatusText(message);
        }
  
        console.log('Video Played Status:', response.data);
      })
      .catch(error => {
        console.error('Error checking video status:', error);
        setStatusText('An error occurred while checking video status.');
      });
  };
  
  useEffect(() => {
    console.log('Is Eligible for Download:', isEligibleForDownload);
  }, [isEligibleForDownload]);

  const certified = async (courseId) => {
    try {
      const response = await axios.post('https://react-node-project-1.onrender.com/udemy/student/certification', {
        userId: id,
        courseId: courseId,
      }); 
  
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
      console.error('Error checking certification:', error);
      alert('An error occurred while checking eligibility.');
    }
  };
  
  

  const headerChange = () => {
    const header = headerRef.current;
    // if (header && subcategoryRef.current) {
    //   const windowScrollY = window.scrollY;
    //   const subCategoryHeight = subcategoryRef.current.clientHeight;

    //   if (windowScrollY >= subCategoryHeight - window.innerHeight) {
    //     header.style.position = "fixed";
    //     header.style.backgroundColor = "black";
    //     header.style.top = "-50vh";
    //   } else {
    //     header.style.position = "absolute";
    //     header.style.top = "0";
    //   }
    // }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerChange);
    return () => window.removeEventListener("scroll", headerChange);
  }, []);

  

  return (
    <>
      <Dashheader />
      <div onScroll={headerChange} ref={subcategoryRef} className="subCategory">
        <div ref={headerRef} className="category">
          <div className="category1"></div>
          <Subcat />
          <div className="Mainvideos3" ref={videoToplayRef}>
            <div className="playvideo">
            
                {playvideo && (
                 <div className="videoPlayer">
                 <video onPlay={()=>handlePlay(videos.find(video => video.url === playvideo)._id)} onEnded={() => handleVideoEnded(videos.find(video => video.url === playvideo)._id)} controls>
                   <source src={playvideo} type="video/mp4" />
                   Your browser does not support the video tag.
                 </video>
                 <p className="status">{statusText}</p>
             
                </div>
                )}
               
              
               
                <div className="buttonPay">
                <span class="material-symbols-outlined">
                  skip_previous
                  </span>
                  <span onClick={stop} class="material-symbols-outlined">
                  stop_circle
                  </span>
                <span class="material-symbols-outlined">
                  play_arrow
                  </span>
                  <span class="material-symbols-outlined">
                  <span class="material-symbols-outlined">
                      skip_next
                      </span>
                  </span>

                </div>
            </div>
           
          </div>

                
   



          <div className="category2">
            <p className="line1">
              TOTAL: Cloud Computing / CompTIA Cloud+ (CV0-003)
            </p>
            <p className="line2" id="line2">
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
              <span className="material-symbols-outlined">new_releases</span>
              <p>Last updated </p>
            </div>
            <div className="time">
              <span className="material-symbols-outlined">language</span>
              <p>{course.language}</p>
            </div>
            <div className="time">
              <span className="material-symbols-outlined">subtitles</span>
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
                      <span className="material-symbols-outlined" id="span1">
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
                  <div onClick={() => playVideo(videoItem._id, index)} className="videocon">
                    <h4 className="title">
                      <span className="material-symbols-outlined">star</span>
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
                <span className="material-symbols-outlined" id="span1">
                  check_circle
                </span>
                {course.requirements}
              </p>
            </div>
            <div className="sub4">
              <div className="subb2">
                <p>Description</p>
                <p id="subbP2">{course.description}</p>
              </div>
            </div>
            <div className="subDupli">
              <div className="subb2">
                  <p>Certification</p>
                </div>
                  <div className="subb2">
                    <p id="subbP2">{certificationStatus}</p>
                    {isEligibleForDownload && (
                      <button className="btn-downloaded" onClick={handleDownload}>
                        Download Certificate
                      </button>
                    )}
                   {!isEligibleForDownload &&
                    <button className="btn-downloaded1" onClick={() => certified (course._id)}>
                        Check 
                    </button>
                  }
                  </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Subcategory;
