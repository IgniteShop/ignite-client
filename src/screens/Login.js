import React, { Component } from "react";
import "./Login.css";
import shirts from "../img/MainShirts.png";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div className="flex mb-4 background">
        {/* Welcome Back */}
        <div className="fit flex w-1/2 flex-col justify-center">
          <div className="px-32 py-5 text-center">
            <h1 className="welcome text-5xl">Welcome back!</h1>
            <h3 className="px-12 text-xl">
              Log in to purchase some unique products
            </h3>
          </div>
          <div className="login px-32 py-5 flex flex-col">
            <input className="px-5 py-2" placeholder="Email"></input>
            <input type="password" className="px-5 py-2 mt-5" placeholder="Password"></input>
          </div>
          <div className="px-32 py-5 flex flex-col botones">
            <button className="px-5 py-3 boton_verde">Login</button>
            <button className="px-5 py-3 boton_naranja mt-5 ">
              Login with DuckDuckGo
            </button>
          </div>
          <div className="forgot px-32 py-5 text-right">
            <h4>Forgot your password?</h4>
            <h4 className="mt-5">
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
        <div className="fit flex w-1/2 items-center background">
          <div className="px-10 py-10">
            <img src={shirts} alt="Shirts" />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
