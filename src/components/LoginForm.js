import React, { useState } from "react";
import { LocalForm, Control, Errors } from "react-redux-form";
import { useAuth } from "reactfire";
import 'firebase/auth';
import 'firebase/database';

function LoginForm(){
    const auth = useAuth();

    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const required = (value) => value && value.length;
    const validEmail = (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

    const Login = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((result) => {console.log(result);})
        .catch((error) => {alert(error)});
    };

    return(
        <LocalForm onSubmit={Login}>
            <div className="login px-32 py-5 flex flex-col">
                <Control.text 
                    className="px-5 py-2" 
                    placeholder="Email" 
                    validators={{validEmail}}
                    model=".email" 
                    onChange={event => setEmail(event.target.value)}
                />
                <Errors
                className="" show="touched" model=".email" messages={{
                    validEmail: "Please enter a valid email"
                }}/>
                <Control.text 
                    type="password" 
                    className="px-5 py-2 mt-5" 
                    placeholder="Password" 
                    validators={{required}} 
                    model=".password" 
                    onChange={event => setPassword(event.target.value)}
                />
                <Errors
                className="" show="touched" model=".password" messages={{
                    required: "Please enter your password"
                }}/>
            </div>
            <div className="px-32 py-5 flex flex-col botones">
              <button className="px-5 py-3 boton_verde" type="submit">Login</button>
              <button className="px-5 py-3 boton_naranja mt-5 ">
                Login with DuckDuckGo
              </button>
            </div>
        </LocalForm>
    );
}

export default LoginForm;