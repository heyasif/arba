import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toaster from "../components/Toaster";
import "./styles/Profile.css";
import Navbar from "../components/Navbar";
import axios from "axios";

const Profile = () => {
  let data = JSON.parse(localStorage.getItem("user"));
  const userId = data._id;
  const formik = useFormik({
    initialValues: {
      fullName: "",
      avatar: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string(),
      avatar: Yup.string(),
      password: Yup.string().min(3, "Password must be at least 3 characters"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords must match"
      ),
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
        const authToken = data.token;
        await axios.patch(`https://arba-s1ny.onrender.com/user/${userId}`, {
          fullName,
          avatar,
          password,
        });
        Toaster.success("User updated successfully.");
        // formik.resetForm();
      } catch (error) {
        console.error("Error:", error);
        Toaster.error("User Updation Failed");
      }
    },
  });
  return (
    <div className="profile-form-cont">
      <Navbar />
      <div className="update-cont">
        <h2>Update User</h2>
        <div className="updt-form">
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
              <label htmlFor="url">Avatar</label>
              <div className="input-box">
                <input
                  type="url"
                  placeholder="Enter Avatar URL"
                  {...formik.getFieldProps("avatar")}
                />
              </div>
            </div>
            {formik.touched.avatar && formik.errors.avatar ? (
              <div className="error-text">{formik.errors.avatar}</div>
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
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="error-text">{formik.errors.confirmPassword}</div>
            ) : null}

            <button className="fullWidthBtn" type="submit">
              Update User
            </button>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Profile;
