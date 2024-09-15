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
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Failed to fetch user data");
      });

    fetchCourse();
  }, [courseId, id]);

  const componentProps = {
    email: userData.email || '', // Ensure email is defined
    amount: video.price * 100, // amount in kobo (e.g., 1000 kobo = 10 Naira)
    reference: (new Date()).getTime().toString(),
    metadata: {
      name: userData.username || '',
      userId: id,
    },
    publicKey: 'pk_test_6dbb10e57606b65e31e7be9d5ab4e13b3e5f74e1', // Replace with your actual public key
    text: "Course payment",
    onSuccess: (reference) => {
      console.log('Payment successful! Reference:', reference);
      axios.post('http://localhost:5009/udemy/student/payment', {
        reference: reference,
        courseTitle: course.title,
        courseId: course._id,
        userId: id,
      }).then((res) => {
        if (res.data.success) {
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
