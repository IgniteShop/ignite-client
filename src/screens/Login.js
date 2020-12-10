import React, { Suspense } from "react";
import "./Login.css";
import shirts from "../img/MainShirts.png";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Loader from '../components/Loader';

function Login (){
  return (
    <div className="flex mb-4 background h-full items-center justify-center pt-12 px-10">
      <Suspense fallback={<Loader type={"bubbles"} color={"#5a67d8"}/>}>
        {/* Welcome Back */}
        <div className="flex w-1/2 flex-col justify-center text-indigo-600">
          <div className="px-32 py-5 text-center">
            <h1 className="welcome text-4xl text-indigo-600">Welcome back!</h1>
            <h3 className="px-4 text-md">
              Log in to purchase some unique products
            </h3>
          </div>
            <LoginForm/>
          <div className="forgot px-32 py-2 text-right">
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
        <div className="flex w-1/2 items-center background">
          <div className="px-10 py-10">
            <img src={shirts} alt="Shirts" />
          </div>
        </div>
      </Suspense>
    </div>
  );
  }

export default Login;
