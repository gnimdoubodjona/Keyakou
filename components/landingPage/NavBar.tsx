"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { useTheme } from "next-themes";



export default function NavBar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    //évite le flash entre ligth/dark à l'hydratation
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <nav className=" backdrop-blur-md  dark:bg-black  transition-all duration-300">
            <div className="max-w-7xl mx-auto px-0 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo et Navigation */}

                    <div className="flex items-center gap-8">
                        <span className="gap-2 text-xl font-bold text-black dark:text-white cursor-pointer hover:opacity-70 transition-opacity duration-200">
                            CodeLLenge
                        </span>
                        <div className="hidden md:flex items-center gap-6">
                            <span className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium">
                                Challenge
                            </span>
                            <span className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium">
                                A propos
                            </span>
                            <span className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors duration-200 font-medium">
                                Contactez nous
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        {/* Toggle Theme */}
                        <button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="p-2.5 rounded-lg   transition-all duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === "dark" ? (
                                <FontAwesomeIcon icon={faSun} className="text-white w-5 h-5" />
                            ) : (
                                <FontAwesomeIcon icon={faMoon} className="text-black w-5 h-5" />
                            )}
                        </button>

                        {/* Lien Connexion */}
                        <span className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium relative group">
                            Connexion
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
