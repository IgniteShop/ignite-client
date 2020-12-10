import './Header.css'
import '../img/generic.png'
import logo from '../img/logo.svg'
import logo_white from '../img/logo_white.svg'
import React, { useContext } from 'react'
import { AuthCheck } from 'reactfire'
import { Link, useLocation } from 'react-router-dom'
import ProfilePicture from '../img/profile.png'

import UserContext from '../UserContextProvider'

export default function Header() {
    const { setUser } = useContext(UserContext)
    const { pathname } = useLocation()
    console.log(pathname)

    /* BOTON SIGN UP */
    function Login() {
        return (
            <button className="px-5 py-1 boton hover:bg-indigo-700 text-white font-bold  ml-3">
                <Link to={'/login'}>Log In</Link>
            </button>
        )
    }

    function Profile() {
        const firebaseLogout = async () => {
            // await firebase.auth().signOut().then(() => {
            //   setUser({});
            // });
        }

        return (
          <Link to="/account">
            <img
                className="text-white font-bold w-10 h-10 bg-white rounded-full hover:w-20 account"
                src={ProfilePicture}
                alt="Profile"
                onClick={firebaseLogout}
            />
          </Link>
        )
    }

    let routes = [
        {
            name: 'Generate',
            link: '/generate',
        },
        {
            name: 'Shop',
            link: '/shop',
        },
        {
            name: 'Cart',
            link: '/cart',
        },
        {
            name: 'About Us',
            link: '/aboutus',
        },
    ]

    if (pathname == '/') {
        return (
            <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg mb-3 fixed w-full h-20 mainPageHeader">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative items-center h-full flex justify-between lg:w-auto lg:static lg:block lg:justify-start header">
                        {/* Logo y nombre de app */}
                        <div className="flex">
                            <Link to={'/'} className="flex items-center w-full h-full">
                                <img
                                    className="logo"
                                    src={logo_white}
                                    alt="Logo"
                                />
                            </Link>
                        </div>
                    </div>
                    {/* Parte derecha de Nav */}
                    <div>
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
                            {routes.map((route) => {
                                return (
                                    <li className="nav-item">
                                        {/* GENERATE */}
                                        <div className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75">
                                            <Link to={route.link}>
                                                <span className="ml-2 text-white mr-2">
                                                    {route.name}
                                                </span>
                                            </Link>
                                        </div>
                                    </li>
                                )
                            })}
                            <li className="nav-item ml-4">
                                <AuthCheck fallback={<Login />}>
                                    <Profile />
                                </AuthCheck>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg background mb-3 fixed w-full h-20">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative items-center h-full flex justify-between lg:w-auto lg:static lg:block lg:justify-start header">
                        {/* Logo y nombre de app */}
                        <div className="flex">
                            <Link to={'/'} className="flex items-center w-full h-full">
                                <img className="logo" src={logo} alt="Logo" />
                            </Link>
                        </div>
                    </div>
                    {/* Parte derecha de Nav */}
                    <div>
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center">
                            {routes.map((route) => {
                                if (route.link == pathname) {
                                    return (
                                        <li className="nav-item ml-4">
                                            {/* GENERATE */}
                                            <div className="px-3 py-2 flex items-center text-sm font-bold leading-snug indigo hover:opacity-75">
                                                <Link to={route.link}>
                                                    <span className="ml-2 text-white mr-2">
                                                        {route.name}
                                                    </span>
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="nav-item ml-4">
                                            {/* GENERATE */}
                                            <div className="px-3 py-2 flex items-center text-sm font-bold leading-snug text-white hover:opacity-75">
                                                <Link to={route.link}>
                                                    <span className="ml-2 text-indigo-600 mr-2">
                                                        {route.name}
                                                    </span>
                                                </Link>
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                            <li className="nav-item ml-4">
                                <AuthCheck fallback={<Login />}>
                                    <Profile />
                                </AuthCheck>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
