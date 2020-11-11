import "./Header.css";
import logo from "../img/logo.png";
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';

class Header extends Component {
  render() {
    return (
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg background mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            {/* Logo y nombre de app */}
            <div class="flex">
              <img src={logo} alt="Logo" />
              <a
                className="ignite text-lg font-bold leading-relaxed inline-block ml-2 mr-4 py-2 whitespace-no-wrap"
                href="#home"
              >
              <Link to={'/'}>Ignite</Link>
              </a>
            </div>
          </div>
          {/* Parte derecha de Nav */}
          <div>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
              <li className="nav-item">
                {/* GENERATE */}
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#generate"
                >
                  <span className="ml-2">Generate</span>
                </a>
              </li>
              <li className="nav-item">
                {/* SHOP */}
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#shop"
                >
                  <span className="ml-2">Shop</span>
                </a>
              </li>
              <li className="nav-item">
                {/* ABOUT US */}
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#aboutus"
                >
                  <span className="ml-2">About Us</span>
                </a>
              </li>
              <li className="nav-item">
                {/* BOTON SIGN UP */}
                <button class="px-5 py-1 boton hover:bg-indigo-700 text-white font-bold  ml-3">
                  <Link to={'/register'}>Sign Up</Link>                  
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
