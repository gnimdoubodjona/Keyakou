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
  faCode,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: faHome, label: "Dashboard", active: true, gradient: "from-blue-500 to-cyan-500" },
    { icon: faTrophy, label: "Challenges", active: false, gradient: "from-yellow-500 to-orange-500" },
    { icon: faCode, label: "Mes Codes", active: false, gradient: "from-green-500 to-emerald-500" },
    { icon: faChartLine, label: "Progression", active: false, gradient: "from-purple-500 to-pink-500" },
    { icon: faRobot, label: "AI Assistant", active: false, gradient: "from-indigo-500 to-purple-500" },
    { icon: faCog, label: "Paramètres", active: false, gradient: "from-gray-500 to-gray-600" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-r border-gray-800 transition-all duration-300 z-40 ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Logo avec effet glow */}
      <div className="h-20 flex items-center justify-center border-b border-gray-800 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        {isOpen ? (
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">C</span>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeLLenge
              </span>
              <p className="text-xs text-gray-500 font-medium">Learn & Challenge</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">C</span>
            </div>
          </div>
        )}
      </div>

      {/* Menu avec effets */}
      <nav className="mt-6 px-3">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${
                item.active
                  ? "bg-gradient-to-r " + item.gradient + " text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.active && (
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl blur-xl opacity-30 -z-10`}></div>
              )}
              <div className={`${item.active ? '' : 'group-hover:scale-110 transition-transform'}`}>
                <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
              </div>
              {isOpen && (
                <span className="font-semibold text-sm">{item.label}</span>
              )}
              {item.active && isOpen && (
                <div className="ml-auto">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Stats rapides */}
        {isOpen && (
          <div className="mt-2 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
            <p className="text-xs text-gray-400 font-medium mb-2">Ton niveau</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <span className="text-xs text-white font-bold">75%</span>
            </div>
            <p className="text-xs text-gray-500">Niveau 12 • 250 XP restant</p>
          </div>
        )}

        {/* Logout stylisé */}
        <div className="absolute bottom-6 left-3 right-3 ">
          <div className="mb-4 px-2">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 text-red-400 hover:from-red-500 hover:to-pink-500 hover:text-white hover:border-red-500 transition-all duration-300 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
            {isOpen && <span className="font-semibold text-sm relative z-10">Déconnexion</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}