import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function MainLayout() {
  return (
    <div className="container">
      <Navbar />
      <h1>MainLayout</h1>
      <Outlet />
    </div>
  );
}
