import React, { useContext ,useState , useEffect } from "react";
import "./Cart.css";
import SoloCart from "../img/SoloCart.svg";
import ItemCheckout from "../components/ItemCheckout";
import firebase from "firebase";
import UserContext from '../UserContextProvider';
import { useHistory } from "react-router-dom";
require("firebase/firestore")
require ('firebase/auth')

function Cart() {  
  let [CartItems, setCartItems] = useState({});
  let [total, setTotal] = useState(0);
  const { user } = useContext(UserContext);  
  const history = useHistory();

  useEffect(()=> {
    if(user != {}){
      var db = firebase.firestore();

      try {
        db.collection("cart").doc(user.uid).onSnapshot((cart) => {
          setCartItems(cart.data()['items']);
          setTotal(cart.data()['total']);
  
        });
      } catch {
        history.push('login');
      }

    } else {
      history.push('login');
    }
  }, [user]);

  if(CartItems === {} || total === 0){
    return (
      <div className="fit-cart flex flex-col">
        <div className="flex w-screen flex-col h-full align-center">
          {/* Title */}
          <div className="w-screen flex justify-center titleBar">
            <h1 className="text-4xl text-center text-indigo-600">Cart</h1>
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
    let keys = Object.keys(CartItems);

    return (
      <div className="fit-cart flex flex-col pt-20">
        <div className="flex flex-row h-full w-screen">
          {/* Final Items */}
          <div className="flex flex-col h-full w-9/12 p-5 final__items">
            <React.Fragment >
              {
                keys.map((item)=>
                  <ItemCheckout 
                    key = {CartItems[item]['name']}
                    id = {CartItems[item]['name']}
                    title={CartItems[item]['name']}
                    image={`${CartItems[item]['location']}/${CartItems[item]['type'].toLowerCase()}.jpg`}
                    price={`${CartItems[item]['price']}`}
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
                <button className="w-10/12 bg-green-600 rounded-md text-white font-medium py-2 hover:bg-green-500">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
