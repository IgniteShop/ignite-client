import React from "react";
import { useFirebaseApp } from "reactfire";
import firebase from "firebase";
import './Stock.css'
import 'firebase/auth';
import 'firebase/database';

function Stock(){

    const app = useFirebaseApp();
    const db = app.firestore();

    const url = "http://localhost:5000";

    const generateStock = async () => {
        let numberImages = 5;
        let expiration_date = new Date();
        expiration_date.setDate(expiration_date.getDate() + 30);
        
        for (let i = 0; i < numberImages; i++) {
            let products = [await fetch(`${url}/generate_one`), 
                            await fetch(`${url}/shirt`), 
                            await fetch(`${url}/mug`)];
            
            let promises = products.map(image => image.blob());
            let blobs = await Promise.all(promises).catch((error) => {
                alert(error);
            });

            let name = await (await fetch(`${url}/name`)).text();

            if(name !== undefined && blobs !== undefined){
                let url = `/IA_imgs/admin/${name}`;

                let storageRef = app.storage().ref();

                let ref = [storageRef.child(`${url}/canvas.jpg`), storageRef.child(`${url}/shirt.jpg`), storageRef.child(`${url}/mug.jpg`)];

                for (let i = 0; i < ref.length; i++) {
                    ref[i].put(blobs[i]).then(() => {
                        console.log('Uploaded a blob or file!');
                    });    
                }           

                db.collection('IA_imgs').doc('admin').update({
                    [name]: {
                        expiration_date: firebase.firestore.Timestamp.fromDate(expiration_date),
                        location: `IA_imgs/admin/${name}`
                    }
                }).then(() => {
                    console.log("Image added to database");
                });

                db.collection('variables').doc('image_expiration').update({
                    current: firebase.firestore.Timestamp.fromDate(expiration_date)
                }).then(() => {
                    console.log("Image added to database");
                });

                console.log("Generación finalizada")
            } else {
                alert("Error de servidor");
            }
        }
    }
    return(
        <button className="px-5 py-2 boton_stock" onClick={generateStock}>Generate Stock!</button>
    );
}

export default Stock;