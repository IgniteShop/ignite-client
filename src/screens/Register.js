import React, { Suspense } from "react";
import "./Register.css";
import shirts from "../img/MainShirts.png";
import line from "../img/line.png";
import SignUpForm from "../components/SignUpForm"
import { Link } from "react-router-dom";
import 'firebase/auth';

function Register(){
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
          <Suspense fallback={<p>Loading...</p>}>
            <SignUpForm/>
          </Suspense>
          <img className="h-auto px-32 py-4" src={line} alt="Line" />
          {/* Sign up */}
          <div className="forgot px-32 py-3 text-right flex flex-col">
            <button className="px-5 py-3 boton_naranja">
              Sign up with DuckDuckGo
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
