import React, { useEffect, useContext, useState } from 'react'
import './Generate.css'
import UserContext from '../UserContextProvider'
import { useHistory } from 'react-router-dom'
import Placeholder from '../img/generated_placeholder.png'
import { useFirebaseApp } from 'reactfire'
import firebase from "firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


function DisabledButton() {
    return (
        <button
            className="text-white bg-gray-600 rounded-md py-2 px-8"
            disabled
        >
            Save Image
        </button>
    )
}

function SaveButton(props) {
    return (
        <button
            className="text-white bg-green-600 rounded-md py-2 px-8 hover:bg-green-500"
            onClick={props.saveImage}
        >
            Save Image
        </button>
    )
}

var images = new Array(2)
var canvas

function Generate() {
    const { user, setUser } = useContext(UserContext)
    const history = useHistory()
    const [image, setImage] = useState(Placeholder)
    const MySwal = withReactContent(Swal)
    const app = useFirebaseApp()
    const db = app.firestore()
    const url = 'http://localhost:5000'


    useEffect(() => {
        if (Object.entries(user).length === 0) {
            history.push('login')
        }
    })

    async function generateImage(){
        let tmpImage = await fetch(`${url}/generate_one`, {
            'Content-Type': 'image/png',
        })
        tmpImage.blob().then((image) => {
            canvas = image
            setImage(URL.createObjectURL(image))
        }).catch((error) => {
            console.warn(error);
            MySwal.fire({
                title: <p>An error ocurred!</p>,
                toast: true,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
                background: "#fff",
                iconColor: "#e84118",
                position: 'bottom-end',
            })
        })
    }

    async function saveImage(){
        if (user.gen_left < 1) {
            return
        }

        let name = await (await fetch(`${url}/name`)).text()

        if(name !== undefined) {
            let storageUrl = `/IA_imgs/users/${user.uid}/${name}`;
            let storageRef = app.storage().ref();

            images[0] = await fetch(`${url}/shirt`, {
                'Content-Type': 'image/png',
            })
            images[1] = await fetch(`${url}/mug`, {
                'Content-Type': 'image/png',
            })

            let promises = images.map(image => image.blob());
            let blobs = await Promise.all(promises).catch((error) => {
                console.log(error)
                MySwal.fire({
                    title: <p>An error ocurred!</p>,
                    toast: true,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: "#fff",
                    iconColor: "#e84118",
                    position: 'bottom-end',
                })
            });
            blobs.unshift(canvas)
            console.log(blobs)

            let ref = [storageRef.child(`${storageUrl}/canvas.jpg`), storageRef.child(`${storageUrl}/shirt.jpg`), storageRef.child(`${storageUrl}/mug.jpg`)];

            for (let i = 0; i < ref.length; i++) {
                await ref[i].put(blobs[i]).then(() => {
                    console.log('Uploaded a blob or file!');
                }).catch(() => {
                    MySwal.fire({
                        title: <p>An error ocurred!</p>,
                        toast: true,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true,
                        showConfirmButton: false,
                        background: "#fff",
                        iconColor: "#e84118",
                        position: 'bottom-end',
                    })
                })  
            }

            var canvas = await ref[0].getDownloadURL().then(url => url)
            var shirt = await ref[1].getDownloadURL().then(url => url)
            var mug = await ref[2].getDownloadURL().then(url => url)

            db.collection('users').doc(user.uid).update({
                gens_remaining: firebase.firestore.FieldValue.increment(-1),
                [`Image-${5 - user.gen_left}`]: {
                    "canvas": canvas,
                    "shirt": shirt,
                    "mug": mug,
                }
            }).then(() => {
                setImage(Placeholder)
                setUser({
                    ...user,
                    gen_left: user.gen_left-1
                })
                MySwal.fire({
                    title: <p>Images succesfuly saved!</p>,
                    toast: true,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: false,
                    background: "#fff",
                    iconColor: "#05c46b",
                    position: 'bottom-end',
                })
            });

        } else {
            MySwal.fire({
                title: <p>An error ocurred, try again</p>,
                toast: true,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
                background: "#fff",
                iconColor: "#e84118",
                position: 'bottom-end',
            })
        }
    }

    return (
        <div className="fit__generate flex flex-col mb-4 pt-20">
            {/* Generate Titles */}
            <div className="flex w-screen justify-center">
                {/* Title */}
                <div className="w-screen flex flex-col justify-center text-indigo-600">
                    <h3 className="text-1xl text-center tracking-tight">
                        Create your own image here!
                    </h3>
                    <h1 className="text-2xl text-center">
                        Let's make something special
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="flex main w-screen h-full px-20 flex-row justify-between mt-10">
                {/* Image */}
                <div className="flex w-full justify-center">
                    <div className="flex justify-center w-full">
                        <img
                            className="object-cover rounded-2xl shadow-xl block w-60 h-auto"
                            src={image}
                            alt="Generated"
                        />
                    </div>
                </div>
                {/* Edition */}
                <div className="flex w-full">
                    {/* Main */}
                    <div className="flex w-full justify-center flex-col">
                        {/* Edit Title */}
                        <div className="flex w-full text-center p-5">
                            <h1 className="text-2xl w-full text-center">
                                Generate images, if you like one, save it!
                            </h1>
                        </div>
                        {/* Buttons */}
                        <div className="flex justify-evenly mt-10 buttons">
                            <button
                                className="text-white bg-indigo-600 rounded-md py-2 px-8 hover:bg-indigo-500"
                                onClick={generateImage}
                            >
                                Generate Image
                            </button>

                            { (image !== Placeholder) ? <SaveButton saveImage={saveImage} /> : <DisabledButton/> } 

                        </div>
                        {/* Images Left */}
                        <div className="flex justify-center mt-5 text-indigo-600 text-md font-medium">
                            <p>
                                You still have <b className="text-red-600">{user.gen_left}</b>{' '}
                                images left!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Generate
