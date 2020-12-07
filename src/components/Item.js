import React from "react";
import "./Item.css";
import { StorageImage } from "reactfire";

function Item({ id, title, image }) {
  console.log(image);
  return (
    <div className="shadow-lg w-40 flex itemSingle">
      <div className="w-40 h-40 rounded-t-xl">
        <StorageImage className="rounded-t-xl" style={{ width: '100%' }} storagePath={image}/>
      </div>
      <div className="flex">
        <p className="text-xs text-black">{title}</p>
        <button>Add to cart</button>
      </div>
    </div>
  );
}

export default Item;
