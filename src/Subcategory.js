import React, { useCallback, useEffect, useRef, useState } from "react";
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
import CourseHero from "./Star";
import VideoPlayer from "./VideoPlayer.js";

const Subcategory = () => {
  const { courseId } = useParams();
  const [course, setcourse] = useState([]);
  const [videos, setvideos] = useState([]);
  const [learn, setlearn] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Naira = "$";
  const sub = "Video Title:";
  const subcategoryRef = useRef(null);
  const headerRef = useRef(null);
  const videoToplayRef = useRef(null);
  const [paidvideo, setPaidVideo] = useState([]);
  let [playvideo, setplayVideo] = useState("");
  const [paidvideoId, setPaidVideoId] = useState([]);
  const storedId = localStorage.getItem("id");
  const id = JSON.parse(storedId);
  const [userData, setUserData] = useState({});
  let [statusText, setStatusText] = useState("");
  let [videosID, setvideosID] = useState(null);
  let [certificationStatus, setcertification] = useState("");
  let [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playVideoUrl, setPlayVideoUrl] = useState(null);
  const videoElementRef = useRef(null);
  const [isChecking, setIsChecking] = useState(false);

  const navigate = useNavigate();
  let [isEligibleForDownload, setIsEligibleForDownload] = useState(false);
  let [isPaused, setIsPaused] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // console.log('Is Eligible for Download:', isEligibleForDownload);
    axios
      .get(
        `https://react-node-project-1.onrender.com/courses/course/${courseId}`
      )
      .then((res) => {
        setcourse(res.data);
        setvideos(res.data.videos);
        setlearn(res.data.learn);
      })
      .catch((error) => {
        console.log(error);
        // toast.error("Failed to fetch course data");
      });

    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/getdata/id/${id}`
      )
      .then((res) => {
        setUserData(res.data);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
        // toast.error("Failed to fetch user data");
      });

    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/paidCourses/id/${id}`
      )
      .then((res) => {
        if (res.data) {
          setPaidVideo(res.data);
          const ids = res.data.map((course) => course._id);
          setPaidVideoId(ids);
          // toast.success("Course fetching successful!");
        } else {
          // toast.error("Course fetching failed");
        }
      })
      .catch((err) => {
        console.error(err);
        // toast.error("Failed to fetch paid courses. Please try again later.");
      });
  }, [id]);

  useEffect(() => {
    const studentId = id;
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://react-node-project-1.onrender.com/students/notifications/${studentId}`
        );
        if (response.data.success) {
          setNotifications(response.data.notifications || []);
        } else {
          setError("No notifications found.");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("An error occurred while fetching notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [id]);

  const newNotificationCount = notifications.length;

  const handleStarClick = () => {
    console.log("Star clicked!");
  };

  const isPaid = paidvideoId.includes(courseId);

  const playVideo = (videoId, index) => {
    if (isPaid) {
      const video = videos[index];

      if (video) {
        setvideosID(index);
        setplayVideo(video.url);

        // Adjust styles as necessary
        if (subcategoryRef.current) {
          subcategoryRef.current.style.position = "fixed";
        }
        if (videoToplayRef.current) {
          videoToplayRef.current.style.display = "flex";
        }
      } else {
        toast.error("Video not found!");
        console.error("Video not found!");
      }
    } else {
      toast.info(
        "Preview available. Please purchase the course to watch the full video"
      );
      console.log(
        "Preview available. Please purchase the course to watch the full video"
      );

      alert(
        "Preview available. Please purchase the course to watch the full video"
      );
    }
  };

  const next = useCallback(() => {
    const nextIndex = videosID + 1;

    if (nextIndex < videos.length) {
      const video = videos[nextIndex];
      if (video) {
        setvideosID(nextIndex);
        setplayVideo(video.url);
        videoElementRef.current.pause();
        setIsPaused(true);
      }
    } else {
      setStatusText("You have reached the last video.");
    }
  }, [playVideo]);

  const prev = () => {
    const prevIndex = videosID - 1;

    if (prevIndex >= 0) {
      const video = videos[prevIndex];
      if (video) {
        setvideosID(prevIndex);
        setplayVideo(video.url);
      }
    } else {
      setStatusText("You have reached the first video.");
    }
  };

  const playPauseVideo = () => {
    if (videoElementRef.current) {
      if (isPaused) {
        videoElementRef.current.play();
        setIsPaused(false);
      } else {
        videoElementRef.current.pause();
        setIsPaused(true);
      }
    }
  };

  const stopVideo = () => {
    if (videoElementRef.current) {
      videoElementRef.current.pause();
      videoElementRef.current.currentTime = 0;
      setIsPaused(true);
    }
  };

  const stop = () => {
    if (subcategoryRef.current) {
      subcategoryRef.current.style.position = "static";
    }

    if (videoToplayRef.current) {
      videoToplayRef.current.style.display = "none";
    }

    setStatusText("");
    setIsPaused(true);
    setplayVideo(null);
  };

  const handleVideoEnded = (videoId) => {
    axios
      .post(
        `https://react-node-project-1.onrender.com/udemy/student/updateProgress`,
        {
          userId: id,
          courseId: courseId,
          videoId: videoId,
        }
      )
      .then((response) => {
        setIsPaused(true);
      })
      .catch((error) => {
        setIsPaused(true);
        console.error("Error updating video status:", error);
      });
  };

  const handleDownload = () => {
    navigate(`/download/certificate/${courseId}/${id}`);
  };

  const goHome = () => {
    navigate(`/students/dashboard/${id}`);
  };

  const handlePlay = (videoId) => {
    setIsPaused(false);
    const url = `https://react-node-project-1.onrender.com/udemy/student/isWatched`;

    axios
      .post(url, { userId: id, courseId: courseId, videoId: videoId })
      .then((response) => {
        if (response.data.watched) {
          setStatusText("Video has been watched");
        } else {
          setStatusText("Video has not been watched");
        }
      })
      .catch((error) => {
        console.error("Error checking video status:", error);
        setStatusText("An error occurred while checking video status.");
      });
  };

  useEffect(() => {
    axios
      .post(
        "https://react-node-project-1.onrender.com/udemy/student/certification",
        {
          userId: id,
          courseId: courseId,
        }
      )
      .then((res) => {
        // console.log(res);
      });
  }, [isEligibleForDownload]);

  const certified = async (courseId) => {
    setIsChecking(true);
    try {
      const response = await axios.post(
        "https://react-node-project-1.onrender.com/udemy/student/certification",
        {
          userId: id,
          courseId: courseId,
        }
      );

      if (response.data.success) {
        // alert(response.data.message);

        if (
          response.data.status.toLowerCase() === "pending" ||
          !response.data.status
        ) {
          setcertification(
            `${response.data.message} but waiting on admin's approval`
          );
        } else if (response.data.status === "Approved") {
          setcertification(response.data.message);
          setIsEligibleForDownload(true);
        }
      } else {
        // alert(response.data.message);
        setcertification(response.data.message);
      }
      if (response.data.failed) {
        // alert(response.data.message);
        setcertification(response.data.message);
      }
    } catch (error) {
      console.error("Error checking certification:", error);
      // alert('An error occurred while checking eligibility.');
    } finally {
      setIsChecking(false);
    }
  };

  const headerChange = () => {
    const header = headerRef.current;
  };

  const showNotification = () => {
    navigate(`/notifications/${id}`);
  };

  useEffect(() => {
    window.addEventListener("scroll", headerChange);
    return () => window.removeEventListener("scroll", headerChange);
  }, []);

  return (
    <>
      <style>{`
  .course-section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 2rem 1rem;
    max-width: 900px;
    margin-left: 1rem;
    margin-right: auto;
    gap: 2rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .block {
    width: 100%;
    background-color: #fff;
    border: 1px solid #ddd;
    padding: 1rem;
    border-radius: 8px;
  }

  .section-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 0.75rem;
    color: #2d2f31;
  }

  .text-muted {
    font-size: 16px;
    color: #6a6f73;
  }

  .check-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .check-item {
    flex: 1 1 45%;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #2d2f31;
  }

  .video-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .video-item {
    border: 1px solid #ccc;
    padding: 0.75rem;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .cert-block {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn-cert {
    padding: 0.5rem 1rem;
    font-size: 16px;
    border-radius: 6px;
    border: none;
    background-color: #2d2f31;
    color: #fff;
    cursor: pointer;
    width: fit-content;
  }

  @media (max-width: 768px) {
    .course-section {
      margin: 0 auto;
      align-items: center;
    }

    .section-title {
      font-size: 18px;
    }

    .check-item,
    .video-item {
      font-size: 12px;
    }

    .btn-cert {
      font-size: 12px;
      width: 100%;
      padding: 0.5rem;
    }
  }
`}</style>

      <Dashheader
        showNotification={showNotification}
        goHome={goHome}
        notificationsCount={newNotificationCount}
      />
      <CourseHero />
      <div onScroll={headerChange} ref={subcategoryRef} className="subCategory">
        <div className="section1">
          <div className="course-section">
            {/* What you'll learn */}
            <div className="block">
              <p className="section-title">What you'll learn</p>
              <div className="check-list">
                {learn.map((item, idx) => (
                  <div className="check-item" key={idx}>
                    <span className="material-symbols-outlined">check</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Companies */}
            <div className="block">
              <p className="section-title">Top companies offer this course</p>
              <p className="text-muted">
                This course was selected for our collection of top-rated courses
                trusted by businesses worldwide.{" "}
                <span style={{ textDecoration: "underline", color: "blue" }}>
                  Learn more
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  marginTop: "1rem",
                }}
              >
                {[
                  "nasdaq-dark",
                  "volkswagen-dark",
                  "box-dark",
                  "netapp-dark",
                  "eventbrite-dark",
                ].map((name) => (
                  <img
                    key={name}
                    src={`https://s.udemycdn.com/partner-logos/v4/${name}.svg`}
                    alt={name}
                    style={{
                      width: "18%",
                      minWidth: "60px",
                      maxHeight: "40px",
                      objectFit: "contain",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Course content */}
            <div className="block">
              <p className="section-title">Course content</p>
              <p className="text-muted">
                {videos.length} {videos.length === 1 ? "Section" : "Sections"}
              </p>
              <div className="video-section">
                {videos.map((v, i) => (
                  <div
                    key={i}
                    className="video-item"
                    onClick={() => playVideo(v._id, i)}
                  >
                    <span className="material-symbols-outlined">
                      movie_info
                    </span>
                    {v.sub_title}
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="block">
              <p className="section-title">Requirements</p>
              {course.requirements?.map((req, index) => (
                <div key={index} className="check-item">
                  <span className="material-symbols-outlined">
                    check_circle
                  </span>
                  <span>{req}</span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="block">
              <p className="section-title">Description</p>
              <p className="text-muted">{course.description}</p>
            </div>

            {/* Certificate */}
            <div className="block cert-block">
              <p className="section-title">Certification</p>
              <p className="text-muted">
                Check for certification Status and download
              </p>
              <p className="text-muted">{certificationStatus}</p>
              {isEligibleForDownload ? (
                <button className="btn-cert" onClick={handleDownload}>
                  Download Certificate
                </button>
              ) : (
                <button
                  className="btn-cert"
                  onClick={() => certified(course._id)}
                  disabled={isChecking}
                >
                  {isChecking ? "Checking..." : "Check"}
                </button>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {playvideo && (
        <VideoPlayer
          videoUrl={playvideo}
          onClose={stop}
          onPlayPause={playPauseVideo}
          onNext={next}
          onPrev={prev}
          isPaused={isPaused}
          videoElementRef={videoElementRef}
          statusText={statusText}
        />
      )}
    </>
  );
};

export default Subcategory;
