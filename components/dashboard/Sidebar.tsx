"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faTrophy,
  faChartLine,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: faHome, label: "Dashboard", active: true },
    { icon: faUsers, label: "Utilisateurs", active: false },
    { icon: faTrophy, label: "Challenges", active: false },
    { icon: faChartLine, label: "Analytics", active: false },
    { icon: faCog, label: "Paramètres", active: false },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-[#1a1a1a] border-r border-gray-800 transition-all duration-300 z-40 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-gray-800 px-4">
        {isOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CL</span>
            </div>
            <span className="text-lg font-bold text-white">CodeLLenge</span>
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">CL</span>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-4 px-3">
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              {isOpen && <span className="font-medium text-sm">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Logout */}
       <div className="absolute bottom-6 left-3 right-3">
          <div className="mb-3 px-2">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 group">
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            {isOpen && <span className="font-semibold text-sm">Déconnexion</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}