import React from "react";
import "./ItemAccount.css";
import Dots from "../img/dots.png";

function ItemAccount({ id, title, image }) {
  return (
    <div className="itemAccount shadow-lg ">
      <div className="itemAccount__imageSingle">
        <img src={image} alt="" />
        <span className="dots"><img className="flex" src={Dots} alt="Dots" /></span>
      </div>
    </div>
  );
}

export default ItemAccount;
