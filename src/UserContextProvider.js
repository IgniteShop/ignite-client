import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState({})
    const MySwal = withReactContent(Swal);

	const getUserData = async (uid) => {
        const db = firebase.firestore()
        const userRef = db.collection("users").doc(uid)
        const doc = await userRef.get()
        if(doc.exists) {
            const userData = doc.data()
            return userData
        } else {
            MySwal.fire({
                title: <p>User document doesn't exist</p>,
                toast: true,
                icon: "error",
                timer: 1500,
                timerProgressBar: true,
                showConfirmButton: false,
                background: "#fff",
                iconColor: "#e84118",
                position: 'bottom-end',
            })
        }
    }

	useEffect(() => {
		// firebase.auth().onAuthStateChanged(setUser)
		firebase.auth().onAuthStateChanged(async user => {
            if(user) {
                const userData = await getUserData(user.uid)
                
                setUser({ "email": user.email, "uid": user.uid, "name": userData.name, "gen_left": userData.gens_remaining })
            }
        })
	}, [])

	
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{ children }
		</UserContext.Provider>
	)
}

export default UserContext;