
import React from 'react';

const PlaneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

const Header: React.FC = () => {
    return (
        <header className="text-center p-4 mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
                <PlaneIcon />
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white tracking-tight">
                    AI Travel Itinerary Generator
                </h1>
            </div>
            <p className="text-md md:text-lg text-gray-500 dark:text-gray-400">
                Craft your next adventure. Just enter a city and let AI do the planning.
            </p>
        </header>
    );
};

export default Header;
