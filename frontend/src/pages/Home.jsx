import React, { useState, useEffect, useReducer } from "react";
import "./styles/Home.css";
import ProductCard from "../components/Cards/ProductCard";
import { ProgressBar } from "react-loader-spinner";

import Dropdown from "../components/Dropdown/Dropdown";
import axios from "axios";
import { initState, productsReducer } from "./productsReducer";
import { getApi } from "./api";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [state, dispatch] = useReducer(productsReducer, initState);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [limit, setLimit] = useState(8);
  const handleSelect = (option) => {
    setFilter(option);
    setIsOpen(false);
  };

  useEffect(() => {
    dispatch({ type: "LOADING" });
    getApi(limit, filter)
      .then((result) => {
        dispatch({ type: "SUCCESS", payload: result?.data });
      })
      .catch((err) => {
        dispatch({ type: "ERROR" });
        throw new Error("invalid action type");
      });
  }, [filter]);
  console.log(state);
  return (
    <div className="home-page">
      <Navbar />
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
              <h2>Our Products</h2>
            </div>
          </div>
          <div className="filter-cont" onClick={() => setIsOpen(!isOpen)}>
            <div className="filter-button">
              <svg
                width="20"
                height="20"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.08203 1.25391C1.27344 0.871094 1.65625 0.625 2.09375 0.625H13.9062C14.3164 0.625 14.6992 0.871094 14.8906 1.25391C15.0547 1.63672 15 2.10156 14.7266 2.42969L9.75 8.52734V12C9.75 12.3555 9.55859 12.6562 9.25781 12.793C8.95703 12.9297 8.60156 12.9023 8.32812 12.7109L6.57812 11.3984C6.35938 11.2344 6.25 10.9883 6.25 10.6875V8.52734L1.24609 2.42969C0.972656 2.10156 0.917969 1.63672 1.08203 1.25391Z"
                  fill="white"
                />
              </svg>
              Filter
            </div>
            {isOpen && <Dropdown handleSelect={handleSelect} />}
          </div>
          {/* {isOpen && <Dropdown handleSelect={handleSelect} />} */}
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
        <div>
          <Link to="/allProducts" style={{ textDecoration: "none" }}>
            All Products &nbsp;&gt;&gt;&gt;
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
