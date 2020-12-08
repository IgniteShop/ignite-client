import React from "react";
import "./ItemCheckout.css";

import 'firebase/database';

function ItemCheckout({ id, title, image, price }) {
  return (
    <div className="item ml-24 shadow-lg border-box py-4" key={id}>
      {/* Info */}
      <div className="flex ml-4">
        {/* Image */}
        <div className="item__image shadow-md">
          <img src={image} alt="" />
        </div>
        {/* Title & Price */}
        <div className="flex flex-col ml-5">
          {/* Title */}
          <div className="flex title mt-2">
            <h1 className="text-2xl text-indigo-600">{title}</h1>
          </div>
          {/* Price */}
          <div className="flex price">
            <h3 className="text-xl">{price}</h3>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col m-10 botones">
        <button className="bg-indigo-600 rounded-md hover:bg-indigo-500 text-white font-medium w-32 h-8">Edit</button>
        <button className="bg-red-600 rounded-md hover:bg-red-500 text-white font-medium w-32 h-8 mt-2">Delete</button>
      </div>
    </div>
  );
}

export default ItemCheckout;
