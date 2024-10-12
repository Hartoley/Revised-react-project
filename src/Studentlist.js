import React, { useEffect, useState } from "react";
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

  // Fetch student data
  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/data/id/${id}`
      )
      .then((res) => {
        console.log(res.data);
        setstudentsdata(res.data.studentDetails);
        setNoProgressCourses(res.data.coursesWithNoProgress || []);
        setPaidCourses(res.data.paidCourses || []);
      })
      .catch((err) => {
        console.error("Failed to fetch student data:", err);
      });
  }, [id]);

  console.log("Student ID:", id);
  console.log(studentsdata);

  const handleRemoveStudent = () => {
    console.log(id);

    toast.loading("Removing video...");
    if (window.confirm("Are you sure you want to remove this student?")) {
      axios
        .delete(`http://localhost:5009/udemy/delete/${id}`)
        .then((response) => {
          toast.dismiss();
          toast.success("Course uploaded successfully!");
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
                  </tr>
                </thead>
                <tbody>
                  {noProgressCourses.map((course, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{course.courseTitle}</td>
                      <td>{course.certified ? "Eligible" : "Not Eligible"}</td>
                      <td>{course.paid ? "Yes" : "No"}</td>
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
