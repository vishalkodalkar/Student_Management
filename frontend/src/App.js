import { Routes, Route } from "react-router-dom";

/* Guest Layout */
import GuestLayout from "./componants/guestLayout/GuestLayout";
import Home from "./componants/guestLayout/Home";
import About from "./componants/guestLayout/About";
import Contact from "./componants/guestLayout/Contact";
import Login from "./componants/guestLayout/Login";
import Register from "./componants/guestLayout/Register";

/* Admin Layout */
import AdminLayout from "./componants/adminLayout/AdminLayout";
import AdminDashboard from "./componants/adminLayout/AdminDashboard";
import AdminProfile from "./componants/adminLayout/AdminProfile";
import AdminHome from "./componants/adminLayout/AdminHome";
import AdminLogout from "./componants/adminLayout/AdminLogout";
import AdminMessages  from "./componants/adminLayout/AdminMessages";
import AdminReport from "./componants/adminLayout/AdminReport";
import AdminStudentManagement from "./componants/adminLayout/AdminStudentManagement";


/* Student Layout*/
import UserLayout from "./componants/userLayout/UserLayout";
import UserHome from "./componants/userLayout/UserHome";
import UserDashboard from "./componants/userLayout/UserDashboard";
import UserProfile from "./componants/userLayout/UserProfile";
import UserLogout from "./componants/userLayout/UserLogout";
import UserCourse from "./componants/userLayout/UserCourse";
 



function App() {
  return (
      <Routes>
        {/* ================= GUEST ROUTES ================= */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/studentmanagement" element={<AdminStudentManagement/>} />
          <Route path="/admin/report" element={<AdminReport />} />
           <Route path="/admin/logout" element={<AdminLogout />} />
        </Route>

         {/*==========Student Routes=====*/}
 <Route path="/user" element={<UserLayout />}>
          <Route path="/user/home" element={<UserHome />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/course" element={<UserCourse />} />
           <Route path="/user/logout" element={<UserLogout />} />
        </Route>

      </Routes>
  );
}


export default App;
