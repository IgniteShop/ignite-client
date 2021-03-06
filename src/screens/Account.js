import React, { useContext, useEffect, useState } from "react";
import "./Account.css";
import ItemAccount from "../components/ItemAccount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
import UserContext from "../UserContextProvider";
import Swal from "sweetalert2";
import { useFirestore, useFirestoreDocData } from 'reactfire';
import withReactContent from "sweetalert2-react-content";
import ProfilePicture from "../img/profile.png";

require("firebase/firestore");
require("firebase/auth");

function Account() {
	const MySwal = withReactContent(Swal);
	const { user, setUser } = useContext(UserContext);
	// const [ images, setImages ] = useState([]);
	const history = useHistory();
	
	let images = useFirestore().collection('users').doc(user.uid);
	images = useFirestoreDocData(images);
	let keys = Object.entries(images);

	return (
		<div className="fit-account flex flex-col pt-20">
			{/* Content */}
			<div className="flex w-screen flex-row h-full">
				{/* Sidebar */}
				<div className="flex w-1/3 flex-col p-10 justify-center text-indigo-600">
					{/* Main Sidebar */}
					<div className="flex justify-center flex-col items-center sidebar-account px-4 py-10 border-box">
						{/* Profile Image */}
						<div className="flex profile__image justify-center mt-5 rounded-full">
							<img
								className="w-48 h-48 md:w-32 md:h-32 xl:w-48 xl:h-48 object-cover overflow-hidden"
								src={ProfilePicture}
								alt="Profile"
							/>
						</div>
						{/* Name */}
						<div className="flex mt-5 name">
							<h1 className="text-2xl text-center">
								{user.name}
							</h1>
						</div>
						{/* Email */}
						<div className="flex flex-col justify-center text-center mt-5 email">
							<h2>E-mail</h2>
							<p>
								{user.email}
								<button className="outline-none" onClick={() => {
									Swal.fire({
										title: 'Enter you new email',
										text: 'Remember this action will log you out. Please log in with your new credentials',
										icon: 'warning',
										input: 'text',
										inputAttributes: {
										autocapitalize: 'off'
										},
										showCancelButton: true,
										confirmButtonText: 'Modify',
										showLoaderOnConfirm: true,
										preConfirm: (email) => {
										firebase.auth().currentUser.updateEmail(email)
										},
										allowOutsideClick: () => !Swal.isLoading()
									})
									}}>
									<FontAwesomeIcon
										className="edit-icon ml-1"
										icon={faEdit}
									/>
								</button>
							</p>
						</div>
						{/* Buttons */}
						<div className="flex flex-col mt-16 mb-5">
							<button className="flex bg-indigo-600 text-white rounded-md font-medium py-2 px-5 justify-center" onClick={() => {
									Swal.fire({
									title: 'Enter your new password',
									text: 'Remember this action will log you out. Please log in with your new credentials',
									icon: 'warning',
									input: 'password',
									inputAttributes: {
										autocapitalize: 'off'
									},
									showCancelButton: true,
									confirmButtonText: 'Modify',
									showLoaderOnConfirm: true,
									preConfirm: (password) => {
										firebase.auth().currentUser.updatePassword(password)
									},
									allowOutsideClick: () => !Swal.isLoading()
									}).then(result => {
									if(result.isConfirmed) {
										Swal.fire({
										position: 'center',
										icon: 'success',
										title: 'Your password has been modified successfully!',
										showConfirmButton: false,
										timer: 1500
										})
									}
									})
								}}>
								Change Password
							</button>
							<button
								className="flex bg-red-600 text-white rounded-md font-medium py-2 px-5 justify-center mt-3"
								onClick={() => {
									firebase
										.auth()
										.signOut()
										.then(function () {
											// Sign-out successful.
											setUser({}); // reset user context
											history.push("/login");
										})
										.catch(function (error) {
											// An error happened.
											MySwal.fire({
												title: <p>An error ocurred!</p>,
												toast: true,
												icon: "error",
												timer: 1500,
												timerProgressBar: true,
												showConfirmButton: false,
												background: "#fff",
												iconColor: "#e84118",
												position: "bottom-end",
											});
										});
								}}
							>
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
							{keys.map((image) => {
								console.log(image)
								if (image[1].canvas) {
									return (<ItemAccount
										key = {image[0]}
										image={
											image[1].shirt
										}
									/>);
								}
							})}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Account;
