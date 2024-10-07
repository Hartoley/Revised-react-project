import React, { useEffect, useState } from "react";
import { Table, Container, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import Adminheader from "./AdminHeader";
import Footer from "./Footer";

const StudentList = () => {
  const { id } = useParams(); // assuming you're getting student ID from URL params
  const [studentsdata, setstudentsdata] = useState(null); // Set to null initially
  const [noProgressCourses, setNoProgressCourses] = useState([]); // Initialize as empty array
  const [paidCourses, setPaidCourses] = useState([]); // Initialize as empty array

  // Fetch student data
  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/data/id/${id}`
      )
      .then((res) => {
        console.log(res.data);
        setstudentsdata(res.data.studentDetails);
        setNoProgressCourses(res.data.coursesWithNoProgress || []); // Ensure it's an array
        setPaidCourses(res.data.paidCourses || []); // Ensure it's an array
      })
      .catch((err) => {
        console.error("Failed to fetch student data:", err);
      });
  }, [id]);

  console.log("Student ID:", id);
  console.log(studentsdata);

  return (
    <>
      <Adminheader />
      <div className="h-50"></div>
      <Container className="mt-5">
        <h2 className="mb-4 text-center">
          Student: {studentsdata ? studentsdata.username : "Loading..."}
        </h2>

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
