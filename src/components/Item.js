import React, { useEffect, useState } from "react";
import "./Item.css";
import { StorageImage, useAuth } from "reactfire";
import "firebase/firestore"
import firebase from "firebase";

function Item({ id, title, image, productType }) {
  const db = firebase.firestore();
  // TODO: remplazar con contexto de usuario
  const auth = useAuth();
  const [userID, setUserID] = useState(undefined);

  useEffect(() => {
    setUserID(auth.currentUser.uid);
  }, []);

  const addToCart = async () => {
    let priceData = db.collection("variables").doc("prices");
    let price = await priceData.get().then((prices) => {
      return prices.data()[productType];
    });

    let cart = db.collection('cart').doc(userID);
    let newItem = {
      name: title,
      price: price,
      type: productType,
      location: image
    }

    cart.update({
      items: firebase.firestore.FieldValue.arrayUnion(newItem),
      total: firebase.firestore.FieldValue.increment(newItem.price)
    }).then(() => {
      alert(`Se agregó ${title}` );
    });
  }

  return (
    <div className="shadow-lg w-56 h-auto flex bg-white flex-col m-3 rounded-xl">
      <div className="w-56 h-56 rounded-t-xl">
        <StorageImage className="rounded-t-xl" storagePath={image}/>
      </div>
      <div className="px-5 py-3 flex flex-col justify-center items-center">
        <p className="text-xs text-black truncate">{title}</p>
        <div className="flex flex-row justify-around w-full mt-2">
          <button className="text-xs bg-blue-600 px-2 py-1 text-white rounded-md w-7/12" onClick={addToCart}>Add to cart</button>
          <button className="text-xs bg-green-600 px-2 py-1 text-white rounded-md w-4/12">View</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
