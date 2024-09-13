import { configureStore } from "@reduxjs/toolkit";
import Adminlogins from "./Adminlogins";
import Studentsredux from "./Studentsredux";

export default configureStore({
    reducer:{
        admins: Adminlogins,
        students: Studentsredux
    }
})

