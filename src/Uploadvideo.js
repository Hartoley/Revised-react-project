import React, { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './admidash.css';

const Uploadvideo = () => {
  const { courseId } = useParams();

  useEffect(() => {
    console.log(courseId);
  }, [courseId]);

  const formik = useFormik({
    initialValues: {
      sub_title: "",
      video_url: null,
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append('sub_title', values.sub_title);
      formData.append('video_url', values.video_url);

      axios.post(`http://localhost:5009/courses/upload/video/${courseId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log("Video upload successful:", res.data);
          toast.success("Video uploaded successfully!");
        })
        .catch((err) => {
          console.error("Video upload failed:", err);
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
