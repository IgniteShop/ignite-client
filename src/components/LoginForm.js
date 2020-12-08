import React, { useState, useContext } from "react";
import { LocalForm, Control, Errors } from "react-redux-form";
import { FirebaseAppProvider, useAuth } from "reactfire";
import { useHistory } from 'react-router-dom';
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';
import firebasic from "firebase";

import UserContext from '../UserContextProvider';

function LoginForm(){
    const { setUser } = useContext(UserContext)
    const history = useHistory()

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

    const getUserData = async (uid) => {
        const db = firebase.firestore()
        const userRef = db.collection("users").doc(uid)
        const doc = await userRef.get()
        const userData = doc.data()
        if(doc.exists) {
            const userData = doc.data()
            return userData
        } else {
            alert("Something went wrong :(")
        }
    }

    const Login = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            // Redirect to generate
            history.push("/generate")
        })
        .catch((error) => {alert(error)});

        auth.onAuthStateChanged(async user => {
            if(user) {
                console.log(user.uid);
                const userData = await getUserData(user.uid)
                console.log("DATA: ", userData)
                
                setUser({ "email": user.email, "uid": user.uid, "name": userData.name, "gen_left": userData.gens_remaining })
            }
        })
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