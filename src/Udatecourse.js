import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./admidash.css";

const Updatecourse = () => {
  const { courseId } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/courses/course/${courseId}`
      )
      .then((res) => {
        // Process data if needed
      })
      .catch((err) => {
        console.error("Video upload failed:", err);
        toast.error("Failed to upload video!");
      });
  }, [courseId]);

  const formik = useFormik({
    initialValues: {
      search: "",
      value: "",
    },
    onSubmit: (values) => {
      axios
        .post(
          `https://react-node-project-1.onrender.com/courses/update/course/${courseId}`,
          values
        )
        .then((res) => {
          toast.success("Course updated successfully!");
        })
        .catch((err) => {
          console.error("Course update failed:", err);
          toast.error("Failed to update Course!");
        });
    },
  });

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Update Course Details</h2>
        <p className="text-center">
          You can update the following fields: <br />
          <strong>
            language, sub_language, category, sub_category, createdBy, learn,
            requirements
          </strong>
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="border p-4 rounded bg-light shadow-sm"
        >
          <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Field to Update
            </label>
            <input
              id="search"
              name="search"
              type="text"
              className="form-control"
              placeholder="Type the name of the field you want to update"
              onChange={formik.handleChange}
              value={formik.values.search}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="value" className="form-label">
              New Value
            </label>
            <input
              id="value"
              name="value"
              type="text"
              className="form-control"
              placeholder="Drop content"
              onChange={formik.handleChange}
              value={formik.values.value}
              required
            />
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary w-auto">
              Update Field
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </>
  );
};

export default Updatecourse;
