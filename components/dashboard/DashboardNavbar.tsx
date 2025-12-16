"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCommentDots, faSearch } from "@fortawesome/free-solid-svg-icons";

interface DashboardNavbarProps {
  isOpen: boolean;
}

export default function DashboardNavbar({ isOpen }: DashboardNavbarProps) {
  return (
    <header
      className={`h-20 fixed top-0 z-30 transition-all duration-300 backdrop-blur-xl border-2 border-white bg-black rounded-lg m-2
        ${isOpen ? "left-72" : "left-20"} right-0`}
    >
      <div className="h-full px-6 flex items-center justify-between ">
        {/* Left - Search Bar */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block group">
            <div className="absolute inset-0 bg-white rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-white w-4 h-4 transition-colors z-10"
            />
            <input
              type="text"
              placeholder="Rechercher un challenge..."
              className="relative pl-11 pr-4 py-3 w-96 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
            />
          </div>
        </div>

        {/* Right - Notifications */}
        <div className="flex items-center gap-4">
          <button className="relative p-2.5 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white border border-transparent hover:border-white/20 group">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>

          <button className="relative p-2.5 rounded-xl hover:bg-white/10 transition-all text-gray-400 hover:text-white border border-transparent hover:border-white/20 group">
            <FontAwesomeIcon icon={faCommentDots} className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>

        
        </div>
      </div>
    </header>
  );
}