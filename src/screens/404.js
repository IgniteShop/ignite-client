import React from "react";
import Icon404 from "../img/404.svg";

export default function Page404() {
    return (
        <div className="fit-cart flex flex-col pt-20">
            <div className="flex w-screen flex-col h-full align-center">
                {/* Title */}
                <div className="w-screen flex justify-center titleBar">
                    <h1 className="text-3xl text-center text-indigo-700 font-bold mt-10">Page not found</h1>
                </div>
                <div className="flex items-center justify-center flex-col h-full mt-10">
                    {/* Image */}
                    <div className="flex justify-center w-5/12">
                        <img className="flex rounded-t-xl" src={Icon404} alt="Page not found" />
                    </div>
                </div>
                {/* Description */}
                <div className="flex flex-col text-center text-gray-600 description mt-10 w-8/12">
                    <h1 className="text-2xl">We couldn't find the page you were looking for :(</h1>
                    <h3>
                        But hey! Keep exploring!
                    </h3>
                </div>
            </div>
        </div>
    );
}