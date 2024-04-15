import React from "react";
import { Route, Routes } from "react-router-dom";
import RegistrationForm from "../pages/RegistrationForm";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Profile from "../pages/Profile";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<RegistrationForm />} />
      <Route path="/login" index element={<Login />} />
      <Route path="/home" index element={<Home />} />
      <Route path="/allProducts" index element={<AllProducts />} />
      <Route path="/profile" index element={<Profile />} />
    </Routes>
  );
};

export default AllRoutes;
