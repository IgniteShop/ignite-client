import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import { StorageImage } from "reactfire";
import "firebase/firestore"
import firebase from "firebase";
import UserContext from '../UserContextProvider';


function Item({ id, title, image, productType }) {
  const { user } = useContext(UserContext);
  const db = firebase.firestore();
  const history = useHistory();

  const addToCart = async () => {
    if(user != {}){
      let priceData = db.collection("variables").doc("prices");
      let price = await priceData.get().then((prices) => {
        return prices.data()[productType.toLowerCase()];
      });

      try {
        let cart = db.collection('cart').doc(user.uid);

        let newItem = {
          name: title,
          price: price,
          type: productType,
          location: image
        }
  
        let key = `items.${title}`;
  
        cart.update({
          [key]: {...newItem},
          total: firebase.firestore.FieldValue.increment(newItem.price)
        }).then(() => {
          alert(`Se agregó ${title}` );
        });
      } catch {
        history.push('login');
      }
    } else {
      history.push('login');
    }
  }
  var design = ""
  if (productType != "mug") {
    design += "rounded-t-xl"
  } else {
    design += "rounded-t-xl w-11/12"
  }

  return (
    <div className="shadow-lg w-56 h-auto flex bg-white flex-col m-3 rounded-xl">
      <div className="w-56 h-56 rounded-t-xl flex justify-center items-center">
        <StorageImage className={design} storagePath={`${image}/${productType}.jpg`}/>
      </div>
      <div className="px-5 py-3 flex flex-col justify-center items-center">
        <p className="text-xs text-black truncate">{title}</p>
        <div className="flex flex-row justify-around w-full mt-2">
          <button className="text-xs bg-indigo-600 px-2 py-1 text-white rounded-md w-11/12" onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}

export default Item;
