import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Navbar from "../components/Nav";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Outlet/>
    </div>
  );
};

export default Home;
