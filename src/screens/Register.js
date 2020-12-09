import React, { Suspense } from "react";
import shirts from "../img/MainShirts.png";
import SignUpForm from "../components/SignUpForm"
import 'firebase/auth';

function Register(){
  return (
    <div className="flex mb-4 background justify-center items-center h-screen pt-12 px-10">
      <Suspense fallback={<p className="text-indigo-600">Loading...</p>}>
        {/* Titles */}
        <div className="flex w-1/2 flex-col justify-center">
          <div className="px-32 py-5 text-center text-indigo-600">
            <h1 className="welcome text-4xl">Join Ignite!</h1>
            <h3 className="text-md">
              Create an account to generate custom designs
            </h3>
          </div>
          {/* Inputs */}
            <SignUpForm/>
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
  export default Register;
