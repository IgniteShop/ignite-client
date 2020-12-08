import React, { Suspense ,useState , useEffect } from "react";
import "./Cart.css";
import ItemCheckout from "../components/ItemCheckout";
import firebase from "firebase";
require("firebase/firestore")
require ('firebase/auth')
function Cart() {
  //Getting User ID
  let [userFB,setUserFB] =useState("")
  
  let Userdata = ""

  useEffect(()=>{
    function GetUser() {
    firebase.auth().onAuthStateChanged(function(user){
      if(user){
        
         Userdata = user.uid
         setUserFB(Userdata)
      }
      else{} 
    })
    
  }
  GetUser()

  
  },[])

//Getting Cart Items
  let [CartItems, setCartItems] = useState([]);
  


useEffect(()=>{
  
 
  var db = firebase.firestore();

  let cartData = db.collection("cart")
   let query = cartData.where("user_id","==",userFB)
   
   let newData = []
    
    function GetData() {query.onSnapshot(
    
  function(querySnapshot){
    querySnapshot.forEach(function(doc){
    newData.push(doc.data())
    
    })
    setCartItems(newData)
  })}
    GetData()
  
},[userFB])



  return (
    <div className="fit-cart flex flex-col pt-20">
      {/* Title Bar */}
      <div className="flex w-screen flex-col h-full">
        {/* Title */}
        <div className="w-screen flex justify-center titleBar">
          <h1 className="text-4xl text-center text-indigo-600">Cart</h1>
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
          
  
           <React.Fragment >
          <Suspense fallback={<p>Loading...</p>}>
          
        
             
           
            { CartItems.map((item,index)=>
            
            <ItemCheckout key = {item.Title}
            id = {item.Title}
            title={item.Title}
            image={
              "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
            price={"$999.99"}
            
            
          />        
             )
          }
            </Suspense>
            </React.Fragment>
            {/* <ItemCheckout
              id="145"
              title={"Joyous Blue "}
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
            /> */}
          </div>
          {/* Checkout */}
          <div className="h-full w-3/12 checkout__main">
            <div className="flex flex-col bg-white rounded-xl shadow-lg p-4 border-box justify-center">
              {/* Total & Price */}
              <div className="flex flex-row justify-around mb-2 items-center">
                  <h1 className="text-2xl">Total</h1>
                  <h1 className="text-lg total__price">$1999.98</h1>
              </div>
              {/* Checkout Button */}
              <div className="flex justify-center checkout__button">
                <button className="w-10/12 bg-green-600 rounded-md text-white font-medium py-2 hover:bg-green-500">Checkout</button>
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
