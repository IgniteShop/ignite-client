import React from "react";
import "../screens/Shop.css";
import searchIcon from "../img/searchIcon.png";
import Item from "./Item";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useFirestore, useFirestoreDocData } from "reactfire";
import firebase from "firebase";

function ProductContainer(){
  let images = useFirestore().collection('IA_imgs').doc('admin');
  images = useFirestoreDocData(images);
  
  let keys = Object.keys(images);
  console.log(images);
    return(
        <div className="products">  
          {
            keys.filter(key => {
                let currentDate = firebase.firestore.Timestamp.now().valueOf();
                let imageDate = images[key]['expiration_date'].valueOf();

                if(currentDate < imageDate){
                  return key;
                }
            }).map(key => <Item key={key} title={key} image={images[key]['location']}/>)
          }
        </div>
    );
}

export default ProductContainer;