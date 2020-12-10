import React, { Suspense, useEffect, useState } from "react";
import "./Shop.css";
import ProductContainer from "../components/ProductContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import 'firebase/database';
import TimeLeft from "../components/TimeLeft";
import Loader from '../components/Loader';


function Shop() {
  const [ searchterm, setSearchterm ] = useState(undefined);
  const [ productType, setProductType ] = useState("Canvas");

  return (
    <div className="flex flex-col mb-4 pt-20 h-full justify-center items-center">
      {/* Shop Title and Search Bar */}
      <div className="block flex w-screen flex-col justify-center">
        {/* Title */}
        <div className="w-screen flex justify-center titleBar">
          <h1 className="text-3xl text-center text-indigo-600">Shop</h1>
        </div>
        {/* Search Bar */}
        <div className="w-screen flex justify-center mb-1">
        <input className="w-1/2 h-11 font-normal px-3 py-2 text-gray-600 rounded-3xl border-gray-50 border-solid border-2" placeholder="Search" onChange={(event) => setSearchterm(event.target.value)}></input>
        </div>
      </div>
      {/* Warning Sign */}
      <div className="flex w-screen justify-center">
        <TimeLeft/>
      </div>
      <div className="h-full overflow-x-auto flex main w-screen bg-gray-50 px-12 justify-around">
      
        {/* Content */}
        <Suspense fallback={<Loader type={"bubbles"} color={"#5a67d8"}/>} className="flex justify-center align-center">
          <div className="flex w-9/12 justify-around py-4">
            {/* Main Content */}
            <ProductContainer searchTerm={searchterm} productType={productType}/>
          </div>
        </Suspense>
        {/* Preview */}
        <div className="w-2/12 background">
          <div className="bg-white flex flex-col p-6 rounded-2xl items-center">
            {/* Preview Title */}
            <div className="mb-4 text-center">
              <h1>Preview</h1>
            </div>
            {/* Preview Dropdown */}
            <div className="w-full dropdown__main mb-1">
              <div className="dropdown inline-block relative w-full">
                <button className="text-gray-700 py-2 px-2 rounded inline-flex items-center w-full">
                  <div className="flex select w-full">
                    <div className="flex w-full items-center text-indigo-600">
                      <span className="w-full text-center">{productType}</span>      
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
                <ul className="dropdown-menu absolute hidden text-gray-700 pt-1 w-full text-indigo-600 text-center">
                  <li>
                    <span className="rounded-t-xl cursor-pointer hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap border-2 border-solid border-blue-700 bg-white -mt-1" onClick={() => {
                      setProductType("Canvas")}}>
                      Canvas
                    </span>
                  </li>
                  <li>
                    <span className="hover:bg-gray-300 cursor-pointer py-2 px-4 block whitespace-no-wrap border-2 border-solid border-blue-700 bg-white -mt-1" onClick={() => {
                      setProductType("Mug")}}>
                      Mug
                    </span>
                  </li>
                  <li>
                    <span className="rounded-b-xl cursor-pointer hover:bg-gray-300 py-2 px-4 block whitespace-no-wrap border-2 border-solid border-blue-700 bg-white -mt-1" onClick={() => {
                      setProductType("Shirt")}}>
                      Shirt
                    </span>
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
