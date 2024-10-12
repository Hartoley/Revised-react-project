import React, { useEffect, useState, useRef } from "react";
import { Table, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Adminheader from "./AdminHeader";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StudentList = () => {
  const { id } = useParams();
  const [studentsdata, setstudentsdata] = useState(null);
  const [noProgressCourses, setNoProgressCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);
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
        console.log(res.data);
        setLoading(false);
        setstudentsdata(res.data.studentDetails);
        setNoProgressCourses(res.data.coursesWithNoProgress || []);
        setPaidCourses(res.data.paidCourses || []);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Failed to fetch student data:", err);
      });
  }, [id]);

  // console.log("Student ID:", id);
  // console.log(studentsdata);

  const handleRemoveStudent = () => {
    console.log(id);

    toast.loading("Removing student...");
    if (window.confirm("Are you sure you want to remove this student?")) {
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
        console.log(response);

        setTimeout(() => {
          // navigate(`/admindashboard/${adminId}`);
        }, 5000);
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Error approving certification:", error);
        toast.error(error.response?.data.message || "Approval failed.");
      });
  };

  const handleDecline = (courseId) => {
    toast.loading("Approving student certification...");

    axios
      .post(
        `https://react-node-project-1.onrender.com/udemy/decline/${id}/${courseId}`
      )
      .then((response) => {
        toast.dismiss();
        toast.success("Certification approved successfully!");
        console.log(response);

        setTimeout(() => {
          // navigate(`/admindashboard/${adminId}`);
        }, 5000);
      })
      .catch((error) => {
        toast.dismiss();
        console.error("Error approving certification:", error);
        toast.error(error.response?.data.message || "Approval failed.");
      });
  };

  return (
    <>
      <Adminheader />
      <div style={{ height: "11vh" }}></div>
      <Container className="mt-5">
        <h4 className="mb-4 text-center">
          Student: {studentsdata ? studentsdata.username : "Loading..."}
        </h4>

        <div className="text-center mb-4">
          <button
            className="btn btn-danger btn-lg"
            onClick={() => handleRemoveStudent()}
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
                    <th>Action</th>
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
                        (!course.status || course.status === "pending") && (
                          <>
                            <td onClick={() => handleApprove(course.courseId)}>
                              Approve
                            </td>
                            <td onClick={() => handleDecline(course.courseId)}>
                              Decline
                            </td>
                          </>
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
    </>
  );
};

export default StudentList;
