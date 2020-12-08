import "./Header.css";
import logo from "../img/logo.svg";
import React from "react";
import { AuthCheck } from 'reactfire';
import { Link } from "react-router-dom";

export default function Header () {
  return (
    <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg background mb-3 fixed w-full h-20">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          {/* Logo y nombre de app */}
          <div className="flex">
            <Link to={"/"}>
              <img className="logo" src={logo} alt="Logo" />
            </Link>
          </div>
        </div>
        {/* Parte derecha de Nav */}
        <div>
          <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
            <li className="nav-item">
              {/* GENERATE */}
              <div
                className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75"
              >
                <Link to={"/generate"} activeClassName={"active"}><span className="ml-2 text-indigo-600">Generate</span></Link>
              </div>
            </li>
            <li className="nav-item">
              {/* SHOP */}
              <div
                className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75"
              >
                <Link to={"/shop"} activeClassName={"active"}><span className="ml-2 text-indigo-600">Shop</span></Link>
              </div>
            </li>
            <li className="nav-item">
              {/* ABOUT US */}
              <div
                className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75"
              >
                <span className="ml-2 text-indigo-600">About Us</span>
              </div>
            </li>
            <li className="nav-item">
              <AuthCheck fallback={<SignIn/>}>
                <button className="px-5 py-1 boton hover:bg-indigo-700 text-white font-bold  ml-3">
                  <Link to={"/logout"}>Logout</Link>
                </button>
              </AuthCheck>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

/* BOTON SIGN UP */
function SignIn(){
  return(
    <button className="px-5 py-1 boton hover:bg-indigo-700 text-white font-bold  ml-3">
      <Link to={"/register"}>Sign Up</Link>
    </button>
  );
}