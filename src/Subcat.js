import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";



const Subcat = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [video, setVideo] = useState({});
  const [previewVideo, setPreviewVideo] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedId = localStorage.getItem('id');
  const id = JSON.parse(storedId);
  const [userData, setuserData] = useState ({})
  console.log(id);

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

  
      axios.get(`http://localhost:5009/udemy/student/getdata/id/${id}`)
      .then((res) =>{
        // console.log(res.data);
        setuserData(res.data)
        console.log(userData);
        setLoading(false);
      }).catch ((error) =>{
        console.log(error);
        setLoading(false);
        toast.error("Failed to fetch admin data");
      })
    

    fetchCourse();
  }, [courseId]);

  console.log(userData);

  const buyCourse = () => {
    const handler = window.PaystackPop.setup({
      key: 'pk_test_6dbb10e57606b65e31e7be9d5ab4e13b3e5f74e1', 
      email: userData.email,
      amount: video.price * 100, 
      currency: "NGN",
      ref: `ref_${Date.now()}`,
      callback: function(response) {
       
        axios.post('http://localhost:5009/udemy/student/payment', {
          reference: response.reference,
          courseTitle:course.title,
          courseId:course.id,
          userId: id,
  
        })
        .then((res) => {
          if (res.data.success) {
            toast.success("Payment successful!");
          } else {
            toast.error("Payment verification failed");
          }
        })
        .catch((error) => {
          console.error("Error verifying payment:", error);
          toast.error("An error occurred during payment verification");
        });
      },
      onClose: function() {
        toast.error("Transaction was not completed.");
      }
    });

    handler.openIframe();
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
        <button onClick={buyCourse} disabled={loading}>
          Buy Course
        </button>
      </div>
    </div>
  );
};

export default Subcat;
