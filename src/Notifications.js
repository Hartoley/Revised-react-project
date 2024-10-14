import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dashheader from "./Dashheader";
import Footer from "./Footer";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const studentId = JSON.parse(localStorage.getItem("id"));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `https://react-node-project-1.onrender.com/students/notifications/${studentId}`
        );
        if (response.data.success) {
          setNotifications(response.data.notifications || []);
        } else {
          setError("No notifications found.");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setError("An error occurred while fetching notifications.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [studentId]);

  const newNotificationCount = notifications.length;

  const handleNotificationClick = (courseId) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.courseId !== courseId)
    );
  };

  return (
    <>
      <Dashheader notificationsCount={newNotificationCount} />
      <div style={{ height: "10vh" }}></div>
      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">Student Notifications</h2>
        <div className="card shadow">
          <div className="card-header bg-primary text-white">
            <h5>Notifications</h5>
          </div>
          <ul className="list-group list-group-flush">
            {loading ? (
              <li className="list-group-item text-center">
                Loading notifications...
              </li>
            ) : error ? (
              <li className="list-group-item text-center">{error}</li>
            ) : notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li
                  key={index}
                  className={`list-group-item d-flex justify-content-between align-items-start`}
                  onClick={() => handleNotificationClick(notification.courseId)} // Handle notification click
                >
                  <div>
                    <strong>{notification.message}</strong>
                    <p className="mb-0">Course: {notification.courseTitle}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="badge bg-secondary me-2">
                      {notification.status}
                    </span>
                    {notification.status.toLowerCase() === "approved" && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          navigate(
                            `/download/certificate/${notification.courseId}/${studentId}`
                          )
                        }
                      >
                        Download
                      </button>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center">
                No notifications at the moment.
              </li>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notifications;
