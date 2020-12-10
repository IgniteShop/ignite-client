import React, { useState, useContext, useEffect } from "react";
import { LocalForm, Control, Errors } from "react-redux-form";
import { useAuth, useFirestore, useFirebaseApp } from "reactfire";
import { useHistory } from 'react-router-dom';
import 'firebase/auth';
import 'firebase/database';
import firebase from "firebase";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import UserContext from '../UserContextProvider';

function LoginForm(){
    const { setUser } = useContext(UserContext)
    const history = useHistory();
    const MySwal = withReactContent(Swal)

    useEffect(() => {
        firebase.auth().signOut();
    }, []);

    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const required = (value) => value && value.length;
    const validEmail = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

    const getUserData = async (uid) => {
        const db = firebase.firestore()
        const userRef = db.collection("users").doc(uid)
        const doc = await userRef.get().catch(() => {
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
        if(doc.exists) {
            const userData = doc.data()
            return userData
        }
    }

    const Login = () => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(async (user) => {
            if(user) {
                console.log(user);
                const userData = await getUserData(user['user'].uid)
                console.log("DATA: ", userData)
                
                setUser({ "email": user['user'].email, "uid": user['user'].uid, "name": userData.name, "gen_left": userData.gens_remaining })
                history.push("/");
            }
        }).catch(() => {
            MySwal.fire({
                title: <p>Usuario o contraseña incorrectos</p>,
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
        )
    };

    const loginWithGoogle = () => {
        let provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        firebase.auth().signInWithPopup(provider).then(async result => {
            // Get user info returned by Google's API. result.user is
            let googleData = result.user.providerData[0];
            let id = result.user.uid;
            
            const userData = await getUserData(id).catch(() => {
                firebase.firestore().collection('users').doc(id).set({
                    gens_remaining: 5,
                    name: googleData.displayName
                });
                result.user.updateProfile({displayName: googleData.displayName});
            });

            setUser({ "email": googleData.email, "uid": id, "name": userData.name, "gen_left": userData.gens_remaining })
            
            history.push('/');
        }).catch(error => {
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
    };

    return(
        <LocalForm onSubmit={Login}>
            <div className="login px-32 py-5 flex flex-col">
                <Control.text 
                    className="px-5 py-2 text-gray-700 rounded-2xl border-2 border-gray-300 border-box font-medium" 
                    placeholder="Email" 
                    validators={{validEmail}}
                    model=".email" 
                    onChange={event => setEmail(event.target.value)}
                />
                <Errors
                className="text-red-600 flex justify-end text-sm -mb-3" show="touched" model=".email" messages={{
                    validEmail: "Please enter a valid email"
                }}/>
                <Control.text 
                    type="password" 
                    className="px-5 py-2 mt-5 text-gray-700 rounded-2xl border-2 border-gray-300 border-box font-medium" 
                    placeholder="Password" 
                    validators={{required}} 
                    model=".password" 
                    onChange={event => setPassword(event.target.value)}
                />
                <Errors
                className="text-red-600 flex justify-end text-sm -mb-3" show="touched" model=".password" messages={{
                    required: "Please enter your password"
                }}/>
            </div>
            <div className="px-32 py-3 flex flex-col botones">
              <button className="px-5 py-2 text-white bg-green-600 hover:bg-green-500 rounded-xl font-bold" type="submit"><span>Login</span></button>
              <button className="px-5 py-2 mt-4 text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold" type="button" onClick={loginWithGoogle}>
                <span>Login with Google</span>
              </button>
            </div>
        </LocalForm>
    );
}

export default LoginForm;