import React, { useEffect, useState, useRef } from "react";
import { Table, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Adminheader from "./AdminHeader";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const { id } = useParams();
  const [studentsdata, setstudentsdata] = useState(null);
  const [noProgressCourses, setNoProgressCourses] = useState([]);
  const storedadminId = localStorage.getItem("adminId");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const adminId = JSON.parse(storedadminId);
  const loadingToastRef = useRef(false);

  useEffect(() => {
    if (loading) {
      if (!loadingToastRef.current) {
        toast.loading("Processing data...");
        loadingToastRef.current = true;
      }
    } else {
      loadingToastRef.current = false;
    }
  }, [loading]);

  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/data/id/${id}`
      )
      .then((res) => {
        setLoading(false);
        setstudentsdata(res.data.studentDetails);
        setNoProgressCourses(res.data.coursesWithNoProgress || []);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Failed to fetch student data:", err);
      });
  }, [id]);

  const goHome = () => {
    const id = adminId;
    navigate(`/admindashboard/${id}`);
  };

  const handleRemoveStudent = () => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      toast.loading("Removing student...");
      axios
        .delete(`https://react-node-project-1.onrender.com/udemy/delete/${id}`)
        .then((response) => {
          toast.dismiss();
          toast.success("Student removed successfully!");
          if (response.status === 200) {
            setTimeout(() => {
              navigate(`/admindashboard/${adminId}`);
            }, 5000);
          }
        })
        .catch((error) => {
          toast.dismiss();
          console.error("Error removing student:", error);
          toast.error("Failed to remove the student. Please try again.");
        });
    }
  };

  const handleApprove = (courseId) => {
    toast.loading("Approving student certification...");
    axios
      .post(
        `https://react-node-project-1.onrender.com/udemy/approve/${id}/${courseId}`
      )
      .then((response) => {
        toast.dismiss();
        toast.success("Certification approved successfully!");
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Error approving certification:", error);
        toast.error(error.response?.data.message || "Approval failed.");
      });
  };

  const handleDecline = (courseId) => {
    toast.loading("Declining student certification...");
    axios
      .post(
        `https://react-node-project-1.onrender.com/udemy/decline/${id}/${courseId}`
      )
      .then((response) => {
        toast.dismiss();
        toast.success("Certification declined successfully!");
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Error declining certification:", error);
        toast.error(error.response?.data.message || "Decline failed.");
      });
  };

  return (
    <>
      <Adminheader goHome={goHome} />
      <div style={{ height: "11vh" }}></div>
      <Container className="mt-5">
        <h4 className="mb-4 text-center">
          Student: {studentsdata ? studentsdata.username : "Loading..."}
        </h4>

        <div className="text-center mb-4">
          <button
            className="btn btn-danger btn-lg"
            onClick={handleRemoveStudent}
          >
            Remove Student
          </button>
        </div>

        {noProgressCourses.length === 0 && (
          <Alert variant="info" className="text-center">
            No course available for this student.
          </Alert>
        )}

        <h3 className="mt-4">Applied Courses</h3>
        <Card className="mb-4">
          <Card.Body>
            {noProgressCourses.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Index</th>
                    <th>Course Title</th>
                    <th>Certification</th>
                    <th>Paid</th>
                    <th>Status</th>
                    {noProgressCourses.some(
                      (course) =>
                        course.certified &&
                        (!course.status ||
                          course.status.toLowerCase() === "pending")
                    ) && <th>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {noProgressCourses.map((course, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.courseTitle}</td>
                      <td>{course.certified ? "Eligible" : "Not Eligible"}</td>
                      <td>{course.paid ? "Yes" : "No"}</td>
                      <td>{course.status || "Pending"}</td>
                      {course.certified &&
                      (!course.status ||
                        course.status.toLowerCase() === "pending") ? (
                        <td>
                          <button
                            className="btn btn-success me-2"
                            onClick={() => handleApprove(course.courseId)}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDecline(course.courseId)}
                          >
                            Decline
                          </button>
                        </td>
                      ) : (
                        <td></td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center">No courses to display.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default StudentList;
