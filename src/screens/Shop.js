import React, {Suspense} from "react";
import "./Shop.css";
import searchIcon from "../img/searchIcon.png";
import { Link } from "react-router-dom";
import ProductContainer from "../components/ProductContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";


function Shop() {

  return (
    <div className="fit flex flex-col mb-4">
      {/* Shop Title and Search Bar */}
      <div className="flex w-screen flex-col justify-center">
        {/* Title */}
        <div className="w-screen flex justify-center titleBar">
          <h1 className="text-4xl text-center">Shop</h1>
        </div>
        {/* Search Bar */}
        <div className="w-screen flex justify-center mb-1">
          <input className="w-1/2 search" placeholder="Search"></input>
        </div>
      </div>
      {/* Warning Sign */}
      <div className="flex w-screen justify-center mb-1">
        <div className="w-screen flex justify-center mt-1 mb-1 items-center">
          <FontAwesomeIcon className="clock-icon" icon={faClock} />
          <h3 className="ml-1 quick">Be quick! Only 3 days left!</h3>
        </div>
      </div>
      <div className="fit2 flex main w-screen background">
        {/* Content */}
        <div className="flex w-5/6">
          {/* Main Content */}
          <Suspense fallback={<p>Loading...</p>}>
            <ProductContainer/>
          </Suspense>
        </div>
        {/* Preview */}
        <div className="w-1/6 background">
          <div className="preview flex items-center">
            {/* Preview Title */}
            <div className="preview__title text-center">
              <h1>Preview</h1>
            </div>
            {/* Preview Dropdown */}
            <div className="w-full dropdown__main mb-1">
              <div className="dropdown inline-block relative w-full">
                <button className="text-gray-700 py-2 px-2 rounded inline-flex items-center w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
