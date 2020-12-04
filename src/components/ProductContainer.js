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
  console.log(images['FearlessChildFamilyBathroom']['img_location']);
  
  let keys = Object.keys(images);
    return(
        <div className="products">  
          {keys.map(key => 
            <Item 
              key={images[key].img_id}
              title={images[key].img_id}
              image={images[key]['img_location']}/>
            )}
        </div>
    );
}

export default ProductContainer;