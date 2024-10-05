import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const StudentList = () => {
  const { id } = useParams(); // assuming you're getting student ID from URL params
  const [studentsdata, setstudentsdata] = useState({});
  const [noProgressCourses, setNoProgressCourses] = useState([]);
  const [paidCourses, setPaidCourses] = useState([]);

  // Fetch student data
  useEffect(() => {
    axios
      .get(`http://localhost:5009/udemy/student/data/id/${id}`)
      .then((res) => {
        setstudentsdata(res.data.studentDetails);
        setNoProgressCourses(res.data.coursesWithNoProgress);
        setPaidCourses(res.data.paidCourses);
      })
      .catch((err) => {
        console.error("Failed to fetch student data:", err);
      });
  }, [id]);

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Student: {studentsdata.username}</h2>

      <h3>Courses with No Progress</h3>
      {noProgressCourses.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="thead-light">
            <tr>
              <th>Index</th>
              <th>Course Title</th>
              <th>Certified</th>
              <th>Paid</th>
            </tr>
          </thead>
          <tbody>
            {noProgressCourses.map((course, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{course.courseTitle}</td>
                <td>{course.certified ? "Yes" : "No"}</td>
                <td>{course.paid ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No courses with no progress.</p>
      )}

      <h3>Certification</h3>
      {paidCourses.length > 0 ? (
        <Table striped bordered hover responsive>
          <thead className="thead-light">
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Reference</th>
              <th>Certified</th>
            </tr>
          </thead>
          <tbody>
            {paidCourses.map((course, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{course.courseTitle}</td>
                <td>{course.Reference || "N/A"}</td>
                <td>{course.certified ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No certified courses available.</p>
      )}
    </Container>
  );
};

export default StudentList;
