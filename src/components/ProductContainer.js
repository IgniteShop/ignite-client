import React from "react";
import "../screens/Shop.css";
import Item from "./Item";
import { useFirestore, useFirestoreDocData } from "reactfire";
import firebase from "firebase";

function ProductContainer(props){
  
  let images = useFirestore().collection('IA_imgs').doc('admin');
  images = useFirestoreDocData(images);
  let productType = props.productType.toLowerCase();
  
  let keys = Object.keys(images);
  return(
        <div className="products flex justify-center flex-wrap">  
          {
            keys.filter(key => {
                let searchTerm = props.searchTerm == undefined ? "" : props.searchTerm.toLowerCase();
                let currentDate = firebase.firestore.Timestamp.now().valueOf();
                let imageDate = images[key]['expiration_date'].valueOf();

                if((currentDate < imageDate) && key.toLowerCase().includes(searchTerm)){
                  return key;
                }
            }).map(key => <Item key={key} title={key} image={images[key]['location']} productType={productType}/>)
          }

        </div>
    );
}

export default ProductContainer;