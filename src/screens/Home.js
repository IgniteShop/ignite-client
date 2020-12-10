import React from "react";
import './Home.css';
import background from '../img/home_image.png';

function Home() {
  return (
    <div className="flex h-full w-full image-background">
        <div className="flex pt-20 h-full w-full bg-indigo-700 clip-background">
            <div className="text-white mt-20 ml-32">
                <div className="text-5xl font-bold">
                    <p className="">Products no</p>
                    <p className="">human can</p>
                    <p className="">make</p>
                </div>
                <p className="text-lg font-medium tracking-wide">Come and find what AI has for you!</p>
            </div>
        </div>
    </div>
  );
}

export default Home;
