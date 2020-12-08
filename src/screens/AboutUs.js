import React from "react";
import "./AboutUs.css";
import AboutUsIcon from "../img/AboutUsIcon.png";
import github from "../img/github.png";
import twitter from "../img/twitter.png";
import facebook from "../img/facebook.png";

function AboutUs() {
  return (
    <div className="flex flex-col mb-4 pt-20 h-full justify-center items-center">
      {/* About Us Title */}
      <div className="block flex w-screen flex-col justify-center">
        {/* Title */}
        <div className="w-screen flex justify-center titleBar">
          <h1 className="text-3xl text-center text-indigo-600">About Us</h1>
        </div>
      </div>
      {/* Content */}
      <div className="flex w-screen h-full">
        {/* Info */}
        <div className="flex w-1/2 h-full flex-col">
          {/* Main Info */}
          <div className="flex w-auto h-full flex-col p-10 ml-16">
              <h1 className="w-2/3 text-2xl subtitle ml-10">Who are we?</h1>
              <p className="w-2/3 mt-2 textAboutUs ml-10 text-justify">We are a group of software developer students with one objective: combine art and technology
              to transform the marketing industry. <br/><br/>
              We thrive to grow as a successful online store to satisfy every person's tastes.<br/><br/>
              Take a look at our Shop! We are sure you will find something you'd like to take home and share with your family!
              </p>
          </div>
          {/* Contact */}
          <div className="flex w-screen h-full flex-col">
              <div className="flex w-1/2 h-full flex-col p-10 flex-col ml-16">
                <h1 className="flex w-1/2 text-2xl subtitle ml-10 mt-10">Contact</h1>
                {/* Buttons */}
                <div className="flex w-3/4 h-8 ml-10 mt-5 justify-start items-center">
                    <button className="flex github justify-center items-center"><img className="mr-2" src={github} alt="Github Icon" />Github</button>
                    <button className="flex twitter justify-center items-center ml-10"><img className="mr-2" src={twitter} alt="Twitter Icon" />Twitter</button>
                    <button className="flex facebook justify-center items-center ml-10"><img className="mr-2" src={facebook} alt="Facebook Icon" />Facebook</button>
                </div>
              </div>
          </div>
        </div>
        {/* Image */}
        <div className="flex w-1/2 h-full justify-end items-end">
          <img className="aboutUsIcon" src={AboutUsIcon} alt="About Us Icon" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
