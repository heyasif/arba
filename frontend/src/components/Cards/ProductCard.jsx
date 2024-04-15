import React from "react";
import "./ProductCard.css";
import Placeholder from "../../assets/placeholder.png";


const ProductCard = ({item}) => {
  return (
    <div key={item.id} className="product-card">
      <div className="prod-image-cont">
        <img src={item.image ? item.image : Placeholder} />
        
      </div>
      
      <div>
        <div className="product-title">
          <h6>{item.title}</h6>
        </div>
        <div className="product-row">
          <p className="product-category">{item.description}</p>
          <p className="product-price">Rs:{item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
