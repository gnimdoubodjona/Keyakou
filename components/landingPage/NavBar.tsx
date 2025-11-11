"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faInfoCircle, faEnvelope, faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    return (
        <nav className="backdrop-blur-md bg-white/5 border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo et Navigation */}
                    <div className="flex items-center gap-8">
                        <span className="gap-2 text-xl font-bold text-black dark:text-white cursor-pointer hover:opacity-70 transition-opacity duration-200">
                            CodeLLenge
                        </span>

                        <div className="hidden md:flex items-center gap-6">
                            <span className="cursor-pointer text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-200 font-medium flex items-center gap-2 group">
                                <FontAwesomeIcon 
                                    icon={faTrophy} 
                                    className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                                />
                                Challenge
                            </span>
                            <span className="cursor-pointer text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-200 font-medium flex items-center gap-2 group">
                                <FontAwesomeIcon 
                                    icon={faInfoCircle} 
                                    className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                                />
                                À propos
                            </span>
                            <span className="cursor-pointer text-black dark:text-gray-300 hover:text-black dark:hover:text-white transition-all duration-200 font-medium flex items-center gap-2 group">
                                <FontAwesomeIcon 
                                    icon={faEnvelope} 
                                    className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                                />
                                Contactez-nous
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                        {/* Lien Connexion */}
                        <Link 
                            href="/authentication/login" 
                            className="cursor-pointer text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium relative group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                        >
                            <FontAwesomeIcon 
                                icon={faRightToBracket} 
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                            />
                            Connexion
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}