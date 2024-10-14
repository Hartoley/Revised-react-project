import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Header from "./Header";
import Dashheader from "./Dashheader";
import Subheader from "./Subheader";
import Body1 from "./Body1";
import Footer from "./Footer";
import "./subcategory.css";
import { useNavigate } from "react-router-dom";
import Bigvideobox from "./Bigvideobox";

const Studentsdash = () => {
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(true);
  const [realadmin, setrealadmin] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://react-node-project-1.onrender.com/udemy/student/getdata/id/${id}`
      )
      .then((res) => {
        // console.log(res.data);
        setrealadmin(Object.values(res.data));
        // console.log(realadmin);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const studentId = id;
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
  }, [id]);

  const newNotificationCount = notifications.length;

  localStorage.setItem("id", JSON.stringify(id));
  const showNotification = () => {
    navigate(`/notifications/${id}`);
  };

  return (
    <>
      <Dashheader
        showNotification={showNotification}
        notificationsCount={newNotificationCount}
      ></Dashheader>
      <Subheader></Subheader>
      {/* <p>{realadmin[1]}</p> */}
      <Body1></Body1>
      <Bigvideobox
        viewed="Because you viewed “"
        vspan="DevOps Beginners to Advanced with Projects"
        extra="”"
      />

      <Footer></Footer>
    </>
  );
};

export default Studentsdash;
