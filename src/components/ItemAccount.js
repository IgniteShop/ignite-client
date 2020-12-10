import React from "react";
import "./ItemAccount.css";

function ItemAccount(props) {
  return (
    <div className="itemAccount shadow-lg">
      <div className="itemAccount__imageSingle">
        <img src={props.image} className="h-full w-auto object-cover" alt="" />
      </div>
    </div>
  );
}

export default ItemAccount;
