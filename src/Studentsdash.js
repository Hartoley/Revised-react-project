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
import Bigvideobox from "./Bigvideobox";

const Studentsdash = () => {
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(true);
  const [realadmin, setrealadmin] = useState({});
  const { id } = useParams();

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

  localStorage.setItem("id", JSON.stringify(id));

  return (
    <>
      <Dashheader></Dashheader>
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
