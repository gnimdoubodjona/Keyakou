"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";

interface DashboardNavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function DashboardNavbar({ isOpen, toggleSidebar }: DashboardNavbarProps) {
  return (
    <header
      className="h-20 bg-[#1a1a1a] border-b border-gray-800 fixed right-0 left-0 z-30 transition-all duration-300"
      style={{ marginLeft: isOpen ? "16rem" : "5rem" }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="w-5 h-5"
            />
          </button>

          {/* Search */}
          <div className="relative hidden md:block">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-11 pr-4 py-2.5 w-80 bg-[#0f0f0f] border border-gray-800 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-700 transition-colors"
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2.5 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-white">John Doe</p>
              <p className="text-xs text-gray-500">Administrateur</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}