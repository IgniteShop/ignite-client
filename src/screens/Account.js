import React, { useEffect, useState } from "react";
import "./Account.css";
import ItemAccount from "../components/ItemAccount";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';
import firebase from "firebase";
require("firebase/firestore")
require ('firebase/auth')

function Account() {
  const history = useHistory()
  const [userEmail, setUserEmail] = useState("")
  
  useEffect(() => {
    const user = firebase.auth().currentUser
    console.log("USER: ", user.email) 
    setUserEmail(user.email)
  }, [])

  return (
    <div className="fit-account flex flex-col">
      {/* Content */}
      <div className="flex w-screen flex-row h-full">
        {/* Sidebar */}
        <div className="flex w-1/3 flex-col p-10 justify-center">
          {/* Main Sidebar */}
          <div className="flex justify-center flex-col items-center sidebar-account">
            {/* Profile Image */}
            <div className="flex profile__image justify-center mt-5">
              <img
                className="rounded-full"
                src="https://i.pinimg.com/564x/d8/82/59/d88259a42fcc6ee481c879e05b5ff465.jpg"
              />
            </div>
            {/* Name */}
            <div className="flex mt-5 name">
              <h1 className="text-2xl">Jane Doe</h1>
            </div>
            {/* Email */}
            <div className="flex flex-col justify-center text-center mt-5 email">
              <h2>E-mail</h2>
              <p>{ userEmail }<FontAwesomeIcon className="edit-icon ml-1" icon={faEdit} /></p>
            </div>
            {/* Buttons */}
            <div className="flex flex-col mt-16 mb-5">
              <button className="flex change__password justify-center">
                Change Password
              </button>
              <button className="flex signout justify-center mt-5" onClick={() => {
                firebase.auth().signOut().then(function() {
                  // Sign-out successful.
                  history.push("/login")
                }).catch(function(error) {
                  // An error happened.
                  alert(error)
                });
              }}>
                Sign out
              </button>
            </div>
          </div>
        </div>
        {/* Images */}
        <div className="flex w-3/4 flex-col justify-center">
          {/* Main Images */}
          <div className="flex flex-col images-account">
            {/* Account */}
            <div className="flex account ml-5">
              <h1 className="text-3xl">Account</h1>
            </div>
            {/* Saved Images */}
            <div className="flex mt-5 ml-5 saved-images">
              <h2 className="text-xl">Saved Images</h2>
            </div>
            {/* Images */}
            <div className="mt-5 h-full image-container">
              <ItemAccount
                id="1"
                title={"Noto Space"}
                image={
                  "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }
              />
              <ItemAccount
                id="1"
                title={"Noto Space"}
                image={
                  "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }
              />
              <ItemAccount
                id="1"
                title={"Noto Space"}
                image={
                  "https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
