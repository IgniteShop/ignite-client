import React, { useState } from "react";
import "./Register.css";
import shirts from "../img/MainShirts.png";
import line from "../img/line.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login.js";
import { Control, Errors, LocalForm } from "react-redux-form";
import { useFirebaseApp } from "reactfire";
import 'firebase/auth';

function Register(){
  const firebase = useFirebaseApp();
  
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
      console.log(result);
      alert("Usuario creado");
    }).catch(error => {
      alert(error);
    });
  }

  return (
    <div className="flex mb-4 background">
        {/* Titles */}
        <div className="fit flex w-1/2 flex-col justify-center">
          <div className="px-32 py-5 text-center">
            <h1 className="welcome text-5xl">Join Ignite!</h1>
            <h3 className="px-12 text-xl">
              Create an account to generate custom designs
            </h3>
          </div>
          {/* Inputs */}
          <LocalForm validators={{'': {validPassword}}} model="form" onSubmit={signUp}>
            <div className="login px-32 py-2 flex flex-col">
              <Control.text 
                className="px-5 py-2" 
                placeholder="Name" 
                validators={{required}}
                model = ".username"
                onChange={event => setUsername(event.target.value)}/>
              <Errors
              className="" show="touched" model=".username" messages={{
                required: "This field is requiered"
              }}/>
              <Control.text 
                className="px-5 py-2 mt-5" 
                placeholder="Email" 
                validators={{required, validEmail}}
                model=".email"
                onChange={event => setUsername(event.target.value)}/>
              <Errors
              className="" show="touched" model=".email" messages={{
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
              className="" show="touched" model=".password" messages={{
                required: "This field is requiered",
                minLength: "Password must be at least 6 characters"
              }}/>
              <Control.text
                type="password"
                className="px-5 py-2 mt-5"
                placeholder="Confirm Password"
                model=".repeatPassword"
                onChange={event => setPasswordConfirm(event.target.value)}/>
              <Errors
                className="" show="touched" model="form" messages={{
                validPassword: "Passwords must match"
              }}/>
            </div>
            {/* Create Button */}
            <div className="px-32 py-5 flex flex-col botones">
              <button className="px-5 py-3 boton_verde" type="submit">Create Account</button>
            </div>
            {/* Privacy Policy */}
            <div className="privacy px-32 py-2 flex flex-row">
              <Control.checkbox 
                className="checkbox mt-1" 
                type="checkbox" 
                model=".policy"
                onChange={event => setAcceptTerms(event.target.value)}/>
              <p className="ml-5 text-center">
                I accept Ignite's Terms of Service and Privacy Policy
              </p>
            </div>
          </LocalForm>
          <img className="h-auto px-32 py-4" src={line} alt="Line" />
          {/* Sign up */}
          <div className="forgot px-32 py-3 text-right flex flex-col">
            <button className="px-5 py-3 boton_naranja">
              Sign up with DuckDuckGo
            </button>
            <h4 className="mt-5 text-center">
              Already have an account? Login{" "}
              <Link to={"/login"}>
                <b>
                  <u> here</u>
                </b>
              </Link>
            </h4>
          </div>
        </div>
        
        {/* Shirt Image */}
        <div className="fit flex w-1/2 items-center background">
          <div className="px-10 py-10">
            <img src={shirts} alt="Shirts" />
          </div>
        </div>
    </div>
  );  
}
  export default Register;
