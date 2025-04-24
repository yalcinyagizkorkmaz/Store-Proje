import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Container } from "@mui/material";
export default function MainLayout() {
  return (
    <div className="container">
      <Navbar />
      <Container sx={{ padding: 2 }}>
        <Outlet />
      </Container>
    </div>
  );
}
