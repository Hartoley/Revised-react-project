import React, { useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './admidash.css';

const Updatecourse = () => {
  const { courseId } = useParams();

  useEffect(() => {
    axios.get(`https://react-node-project-1.onrender.com/courses/course/${courseId}`)
      .then((res) => {
        
      })
      .catch((err) => {
        console.error("Video upload failed:", err);
        toast.error("Failed to upload video!");
      });
  
    console.log(courseId);
  }, [courseId]);

  const formik = useFormik({
    initialValues: {
      search:"",
      value:""
    },
    onSubmit: (values) => {
        console.log(values);
      axios.post(`https://react-node-project-1.onrender.com/courses/update/course/${courseId}`, values)
        .then((res) => {
            
          console.log("Course updated successfully:", res.data);
          toast.success("Course updated successfully!");
        })
        .catch((err) => {
            console.log(courseId);
          console.error("Course update failed:", err);
          toast.error("Failed to update Course!");
        });
    }
  });



  return (
    <>
      <form action="" onSubmit={formik.handleSubmit}>
            <h3>This is the key to updating contents</h3>
            <h4>
            language,
            sub_language,
            category,
            sub_category,
            createdBy,
            learn,
            requirements,
            </h4>
          <input required type="text" onChange={formik.handleChange} name='search' placeholder='Type the name of the field you want to update'/>
          <input required type="text" onChange={formik.handleChange} name='value' placeholder='Drop content' />
          <button type='submit'>Update field</button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Updatecourse;
