import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toaster from "../components/Toaster";
import "./styles/RegistrationForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      userName: "",
      avatar: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(
          /^[a-zA-Z]+( [a-zA-Z]+)*$/,
          "Name should not start with a number"
        )
        .required("First Name is required"),
      userName: Yup.string()
        .min(3, "User Name must be at least 3 characters long")
        .required("User Name is required"),
      avatar: Yup.string(),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(3, "Password must be at least 3 characters"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),

    onSubmit: async ({
      confirmPassword,
      fullName,
      userName,
      avatar,
      email,
      password,
    }) => {
      try {
        await axios.post("https://arba-s1ny.onrender.com/user", {
          fullName,
          userName,
          avatar,
          email,
          password,
        });
        Toaster.success("User registered successfully.");
        formik.resetForm();
        navigate("/login");
      } catch (error) {
        console.error("Error:", error);
        Toaster.error("User registration failed");
      }
    },
  });
  console.log(formData);
  return (
    <div className="reg-container">
      <div className="main">
        <div className="image-cont"></div>
        <div className="form-cont">
          <div className="header-cont">
            <h2>Create an account</h2>
            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="What should we call you?"
                    {...formik.getFieldProps("fullName")}
                  />
                </div>
              </div>
              {formik.touched.fullName && formik.errors.fullName ? (
                <div className="error-text">{formik.errors.fullName}</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="userName">User Name</label>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="User Name"
                    {...formik.getFieldProps("userName")}
                  />
                </div>
              </div>
              {formik.touched.userName && formik.errors.userName ? (
                <div className="error-text">{formik.errors.userName}</div>
              ) : null}
              {/* <div className="form-group">
                <label htmlFor="url">Avatar</label>
                <div className="input-box">
                  <input
                    type="text"
                    placeholder="Enter Avatar URL"
                    {...formik.getFieldProps("avatar")}
                  />
                </div>
              </div> */}
              {formik.touched.avatar && formik.errors.avatar ? (
                <div className="error-text">{formik.errors.avatar}</div>
              ) : null}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="input-box">
                  <input
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

              <div className="form-group">
                <label htmlFor="password">Confirm Password</label>
                <div className="input-box">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                </div>
              </div>
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error-text">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}

              <button className="fullWidthBtn" type="submit">
                Create Account
              </button>
              <div className="text-center">
                <p>
                  Already a member?{" "}
                  <a
                    href="#!"
                    className="text-decoration-none"
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Log in
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

export default RegistrationForm;
