import React from "react";
import "./Generate.css";
import { Link } from "react-router-dom";

function Generate() {

  return (
    <div className="fit__generate flex flex-col mb-4">
      {/* Generate Titles */}
      <div className="flex w-screen justify-center">
        {/* Title */}
        <div className="w-screen flex flex-col justify-center titleBar">
          <h3 className="text-2xl text-center">Create your own image here!</h3>
          <h1 className="text-3xl text-center">Let's make something special</h1>
        </div>
      </div>

      {/* Content */}
      <div className="fit2__generate flex main w-screen">
        {/* Image */}
        <div className="flex w-1/2 justify-center ml-10">
            <div className="flex justify-center generated">
            <img className="generated__image"
              src="https://images.pexels.com/photos/2110951/pexels-photo-2110951.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="My Generated Image"
            />
            </div>
        </div>
        {/* Edition */}
        <div className="flex w-1/2 edition">
            {/* Main */}
            <div className="flex w-full justify-center flex-col">
                {/* Edit Title */}
                <div className="flex w-auto edit__title text-center p-5">
                    <h1 className="text-3xl">Modify your generated image by moving these sliders:</h1>
                </div>
                {/* Sliders */}
                <div className="flex sliders">
                    {/* Slider */}
                    <div className="flex slider justify-evenly">
                        <input type="range" min="0" max="100" value="20" step="1" onInput="rangeValue.innerHTML = this.value"/>
                        <p id="rangeValue" className="actualValue">20</p>
                        <p className="edit__title">Spaloonbaboosness</p>
                    </div>
                    <div className="flex slider justify-evenly mt-3">
                        <input type="range" min="0" max="100" value="20" step="1" onInput="rangeValue.innerHTML = this.value"/>
                        <p id="rangeValue" className="actualValue">20</p>
                        <p className="edit__title">Spaloonbaboosness</p>
                    </div>
                    <div className="flex slider justify-evenly mt-3">
                        <input type="range" min="0" max="100" value="20" step="1" onInput="rangeValue.innerHTML = this.value"/>
                        <p id="rangeValue" className="actualValue">20</p>
                        <p className="edit__title">Spaloonbaboosness</p>
                    </div>
                    <div className="flex slider justify-evenly mt-3">
                        <input type="range" min="0" max="100" value="20" step="1" onInput="rangeValue.innerHTML = this.value"/>
                        <p id="rangeValue" className="actualValue">20</p>
                        <p className="edit__title">Spaloonbaboosness</p>
                    </div>                    
                </div>
                {/* Buttons */}
                <div className="flex justify-evenly mt-10 buttons">
                    <button className="generate__image">Generate Image</button>
                    <button className="save__image">Save Image</button>
                </div>
                {/* Images Left */}
                <div className="flex justify-center mt-5 images__left">
                    <p>After saving this image you’ll have <b>4</b> images left!</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Generate;
