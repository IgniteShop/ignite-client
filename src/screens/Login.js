import React, { Suspense } from "react";
import "./Login.css";
import shirts from "../img/MainShirts.png";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useAuth } from "reactfire";

function Login (){
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
        <Suspense fallback={<p>Loading...</p>}>
          <LoginForm/>
        </Suspense>
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

export default Login;
