import React, { useState, useEffect, useReducer } from "react";
import "./styles/Home.css";
import ProductCard from "../components/Cards/ProductCard";
import { ProgressBar } from "react-loader-spinner";
import { initState, productsReducer } from "./productsReducer";
import { getApi } from "./api";
import Navbar from "../components/Navbar";

const AllProducts = () => {
  const [state, dispatch] = useReducer(productsReducer, initState);
  useEffect(() => {
    dispatch({ type: "LOADING" });
    getApi()
      .then((result) => {
        dispatch({ type: "SUCCESS", payload: result?.data });
      })
      .catch((err) => {
        dispatch({ type: "ERROR" });
        throw new Error("invalid action type");
      });
  }, []);
  return (
    <div className="home-page">
      <Navbar/>
      <div className="submenu">
        {state?.loading ? (
          <ProgressBar
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          ""
        )}
      </div>

      <section className="products-section">
        <div className="products-container">
          <div className="title-cont">
            <div className="title">
              <h2>All Products</h2>
            </div>
          </div>

          <div className="products-list">
            {Array.isArray(state.res) ? (
              state.res.map((item) => {
                return <ProductCard item={item} />;
              })
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </section>

      
    </div>
  )
}

export default AllProducts