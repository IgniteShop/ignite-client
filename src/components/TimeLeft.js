import React, { Suspense, useEffect, useState } from "react";
import ProductContainer from "../components/ProductContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import firebase from "firebase";
import 'firebase/database';

function TimeLeft() {
    const [ daysLeft, setDaysLeft ] = useState(undefined);

    useEffect(()=> {
      let db = firebase.firestore();
  
      db.collection("variables").doc("image_expiration").get().then((item) => {
        let expirationDate = item.data()['current'].toDate();
        let days = Math.floor((expirationDate - Date.now()) / 86400000);

        setDaysLeft(days);
      })
  
    },[]);

    if(daysLeft <= 0){
        return (
            <div className="w-screen flex justify-center mt-2 mb-2 items-center">
                <FontAwesomeIcon className="clock-icon fill-current text-red-600" icon={faClock} />
                <h3 className="ml-1 font-light text-red-600">Huh, there's {daysLeft} days left. That shouldn't happen...</h3>
            </div>
        );
    } else if (daysLeft == 1){
        return(
            <div className="w-screen flex justify-center mt-2 mb-2 items-center">
                <FontAwesomeIcon className="clock-icon fill-current text-red-600" icon={faClock} />
                <h3 className="ml-1 font-light text-red-600">Be quick! Only {daysLeft} day left!</h3>
            </div>
        );
    } else if (daysLeft >= 0 && daysLeft <= 3) {
        return(
            <div className="w-screen flex justify-center mt-2 mb-2 items-center">
                <FontAwesomeIcon className="clock-icon fill-current text-red-600" icon={faClock} />
                <h3 className="ml-1 font-light text-red-600">Be quick! Only {daysLeft} days left!</h3>
            </div>
        );
    } else if (daysLeft > 3){
        return(
            <div className="w-screen flex justify-center mt-2 mb-2 items-center">
                <FontAwesomeIcon className="clock-icon fill-current text-indigo-600" icon={faClock} />
                <h3 className="ml-1 font-light text-indigo-600">These products will be gone in {daysLeft} days</h3>
            </div>
        );
    } else {
        return null;
    }

}

export default TimeLeft;