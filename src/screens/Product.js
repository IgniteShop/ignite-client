import React from "react";
import "./Product.css";

function Product() {
  return (
    <div className="flex h-full w-full items-center pt-14 justify-center">
      {/* Content */}
      <div className="flex mainStats">
        {/* Image */}
        <div className="flex">
          <div className="flex product__image">
            <img
              src="https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Product"
            />
          </div>
        </div>
        {/* Info */}
        <div className="flex flex-col justify-between info">
          {/* Title, Select, Size Buttons */}
          <div className="flex flex-col">
            {/* Title */}
            <div className="flex title">
              <h1 className="text-4xl">Joyous Blue Cocoa</h1>
            </div>
            {/* Select */}
            <div className="flex mt-5 select">
              <div className="dropdown inline-block relative w-full">
                <button className="text-gray-700 py-2 px-4 rounded inline-flex items-center w-full bg-white">
                  <div className="flex select w-full">
                    <div className="flex w-full items-center">
                      <span className="w-full text-left">Select</span>
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                      </svg>
                    </div>
                  </div>
                </button>
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full">
                  <li className="option">
                    <li className="rounded-t hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                      Canvas
                    </li>
                  </li>
                  <li className="option">
                    <li className="hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                      Mug
                    </li>
                  </li>
                  <li className="option">
                    <li className="rounded-b hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">
                      Shirt
                    </li>
                  </li>
                </ul>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex mt-5 justify-between size-button">
              <button className="padding-x-30">S</button>
              <button className="padding-x-30">M</button>
              <button className="padding-x-30">L</button>
              <button className="padding-x-30">XL</button>
            </div>
          </div>
          {/* Price Title, Price, Add to Cart */}
          <div className="flex flex-col">
            {/* Price Title */}
            <div className="flex price__title">
              <h1 className="text-2xl">Price</h1>
            </div>
            {/* Price */}
            <div className="flex margin-top-10 price__tag">
              <h1 className="text-2xl">$999.99</h1>
            </div>
            {/* Add to Cart Button */}
            <div className="flex margin-top-10 mb-5 cart__button">
              <button className="flex text-center px-10 py-2 hover:bg-indigo-700">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
