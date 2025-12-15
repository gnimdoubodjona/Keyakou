"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faInfoCircle, faEnvelope, faRightToBracket, faCode, faRocket } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    return (
        <nav className="bg-black backdrop-blur-sm border border-white rounded-2xl  m-4 ">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo et Navigation */}
                    <div className="flex items-center gap-8">
                        <span className="text-xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-200 flex items-center gap-2">
                            <FontAwesomeIcon icon={faRocket} className="text-white" />
                            CodeLLenge
                        </span>

                        <div className="hidden md:flex items-center gap-6">
                            <span className="cursor-pointer text-gray-400 hover:text-white transition-all duration-200 font-medium flex items-center gap-2 group">
                                <FontAwesomeIcon 
                                    icon={faTrophy} 
                                    className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                                />
                                Challenges
                            </span>
                            <span className="cursor-pointer text-gray-400 hover:text-white transition-all duration-200 font-medium flex items-center gap-2 group">
                                <FontAwesomeIcon 
                                    icon={faInfoCircle} 
                                    className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                                />
                                À propos
                            </span>
                            <span className="cursor-pointer text-gray-400 hover:text-white transition-all duration-200 font-medium flex items-center gap-2 group">
                                <FontAwesomeIcon 
                                    icon={faEnvelope} 
                                    className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                                />
                                Contact
                            </span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        {/* Lien Connexion */}
                        <Link 
                            href="/authentication/login" 
                            className="group text-white font-semibold flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-300"
                        >
                            <FontAwesomeIcon 
                                icon={faRightToBracket} 
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                            />
                            Connexion
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}