import React from "react";
import { StorageImage } from "reactfire";

function Item({ id, title, image }) {
  console.log(image);
  return (
    <div className="shadow-lg w-56 h-auto flex bg-white flex-col m-3 rounded-xl">
      <div className="w-56 h-56 rounded-t-xl">
        <StorageImage className="rounded-t-xl" storagePath={image}/>
      </div>
      <div className="px-5 py-3 flex flex-col justify-center items-center">
        <p className="text-xs text-black truncate">{title}</p>
        <div className="flex flex-row justify-around w-full mt-2">
          <button className="text-xs bg-indigo-600 px-2 py-1 text-white rounded-md w-7/12">Add to cart</button>
          <button className="text-xs bg-green-600 px-2 py-1 text-white rounded-md w-4/12">View</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
