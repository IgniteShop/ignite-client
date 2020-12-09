import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tailwind.output.css';
import { FirebaseAppProvider } from "reactfire";
import config from "./configuration";
import firebase from "firebase";
import { UserContextProvider } from './UserContextProvider';

firebase.initializeApp({
apiKey: "AIzaSyD0NnEGGu78deRRDHzEbsHGtIQLd8i5wTg",
authDomain: "ignite-8f4e2.firebaseapp.com",
databaseURL: "https://ignite-8f4e2.firebaseio.com",
projectId: "ignite-8f4e2",
storageBucket: "ignite-8f4e2.appspot.com",
messagingSenderId: "432936860462",
appId: "1:432936860462:web:2d1b8c27169d0a401098bf",
measurementId: "G-CSHXPLGNF4"
})

ReactDOM.render(
  <React.StrictMode>
      <FirebaseAppProvider firebaseConfig={config}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
