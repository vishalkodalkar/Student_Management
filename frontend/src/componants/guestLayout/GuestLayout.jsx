import { Outlet } from "react-router-dom";
import GuestNavbar from "./GuestNavbar";
import GuestFooter from "./GuestFooter";

const GuestLayout = () => (
  <>
    <GuestNavbar />
    <Outlet />
    <GuestFooter/>
    </>
);

export default GuestLayout;
