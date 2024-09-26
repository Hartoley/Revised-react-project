import React, { useEffect,useRef, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './admidash.css';

const Uploadvideo = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const loadingToastRef = useRef(false);

  useEffect(() => {
    if (loading) {
      if (!loadingToastRef.current) {
        toast.info("Processing request...");
        // loadingToastRef.current = true; 
      }
    } else {
      loadingToastRef.current = false; 
    }
  }, [loading]);

  useEffect(() => {
    console.log(courseId);
  }, [courseId]);

  const formik = useFormik({
    initialValues: {
      sub_title: "",
      video_url: null,
    },
    onSubmit: (values) => {
      toast.loading("Uploading video...");
      const formData = new FormData();
      formData.append('sub_title', values.sub_title);
      formData.append('video_url', values.video_url);
      setLoading(true);
      axios.post(`https://react-node-project-1.onrender.com/courses/upload/video/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          setLoading(false);
          console.log("Video upload successful:", res.data);
          toast.dismiss();
          toast.success("Course uploaded successfully!");
        })
        .catch((err) => {
          setLoading(false);
          console.error("Video upload failed:", err);
          toast.dismiss();
          toast.error("Failed to upload video!");
        });
    }
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('video_url', event.currentTarget.files[0]);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <p>Video title</p>
        <input 
          name='sub_title' 
          type="text" 
          onChange={formik.handleChange} 
          value={formik.values.sub_title} 
        />

        <h4>Drop video</h4>
        <input 
          type="file" 
          name="video_url" 
          accept="video/*" 
          onChange={handleFileChange} 
        />
    
    
        <button type="submit">
          Add Video
        </button>
      </form>

     
      <ToastContainer />
    </>
  );
};

export default Uploadvideo;
