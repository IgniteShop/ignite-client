import React from "react";
import "../screens/Shop.css";
import searchIcon from "../img/searchIcon.png";
import Item from "./Item";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useFirestore, useFirestoreDocData, StorageImage } from "reactfire";

function ProductContainer(){
  let images = useFirestore().collection('IA_imgs').doc('admin');
  images = useFirestoreDocData(images);
  
  let keys = Object.keys(images);
    return(
        <div className="products flex justify-center flex-wrap">  
          {keys.map(key => 
            <Item 
              key={key}
              title={key}
              image={images[key]['location']}/>
            )}
        </div>
    );
}

export default ProductContainer;