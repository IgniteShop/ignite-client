import React from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import SoloCart from "../img/SoloCart.svg";
import ItemCheckout from "../components/ItemCheckout";

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
        {/* <div className="flex items-center justify-center flex-col h-full"> */}
        {/* Image */}
        {/* <div className="flex justify-center cart__image"> */}
        {/* <img className="flex" src={SoloCart} alt="Solo Cart" /> */}
        {/* </div> */}
        {/* Description */}
        {/* <div className="flex flex-col text-center description mt-5"> */}
        {/* <h1 className="text-2xl">There are no items in your cart</h1> */}
        {/* <h3> */}
        {/* You can buy products at the shop or generate your own design to */}
        {/* create a new product */}
        {/* </h3> */}
        {/* </div> */}
        {/* </div> */}
        {/* --------- END NO ITEMS CART --------- */}

        {/* --------- ITEMS CART --------- */}
        <div className="flex flex-row h-full w-screen">
          {/* Final Items */}
          <div className="flex flex-col h-full w-9/12 p-5 final__items">
            <ItemCheckout
              id="1"
              title={"Joyous Blue Cocoa"}
              image={
                "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              price={"$999.99"}
            />
            <ItemCheckout
              id="1"
              title={"Joyous Blue Cocoa"}
              image={
                "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              price={"$999.99"}
            />
            <ItemCheckout
              id="1"
              title={"Joyous Blue Cocoa"}
              image={
                "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              price={"$999.99"}
            />
            <ItemCheckout
              id="1"
              title={"Joyous Blue Cocoa"}
              image={
                "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              price={"$999.99"}
            />
            <ItemCheckout
              id="1"
              title={"Joyous Blue Cocoa"}
              image={
                "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              price={"$999.99"}
            />
            <ItemCheckout
              id="1"
              title={"Joyous Blue Cocoa"}
              image={
                "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              price={"$999.99"}
            />
            <ItemCheckout
              id="1"
              title={"Joyous Blue Cocoa"}
              image={
                "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              }
              price={"$999.99"}
            />
          </div>
          {/* Checkout */}
          <div className="flex h-full w-3/12 checkout__main">
            <div className="flex flex-col checkout__content">
              {/* Total & Price */}
              <div className="flex flex-row justify-between total">
                  <h1 className="text-2xl">Total</h1>
                  <h1 className="text-2xl total__price">$1999.98</h1>
              </div>
              {/* Checkout Button */}
              <div className="flex justify-center checkout__button">
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </div>
        {/* --------- END NO ITEMS CART --------- */}
      </div>
    </div>
  );
}

export default Cart;
