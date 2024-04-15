import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { useNavigate } from "react-router-dom";
import Toaster from "../components/Toaster";
import "./styles/RegistrationForm.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be at least 3 characters"),
    }),

    onSubmit: async ({ email, password }) => {
      try {
        const response = await axios.post(
          "https://arba-s1ny.onrender.com/user/login",
          {
            email,
            password,
          }
        );
        localStorage.setItem("user", JSON.stringify(response.data));
        Toaster.success("User logged in successfully");
        formik.resetForm();
        navigate("/home");
      } catch (error) {
        console.error("Error:", error);
        const errorMessage =
          error?.response?.data?.error ||
          "An error occurred. Please try again.";
        Toaster.error(errorMessage);
      }
    },
  });
  return (
    <div className="reg-container">
      <div className="main">
        <div className="image-cont"></div>
        <div className="form-cont">
          <div className="header-cont">
            <h2>Login</h2>
            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-box">
                  <input
                    id="email"
                    type="text"
                    placeholder="you@domain.com"
                    {...formik.getFieldProps("email")}
                  />
                </div>
              </div>
              {formik.touched.email && formik.errors.email ? (
                <div className="error-text">{formik.errors.email}</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    {...formik.getFieldProps("password")}
                  />
                </div>
              </div>
              {formik.touched.password && formik.errors.password ? (
                <div className="error-text">{formik.errors.password}</div>
              ) : null}
              <button className="fullWidthBtn" type="submit">
                Login
              </button>
              <div className="text-center">
                <p>
                  Not Registered?{" "}
                  <a
                    href="#!"
                    className="text-decoration-none"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Signup
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
