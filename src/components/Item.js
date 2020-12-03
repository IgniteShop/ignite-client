import React from "react";
import "./Item.css";
import { StorageImage } from "reactfire";

function Item({ id, title, image }) {
  console.log(image);
  return (
    <div className="itemSingle">
      <div className="item__imageSingle">
        <StorageImage style={{ width: '100%' }} storagePath={image}/>
      </div>
      <div className="item__title flex">
        <p>{title}</p>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default Item;
