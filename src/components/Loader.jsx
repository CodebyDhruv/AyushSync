import React from 'react';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/heart_beat.json';


const Loader = () => {
    return (
        <div className="fixed inset-0 bg-white flex min-h-screen justify-center items-center">
            <Lottie
                animationData={loaderAnimation}
                loop={true}
                style={{ width: 400, height: 400 }}
            />
        </div>
    );
};

export default Loader;
