import React, { Component } from "react";
import "./Login.css";
import shirts from "../img/MainShirts.png";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Register from "./Register.js";

class Login extends Component {
  render() {
    return (
      <div class="flex mb-4 background">
        {/* Welcome Back */}
        <div class="fit flex w-1/2 flex-col justify-center">
          <div class="px-32 py-5 text-center">
            <h1 class="welcome text-5xl">Welcome back!</h1>
            <h3 class="px-12 text-xl">
              Log in to purchase some unique products
            </h3>
          </div>
          <div class="login px-32 py-5 flex flex-col">
            <input class="px-5 py-2" placeholder="Username"></input>
            <input class="px-5 py-2 mt-5" placeholder="Password"></input>
          </div>
          <div class="px-32 py-5 flex flex-col botones">
            <button class="px-5 py-3 boton_verde">Login</button>
            <button class="px-5 py-3 boton_naranja mt-5 ">
              Login with DuckDuckGo
            </button>
          </div>
          <div class="forgot px-32 py-5 text-right">
            <h4>Forgot your password?</h4>
            <h4 class="mt-5">
              Don't have an account? Create one{" "}
              <Link to={"/register"}>
                <b>
                  <u>here</u>
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
}

export default Login;
