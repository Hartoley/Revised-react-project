import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admidash.css";

const Uploadvideo = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const loadingToastRef = useRef(false);
  const storedadminId = localStorage.getItem("adminId");
  const navigate = useNavigate();
  const adminId = JSON.parse(storedadminId);

  useEffect(() => {
    const container = document.querySelector(".container");
    container?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    if (loading) {
      if (!loadingToastRef.current) {
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
      formData.append("sub_title", values.sub_title);
      formData.append("video_url", values.video_url);
      axios
        .post(
          `https://react-node-project-1.onrender.com/courses/upload/video/${courseId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          console.log("Video upload successful:", res.data);
          toast.dismiss();
          toast.success("Course uploaded successfully!");
          setTimeout(() => {
            navigate(`/admindashboard/${adminId}`);
          }, 5000);
        })
        .catch((err) => {
          setLoading(false);
          console.error("Video upload failed:", err);
          toast.dismiss();
          toast.error("Failed to upload video!");
        });
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue("video_url", event.currentTarget.files[0]);
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Add New Course Video</h1>
        <form
          onSubmit={formik.handleSubmit}
          encType="multipart/form-data"
          className="border p-4 rounded bg-light shadow-sm"
        >
          <div className="mb-3">
            <label htmlFor="sub_title" className="form-label">
              Video Title
            </label>
            <input
              className="form-control"
              id="sub_title"
              name="sub_title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.sub_title}
              placeholder="Enter video title"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Select Video File</label>
            <input
              className="form-control"
              type="file"
              name="video_url"
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-primary w-auto"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Add Video"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default Uploadvideo;
