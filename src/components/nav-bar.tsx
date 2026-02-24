'use client';

import React, { useEffect, useState } from "react";
import Profile from "./Profile";

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 px-3.5 py-2 w-full z-20 transition-colors duration-300 ${isScrolled ? 'backdrop-blur-md' : 'bg-transparent'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center text-white space-x-2">
                    <img src="/assets/logo.svg" alt="logo" width={40} height={40} className="w-10" />
                    <div className="relative w-20 h-10">
                        <img
                            src="/assets/logo-text.svg"
                            alt="logo_text"
                            sizes="(max-width: 640px) 80px, 100vw"
                            className="object-contain"
                        />
                    </div>
                </div>
                <div className="flex space-x-2 items-center">
                    <Profile />
                </div>
            </div>
        </nav>
    );
}
