import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminLayout = () => (
  <>
    <AdminNavbar />
    <Outlet />
    <AdminFooter/>
  </>
);

export default AdminLayout;
