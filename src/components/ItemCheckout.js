import React from "react";
import "./ItemCheckout.css";

function ItemCheckout({ id, title, image, price }) {
  return (
    <div className="item ml-24">
      {/* Info */}
      <div className="flex ml-5">
        {/* Image */}
        <div className="item__image">
          <img src={image} alt="" />
        </div>
        {/* Title & Price */}
        <div className="flex flex-col ml-5">
          {/* Title */}
          <div className="flex title mt-2">
            <h1 className="text-2xl">{title}</h1>
          </div>
          {/* Price */}
          <div className="flex price">
            <h3 className="text-xl">{price}</h3>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col m-10 botones">
        <button className="edit">Edit</button>
        <button className="delete mt-2">Delete</button>
      </div>
    </div>
  );
}

export default ItemCheckout;
