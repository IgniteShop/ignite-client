import React, { useState, useEffect } from "react";
import "./ItemCheckout.css";
import 'firebase/database';
import firebase from "firebase";

function ItemCheckout({ id, title, image, price }) {
  let storage = firebase.storage();
  let [itemURL, setItemURL] = useState(undefined);
  let [userFB, setUserFB] = useState(undefined);

  // TODO: Cambiar por contexto de usuario
  useEffect(()=>{
    function GetUser() {
      firebase.auth().onAuthStateChanged(function(user){
        if(user){     
          let Userdata = user.uid;
          setUserFB(Userdata);
        }}
      );
    }
    GetUser();
  },[])

  useEffect(() => {
    storage.ref(`${image}`).getDownloadURL().then((url) => {
      setItemURL(url);
    });
  }, []);

  const deleteItem = (e => {
    if(userFB){
      let db = firebase.firestore();
      let key = `items.${title}`;

      db.collection("cart").doc(userFB).update({
        [key]: firebase.firestore.FieldValue.delete(),
        total: firebase.firestore.FieldValue.increment(price * -1)

      })
    }
  });

  return (
    <div className="item ml-24 shadow-lg border-box py-4" key={id}>
      {/* Info */}
      <div className="flex ml-4">
        {/* Image */}
        <div className="item__image shadow-md">
          <img src={itemURL} alt="" />
        </div>
        {/* Title & Price */}
        <div className="flex flex-col ml-5">
          {/* Title */}
          <div className="flex title mt-2">
            <h1 className="text-2xl text-indigo-600">{title}</h1>
          </div>
          {/* Price */}
          <div className="flex price">
            <h3 className="text-xl">{`$${price}`}</h3>
          </div>
        </div>
      </div>
      {/* Buttons */}
      <div className="flex flex-col m-10 botones">
        <button className="edit w-32 h-8">Edit</button>
        <button className="delete w-32 h-8 mt-2" onClick={deleteItem}>Delete</button>
      </div>
    </div>
  );
}

export default ItemCheckout;
