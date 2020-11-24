import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import SoloCart from "../img/SoloCart.svg";

function Cart() {
  return (
    <div className="fit-cart flex flex-col">
      {/* Title Bar */}
      <div className="flex w-screen flex-col h-full">
        {/* Title */}
        <div className="w-screen flex justify-center titleBar">
          <h1 className="text-4xl text-center">Cart</h1>
        </div>
        {/* --------- NO ITEMS CART --------- */}
        <div className="flex items-center justify-center flex-col h-full">
          {/* Image */}
          <div className="flex justify-center cart__image">
            <img className="flex" src={SoloCart} alt="Solo Cart" />
          </div>
          {/* Description */}
          <div className="flex flex-col text-center description mt-5">
            <h1 className="text-2xl">There are no items in your cart</h1>
            <h3>
              You can buy products at the shop or generate your own design to
              create a new product
            </h3>
          </div>
        </div>
        {/* --------- END NO ITEMS CART --------- */}
      </div>
    </div>
  );
}

export default Cart;
