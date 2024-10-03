import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PaystackButton } from "react-paystack";

const Subcat = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [video, setVideo] = useState({});
  const [previewVideo, setPreviewVideo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedId = localStorage.getItem("id");
  const id = JSON.parse(storedId);
  const [userData, setUserData] = useState({});
  const [paidvideo, setPaidVideo] = useState([]);
  const [paidvideoId, setPaidVideoId] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `https://react-node-project-1.onrender.com/courses/course/${courseId}`
        );
        setCourse(response.data);
        setVideo(response.data);
        setPreviewVideo(response.data.previewVideo);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch course data");
        setLoading(false);
      }
    };

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
          toast.error("Course fetching failed");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch paid courses. Please try again later.");
      });

    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/getdata/id/${id}`
      )
      .then((res) => {
        setUserData(res.data);
        setLoading(true);
      })
      .catch((error) => {
        console.log("Error:", error);
        setLoading(false);
        toast.error("Failed to fetch user data");
      });

    fetchCourse();
  }, [courseId, id]);

  // console.log('Fetched course IDs:', paidvideoId);

  const componentProps = {
    email: userData.email || "",
    amount: video.price * 100,
    reference: new Date().getTime().toString(),
    metadata: {
      name: userData.username || "",
      userId: id,
    },
    publicKey: "pk_test_6dbb10e57606b65e31e7be9d5ab4e13b3e5f74e1",
    text: "Make payment",
    onSuccess: (reference) => {
      axios
        .post(
          "https://react-node-project-1.onrender.com/udemy/student/payment",
          {
            reference: reference,
            courseTitle: course.title,
            courseId: course._id,
            userId: id,
          }
        )
        .then((res) => {
          if (res.data) {
            toast.success("Payment successful!");
          } else {
            toast.error("Payment verification failed");
          }
        })
        .catch((error) => {
          console.error("Error verifying payment:", error.message);
          toast.error("An error occurred during payment verification");
        });
    },
    onClose: () => {
      console.log("Transaction was not completed.");
      toast.error("Transaction was not completed.");
    },
  };

  const isVideoPaid = (videoId) => {
    return paidvideoId.includes(videoId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ToastContainer />
      <div className="category3">
        <div className="videocon3">
          {previewVideo ? (
            <video src={previewVideo} controls />
          ) : (
            <p>No preview video available</p>
          )}
        </div>
        <h6>{course.title || "Course Title"}</h6>
        {isVideoPaid(video._id) ? (
          <p className="ppp">
            Congratulations!!! You are all set for the course
          </p>
        ) : (
          <PaystackButton className="paystack-button" {...componentProps} />
        )}
      </div>
    </div>
  );
};

export default Subcat;
