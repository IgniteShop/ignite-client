import React from "react";
import { useFirebaseApp } from "reactfire";
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';

function Stock(){

    const app = useFirebaseApp();
    const db = app.firestore();

    const url = "http://localhost:5000";

    const generateStock = async () => {
        let image_promises = [];
        let names_promises = [];
        let numberImages = 5;

        for (let i = 0; i < numberImages; i++) {
            image_promises.push(fetch(`${url}/generate_one`));

            names_promises.push(fetch(`${url}/name`));
        }

        let image_array = await Promise.all(image_promises).catch((error) => {
            alert(error);
        });
        let name_array =  await Promise.all(names_promises).catch((error) => {
            alert(error);
        });

        let blob_promises = image_array.map(image => image.blob());
        let blob_array = await Promise.all(blob_promises).catch((error) => {
            alert(error);
        });

        
        if(name_array !== undefined && image_array !== undefined){
            for (let i = 0; i < numberImages; i++) {
                let name = await name_array[i].text();

                let expiration_date = new Date();
                expiration_date.setDate(expiration_date.getDate() + 30);

                let storageRef = app.storage().ref();

                let ref = storageRef.child(`/IA_imgs/admin/${name}.jpg`);

                ref.put(blob_array[i]).then(() => {
                    console.log('Uploaded a blob or file!');
                });

                db.collection('IA_imgs').doc('admin').update({
                    [name]: {
                        expiration_date: firebase.firestore.Timestamp.fromDate(expiration_date),
                        location: `IA_imgs/admin/${name}.jpg`
                    }
                }).then(() => {
                    console.log("Image added to database");
                });
            }
        } else {
            alert("Error de servidor");
        }
    }

    return(
        <button className="px-5 py-2 boton_verde" onClick={generateStock}>Generate Stock!</button>
    );
}

export default Stock;