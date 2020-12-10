import React, { useState, useContext } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { useFirebaseApp, useUser, useFirestore } from "reactfire";
import { Link, useHistory } from "react-router-dom";
import line from "../img/line.png";
import 'firebase/auth';
import 'firebase/database';
import firebasic from "firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import UserContext from '../UserContextProvider';

function SignUpForm(){
    const MySwal = withReactContent(Swal);
    const firebase = useFirebaseApp();
    const firestore = useFirestore();
    const history = useHistory();
    const { setUser } = useContext(UserContext);
    
    const [username, setUsername] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);
    const [passwordConfirm, setPasswordConfirm] = useState(undefined);
    const [acceptTerms, setAcceptTerms] = useState('off');

    const required = (value) => value && value.length;
    const minLength = (length) => (value) => !value || (value.length >= length);
    const validEmail = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
    const validPassword = (values) => values.password === values.repeatPassword || !values.password || !values.repeatPassword;

    const signUp = () => {  
        //TODO: mensaje cuando el usuario se crea, mensaje si el correo ya está ocupado
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            let id = result.user.uid;
            let current_user = firebase.auth().currentUser;

            if(current_user){
                firestore.collection('users').doc(id).set({
                    gens_remaining: 5,
                    name: username
                });
                
                firestore.collection('cart').doc(id).set({
                    items:{},
                    total:0
                })
    
                current_user.updateProfile({displayName: username});
    
                history.push('/login');
            } else {
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
            }
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

    const getUserData = async (uid) => {
        const db = firebase.firestore()
        const userRef = db.collection("users").doc(uid)
        const doc = await userRef.get()
        if(doc.exists) {
            const userData = doc.data()
            return userData
        } else {
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
        }
    }

    const signUpWithGoogle = () => {
        firebase.auth().signOut();

        let provider = new firebasic.auth.GoogleAuthProvider();
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

            setUser({ "email": googleData.email, "uid": googleData.uid, "name": userData.name, "gen_left": userData.gens_remaining })

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
        <LocalForm validators={{'': {validPassword}}} model="form" onSubmit={signUp}>
            <div className="login px-32 py-2 flex flex-col text-red-600">
                <Control.text 
                className="px-5 py-2 font-medium rounded-2xl text-gray-700 border-2 border-gray-300 border-box" 
                placeholder="Name" 
                validators={{required}}
                model = ".username"
                onChange={event => setUsername(event.target.value)}/>
                <Errors
                className="flex justify-end text-sm -mb-2" show="touched" model=".username" messages={{
                required: "This field is required"
                }}/>
                <Control.text 
                className="px-5 py-2 font-medium rounded-2xl text-gray-700 border-2 border-gray-300 border-box mt-5" 
                placeholder="Email" 
                validators={{required, validEmail}}
                model=".email"
                onChange={event => setEmail(event.target.value)}/>
                <Errors
                className="flex justify-end text-sm -mb-2" show="touched" model=".email" messages={{
                validEmail: "Please enter a valid email"
                }}/>
                <Control.text 
                type="password"
                className="px-5 py-2 font-medium rounded-2xl text-gray-700 border-2 border-gray-300 border-box mt-5" 
                placeholder="Password" 
                validators={{required, minLength: minLength(6)}}
                model=".password"
                onChange={event => setPassword(event.target.value)}/>
                <Errors
                className="flex justify-end text-sm -mb-2" show="touched" model=".password" messages={{
                required: "This field is required",
                minLength: "Password must be at least 6 characters"
                }}/>
                <Control.text
                type="password"
                className="px-5 py-2 font-medium rounded-2xl text-gray-700 border-2 border-gray-300 border-box mt-5"
                placeholder="Confirm Password"
                model=".repeatPassword"
                onChange={event => setPasswordConfirm(event.target.value)}/>
                <Errors
                className="flex justify-end text-sm -mb-2" show="touched" model="form" messages={{
                validPassword: "Passwords must match"
                }}/>
            </div>
            {/* Privacy Policy
            <div className="privacy px-32 py-2 flex flex-row justify-center items-center">
                <Control.checkbox 
                className="checkbox transform scale-125" 
                type="checkbox" 
                model=".policy"
                onChange={event => setAcceptTerms(event.target.value)}/>
                <p className="ml-3 text-center text-indigo-600 font-medium flex items-center">
                I accept Ignite's Terms of Service and Privacy Policy
                </p>
            </div> */}
            {/* Create Button */}
            <div className="px-32 py-1 flex flex-col mt-8">
                <button className="px-5 py-2 hover:bg-green-500 text-white bg-green-600 rounded-xl font-bold" type="submit">Create Account</button>
            </div>
            <img className="h-auto px-32 py-2" src={line} alt="Line" />
            {/* Sign up */}
            <div className="forgot px-32 py-1 text-right flex flex-col">
                <button className="px-5 py-2 hover:bg-indigo-500 text-white bg-indigo-600 rounded-xl" onClick={signUpWithGoogle} type="button">
                Sign up with Google
                </button>
                <h4 className="mt-4 text-center text-indigo-600">
                Already have an account? Login{" "}
                <Link to={"/login"}>
                    <b>
                    <u> here</u>
                    </b>
                </Link>
                </h4>
            </div>
        </LocalForm>);
}

export default SignUpForm;