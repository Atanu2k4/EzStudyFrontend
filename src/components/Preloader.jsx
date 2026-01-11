import React, { useState, useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Start fade out slightly before the parent removes the component (5s - 500ms)
        const timeout = setTimeout(() => setIsVisible(false), 4500);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900 transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 scale-110 pointer-events-none'} p-4`}>
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] aspect-square flex items-center justify-center overflow-hidden">
            <div className="relative z-10 w-full h-full">
                <DotLottieReact
                    src="https://lottie.host/940d982d-7f6f-4100-b740-e874954cea02/HIYUCWcoQJ.lottie"
                    loop
                    autoplay
                    className="w-full h-full object-contain drop-shadow-2xl"
                </div>
            </div>

            {/* Loading Text */}
            <div className="mt-8 text-center space-y-2">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-500 to-red-400 text-transparent bg-clip-text animate-pulse font-['Cambria_Math']">
                    EzStudy
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium tracking-widest uppercase font-['Cambria_Math']">
                    Opening Your Bookshelf...
                </p>
            </div>

            {/* Progress bar simulation */}
            <div className="mt-6 w-48 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-[loading_2s_ease-in-out_infinite]"></div>
            </div>
        </div>
    );
};

export default Preloader;
