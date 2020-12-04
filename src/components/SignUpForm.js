import React, { useState } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { useFirebaseApp, useUser, useFirestore } from "reactfire";
import { Link } from "react-router-dom";
import line from "../img/line.png";
import 'firebase/auth';
import 'firebase/database';
import firebasic from "firebase";

function LoginForm(){
    const firebase = useFirebaseApp();
    const current_user = useUser();
    const firestore = useFirestore();
    
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
        firebase.auth().signOut();
 
        //TODO: mensaje cuando el usuario se crea, mensaje si el correo ya está ocupado
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(result => {
            let id = result.user.uid;

            firestore.collection('users').doc(id).set({
                gens_remaining: 5,
                name: username
            });

            current_user.updateProfile({displayName: username});
        }).catch(error => {
        alert(error);
        });
    };

    const signUpWithGoogle = () => {
        firebase.auth().signOut();

        let provider = new firebasic.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        firebase.auth().signInWithPopup(provider).then(result => {
            console.log(result.user);
            // Get user info returned by Google's API
            let googleData = result.user.providerData[0];
            let id = googleData.uid;

            firestore.collection('users').doc(id).set({
                gens_remaining: 5,
                name: googleData.displayName
            });
            current_user.updateProfile({displayName: googleData.displayName});
        }).catch(error => {
            alert(error);
        });

    };

    return(
        <LocalForm validators={{'': {validPassword}}} model="form" onSubmit={signUp}>
            <div className="login px-32 py-2 flex flex-col">
                <Control.text 
                className="px-5 py-2" 
                placeholder="Name" 
                validators={{required}}
                model = ".username"
                onChange={event => setUsername(event.target.value)}/>
                <Errors
                className="required" show="touched" model=".username" messages={{
                required: "This field is required"
                }}/>
                <Control.text 
                className="px-5 py-2 mt-5" 
                placeholder="Email" 
                validators={{required, validEmail}}
                model=".email"
                onChange={event => setEmail(event.target.value)}/>
                <Errors
                className="required" show="touched" model=".email" messages={{
                validEmail: "Please enter a valid email"
                }}/>
                <Control.text 
                type="password"
                className="px-5 py-2 mt-5" 
                placeholder="Password" 
                validators={{required, minLength: minLength(6)}}
                model=".password"
                onChange={event => setPassword(event.target.value)}/>
                <Errors
                className="required" show="touched" model=".password" messages={{
                required: "This field is required",
                minLength: "Password must be at least 6 characters"
                }}/>
                <Control.text
                type="password"
                className="px-5 py-2 mt-5"
                placeholder="Confirm Password"
                model=".repeatPassword"
                onChange={event => setPasswordConfirm(event.target.value)}/>
                <Errors
                className="required" show="touched" model="form" messages={{
                validPassword: "Passwords must match"
                }}/>
            </div>
            {/* Privacy Policy */}
            <div className="privacy px-32 py-2 flex flex-row">
                <Control.checkbox 
                className="checkbox mt-1" 
                type="checkbox" 
                model=".policy"
                onChange={event => setAcceptTerms(event.target.value)}/>
                <p className="ml-3 text-center">
                I accept Ignite's Terms of Service and Privacy Policy
                </p>
            </div>
            {/* Create Button */}
            <div className="px-32 py-3 flex flex-col botones">
                <button className="px-5 py-3 boton_verde" type="submit">Create Account</button>
            </div>
            <img className="h-auto px-32 py-4" src={line} alt="Line" />
            {/* Sign up */}
            <div className="forgot px-32 py-3 text-right flex flex-col">
                <button className="px-5 py-2 boton_naranja" onClick={signUpWithGoogle} type="button">
                Sign up with Google
                </button>
                <h4 className="mt-4 text-center">
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

export default LoginForm;