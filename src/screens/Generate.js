import React, { useEffect, useContext, useState } from "react";
import "./Generate.css";
import UserContext from '../UserContextProvider';
import { useHistory } from "react-router-dom";
import Placeholder from '../img/generated_placeholder.png'

function Generate() {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const [image, setImage] = useState(Placeholder);

  // const getUser = async () => {
  //   return await user
  // }
  // useEffect(() => {
  //   getUser()
  //   if(Object.entries(user).length === 0) {
  //     history.push('login')
  //   }
  // }, [])

  return (
    <div className="fit__generate flex flex-col mb-4 pt-20">
      {/* Generate Titles */}
      <div className="flex w-screen justify-center">
        {/* Title */}
        <div className="w-screen flex flex-col justify-center text-indigo-600">
          <h3 className="text-1xl text-center tracking-tight">Create your own image here!</h3>
          <h1 className="text-2xl text-center">Let's make something special</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex main w-screen h-full px-20 flex-row justify-around">
        {/* Image */}
        <div className="flex w-7/12 justify-center">
            <div className="flex justify-center generated">
            <img className="object-cover overflow-hidden rounded-2xl shadow-sm w-11/12 h-auto"
              src={Placeholder}
              alt="Generated"
            />
            </div>
        </div>
        {/* Edition */}
        <div className="flex w-5/12 edition">
            {/* Main */}
            <div className="flex w-full justify-center flex-col">
                {/* Edit Title */}
                <div className="flex w-full text-center p-5">
                    <h1 className="text-2xl w-full text-center">Generate images, if you like one, save it!</h1>
                </div>
                {/* Buttons */}
                <div className="flex justify-evenly mt-10 buttons">
                    <button className="text-white bg-indigo-600 rounded-md py-2 px-8 hover:bg-indigo-500">Generate Image</button>
                    <button className="text-white bg-green-600 rounded-md py-2 px-8 hover:bg-green-500">Save Image</button>
                </div>
                {/* Images Left */}
                <div className="flex justify-center mt-5 text-indigo-600 text-md">
                    <p>You still have <b>{user.gens_remaining}</b> images left!</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Generate;
