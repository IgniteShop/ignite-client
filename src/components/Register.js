import React, { useState } from "react";
import "./Register.css";
import shirts from "../img/MainShirts.png";
import line from "../img/line.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Login.js";

function Register(){
  const [username, setUsername] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState(undefined);
  const [acceptTerms, setAcceptTerms] = useState('off');

  const signUp = () => {
    // TODO: Verificar errores
    
    if(password === passwordConfirm && acceptTerms === 'on'){
      

    }
  }

    return (
      <div class="flex mb-4 background">
        {/* Titles */}
        <div class="fit flex w-1/2 flex-col justify-center">
          <div class="px-32 py-5 text-center">
            <h1 class="welcome text-5xl">Join Ignite!</h1>
            <h3 class="px-12 text-xl">
              Create an account to generate custom designs
            </h3>
          </div>
          {/* Inputs */}
          <div class="login px-32 py-2 flex flex-col">
            <input 
              class="px-5 py-2" 
              placeholder="Username" 
              onChange={event => setUsername(event.target.value)}></input>
            <input 
              class="px-5 py-2 mt-5" 
              placeholder="Password" 
              onChange={event => setPassword(event.target.value)}></input>
            <input
              class="px-5 py-2 mt-5"
              placeholder="Confirm Password"
              onChange={event => setPasswordConfirm(event.target.value)}
            ></input>
          </div>
          {/* Create Button */}
          <div class="px-32 py-5 flex flex-col botones" onClick={signUp}>
            <button class="px-5 py-3 boton_verde">Create Account</button>
          </div>
          {/* Privacy Policy */}
          <div class="privacy px-32 py-2 flex flex-row">
            <input 
              class="checkbox mt-1" 
              type="checkbox" 
              onChange={event => setAcceptTerms(event.target.value)}/>
            <p class="ml-5 text-center">
              I accept Ignite's Terms of Service and Privacy Policy
            </p>
          </div>
          <img class="h-auto px-32 py-4" src={line} alt="Line" />
          {/* Sign up */}
          <div class="forgot px-32 py-3 text-right flex flex-col">
            <button class="px-5 py-3 boton_naranja">
              Sign up with DuckDuckGo
            </button>
            <h4 class="mt-5 text-center">
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
        <div class="fit flex w-1/2 items-center background">
          <div class="px-10 py-10">
            <img src={shirts} alt="Shirts" />
          </div>
        </div>
      </div>
    );
  }

export default Register;
