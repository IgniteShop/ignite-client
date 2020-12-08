import React, { Suspense ,useState , useEffect } from "react";
import "./Cart.css";
import { Link } from "react-router-dom";
import SoloCart from "../img/SoloCart.svg";
import ItemCheckout from "../components/ItemCheckout";
import firebase from "firebase";
require("firebase/firestore")
require ('firebase/auth')

function Cart() {
  //Getting User ID
  let [userFB,setUserFB] =useState("")
  //Getting Cart Items
  let [CartItems, setCartItems] = useState(undefined);
  let [total, setTotal] = useState(0);
  
  let Userdata = ""

  // TODO: Cambiar por contexto de usuario
  useEffect(()=>{
    function GetUser() {
      firebase.auth().onAuthStateChanged(function(user){
        if(user){     
          Userdata = user.uid
          setUserFB(Userdata)
        }}
      );
    }
    GetUser();
  },[])


  useEffect(()=> {
    if(userFB){
      var db = firebase.firestore();

      let cartData = db.collection("cart").doc(userFB);
      
      cartData.get().then((cart) => {
        setCartItems(cart.data()['items']);
        setTotal(cart.data()['total']);
      });
    }

  }, [userFB]);

  const deleteItem = "pee";

  if(CartItems == undefined || total == undefined){
    return (
      <div className="fit-cart flex flex-col">
        <div className="flex w-screen flex-col h-full align-center">
          {/* Title */}
          <div className="w-screen flex justify-center titleBar">
            <h1 className="text-4xl text-center">Cart</h1>
          </div>
          <div className="flex items-center justify-center flex-col h-full">
          {/* Image */}
            <div className="flex justify-center cart__image">
              <img className="flex rounded-t-xl" src={SoloCart} alt="Solo Cart" />
            </div>
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
      </div>
    );
  } else {
    return (
      <div className="fit-cart flex flex-col">
        <div className="flex flex-row h-full w-screen">
          {/* Final Items */}
          <div className="flex flex-col h-full w-9/12 p-5 final__items">
            <React.Fragment >
              {
                CartItems.map((item)=>
                  <ItemCheckout 
                    key = {item['name']}
                    id = {item['name']}
                    title={item['name']}
                    image={`${item['user']}/${item['name']}.jpg`}
                    price={`$${item['price']}`}
                />)
              }
            </React.Fragment>
          </div>
          {/* Checkout */}
          <div className="h-full w-3/12 checkout__main">
            <div className="flex flex-col checkout__content shadow-lg">
              {/* Total & Price */}
              <div className="flex flex-row justify-between total items-center">
                  <h1 className="text-2xl">Total</h1>
                  <h1 className="text-lg total__price">{`$${total}`}</h1>
              </div>
              {/* Checkout Button */}
              <div className="flex justify-center checkout__button">
                <button>Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
