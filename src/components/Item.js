import React from "react";
import "./Item.css";

function Item({ id, title, image }) {
  return (
    <div className="item">
      <div className="item__image">
        <img src={image} alt="" />
      </div>
      <div className="item__title flex">
        <p>{title}</p>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default Item;