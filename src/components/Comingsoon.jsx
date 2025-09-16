import React from "react";
import Coming_Soon from "../assets/Coming_Soon.json";
import Lottie from "lottie-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Comingsoon = () => {
    return (
        <>
        <Navbar />
        <div className="bg-white flex flex-col justify-center items-center min-h-screen">
                <h2 className='text-3xl sm:text-4xl lg:text-5xl mt-40 font-bold tracking-tight text-gray-900 font-spline mb-6'>
                    This page is under <span className="text-green-600">Development... </span>
                </h2>
                <div>          
                <Lottie
                    animationData={Coming_Soon}
                    loop={true}
                    style={{ width: "100%", maxWidth: 400, height: 400 }}
                /></div>

        </div>
        <Footer/>
        </>
    );
};

export default Comingsoon;
