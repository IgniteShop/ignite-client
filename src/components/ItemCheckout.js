import React, { useState, useEffect } from "react";
import "./ItemCheckout.css";
import 'firebase/database';
import firebase from "firebase";

function ItemCheckout({ id, title, image, price }) {
  let storage = firebase.storage();
  let [itemURL, setItemURL] = useState(undefined);

  useEffect(() => {
    let pathReference = storage.ref(`IA_imgs/${image}`).getDownloadURL().then((url) => {
      setItemURL(url);
    });
  }, []);

  return (
    <div className="item ml-24 shadow-lg" key={id} >
      {/* Info */}
      <div className="flex ml-4">
        {/* Image */}
        <div className="item__image shadow-md">
          <img src={itemURL} alt="" />
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
        <button className="edit w-32 h-8">Edit</button>
        <button className="delete w-32 h-8 mt-2">Delete</button>
      </div>
    </div>
  );
}

export default ItemCheckout;
