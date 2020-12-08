import React from "react";
import "../screens/Shop.css";
import Item from "./Item";
import { useFirestore, useFirestoreDocData } from "reactfire";

function ProductContainer(){
  let images = useFirestore().collection('IA_imgs').doc('admin');
  images = useFirestoreDocData(images);
  
  let keys = Object.keys(images);
    return(
        <div className="w-full overflow-y-auto flex justify-center flex-wrap">  
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