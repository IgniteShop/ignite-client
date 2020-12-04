import React, { useState, useEffect } from "react";
import { LocalForm, Control, Errors } from "react-redux-form";
import { useHistory } from "react-router-dom";
import { useAuth, useFirestore, useFirebaseApp } from "reactfire";
import 'firebase/auth';
import 'firebase/database';
import firebasic from "firebase";

function LoginForm(){
    const auth = useAuth();
    const firestore = useFirestore();
    const history = useHistory();
    const firebase = useFirebaseApp();

    useEffect(() => {
        firebase.auth().signOut();
    }, []);

    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const required = (value) => value && value.length;
    const validEmail = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

    const Login = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((result) => {console.log(result);})
        .catch((error) => {alert(error)});

        history.push('account');
    };

    const loginWithGoogle = () => {
        firebase.auth().signOut();

        let provider = new firebasic.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

        firebase.auth().signInWithPopup(provider).then(result => {
            // Get user info returned by Google's API. result.user is
            let googleData = result.user.providerData[0];
            let id = googleData.uid;

            firestore.collection('users').doc(id).set({
                gens_remaining: 5,
                name: googleData.displayName
            });
            result.user.updateProfile({displayName: googleData.displayName});

            history.push('account');

        }).catch(error => {
            alert(error);
        });

    };

    return(
        <LocalForm onSubmit={Login}>
            <div className="login px-32 py-5 flex flex-col">
                <Control.text 
                    className="px-5 py-2" 
                    placeholder="Email" 
                    validators={{validEmail}}
                    model=".email" 
                    onChange={event => setEmail(event.target.value)}
                />
                <Errors
                className="" show="touched" model=".email" messages={{
                    validEmail: "Please enter a valid email"
                }}/>
                <Control.text 
                    type="password" 
                    className="px-5 py-2 mt-5" 
                    placeholder="Password" 
                    validators={{required}} 
                    model=".password" 
                    onChange={event => setPassword(event.target.value)}
                />
                <Errors
                className="" show="touched" model=".password" messages={{
                    required: "Please enter your password"
                }}/>
            </div>
            <div className="px-32 py-5 flex flex-col botones">
              <button className="px-5 py-2 boton_verde" type="submit">Login</button>
              <button className="px-5 py-2 boton_naranja mt-5" type="button" onClick={loginWithGoogle}>
                Login with Google
              </button>
            </div>
        </LocalForm>
    );
}

export default LoginForm;