import React, { useEffect, useState } from 'react';
import firebase from "firebase";

const UserContext = React.createContext({});

export function UserContextProvider({ children }) {
	const [user, setUser] = useState({})

	const getUserData = async (uid) => {
        const db = firebase.firestore()
        const userRef = db.collection("users").doc(uid)
        const doc = await userRef.get()
        if(doc.exists) {
            const userData = doc.data()
            return userData
        } else {
            alert("User document doesn't exist")
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