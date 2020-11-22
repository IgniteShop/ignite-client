import React from "react";
import "./Product.css";

function Product({ id, title, image }) {
  return (
    <div className="product">
      <div className="product__image">
        <img src={image} alt="" />
      </div>
      <div className="product__title flex">
        <p>{title}</p>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default Product;
