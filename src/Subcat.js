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
  const storedId = localStorage.getItem('id');
  const id = JSON.parse(storedId);
  const [userData, setUserData] = useState({});
  const [paidvideo, setpaidvideo] = useState([]);
  const [paidvideoId, setpaidvideoId] = useState([])

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5009/courses/course/${courseId}`);
        setCourse(response.data);
        setVideo(response.data);
        setPreviewVideo(response.data.previewVideo);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch course data");
        toast.error("Failed to fetch course data");
        setLoading(false);
      }
    };

    axios.get(`http://localhost:5009/udemy/student/paidCourses/id/${id}`)
    .then((res) => {
      if (res.data) {
        setpaidvideo(res.data)
        const ids = res.data.map(course => course._id); 
          setpaidvideoId(ids);
          console.log('Fetched courses', res.data);
          toast.success("Course fetching successful!");
      } else {
        toast.error("course fetching failed");
      }
    }).catch((err) => {
      console.error(err);
      toast.error("Failed to fetch paid courses. Please try again later.");
    })

    console.log(paidvideoId);
    

    axios.get(`http://localhost:5009/udemy/student/getdata/id/${id}`)
    .then((res) => {
      // console.log('Fetched Data:', res.data); 
      setUserData(res.data);
      setLoading(true);
    }).catch((error) => {
      console.log('Error:', error);
      setLoading(false);
      toast.error("Failed to fetch user data");
    });
  
  fetchCourse();
  
  }, [courseId, id]);
  // console.log(id);
  

  const componentProps = {
    email: userData.email || '', 
    amount: video.price * 100, 
    reference: (new Date()).getTime().toString(),
    metadata: {
      name: userData.username || '',
      userId: id,
    },
    publicKey: 'pk_test_6dbb10e57606b65e31e7be9d5ab4e13b3e5f74e1', 
    text: "Course payment",
    onSuccess: (reference) => {
      axios.post('http://localhost:5009/udemy/student/payment', {
        reference: reference,
        courseTitle: course.title,
        courseId: course._id,
        userId: id,
      }).then((res) => {
        if (res.data) {
          toast.success("Payment successful!");
        } else {
          toast.error("Payment verification failed");
        }
      }).catch((error) => {
        console.error("Error verifying payment:", error.message);
        toast.error("An error occurred during payment verification");
      });
    },
    onClose: () => {
      console.log('Transaction was not completed.');
      toast.error("Transaction was not completed.");
    },
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
        <h1>{course.title || "Course Title"}</h1>
        <PaystackButton className="paystack-button" {...componentProps} />
      </div>
    </div>
  );
};

export default Subcat;
