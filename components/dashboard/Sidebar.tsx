"use client";
import React, { useState } from "react";
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
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../auth/LogoutButton";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const menuItems = [
    { 
      icon: faHome, 
      label: "Dashboard", 
      active: true, 
      gradient: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: faTrophy, 
      label: "Challenges", 
      active: false, 
      gradient: "from-yellow-500 to-orange-500",
      submenu: [
        { label: "Créer un challenge", href: "/challenges/create" },
      ]
    },
    { 
      icon: faCode, 
      label: "Mes Codes", 
      active: false, 
      gradient: "from-green-500 to-emerald-500",
      submenu: [
        { label: "Projets récents", href: "/codes/recent" },
        { label: "Favoris", href: "/codes/favoris" },
        { label: "Archives", href: "/codes/archives" },
      ]
    },
    { 
      icon: faChartLine, 
      label: "Progression", 
      active: false, 
      gradient: "from-purple-500 to-pink-500" 
    },
    { 
      icon: faRobot, 
      label: "AI Assistant", 
      active: false, 
      gradient: "from-indigo-500 to-purple-500" 
    },
    { 
      icon: faCog, 
      label: "Paramètres", 
      active: false, 
      gradient: "from-gray-500 to-gray-600" 
    },
  ];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

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
                <span className="text-white font-bold text-xl font-mono">C</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-sans font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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
      <nav className="mt-6 px-3 overflow-y-auto h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => item.submenu && toggleSubmenu(item.label)}
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
                  <>
                    <span className="font-semibold text-base">{item.label}</span>
                    {item.submenu && (
                      <FontAwesomeIcon 
                        icon={faChevronDown} 
                        className={`w-3 h-3 ml-auto transition-transform duration-200 ${
                          openSubmenu === item.label ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </>
                )}
                {item.active && isOpen && !item.submenu && (
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>

              {/* Sous-menu */}
              {item.submenu && isOpen && openSubmenu === item.label && (
                <div className="mt-2 ml-4 space-y-1 overflow-hidden">
                  {item.submenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="w-full text-left px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                      {subItem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats rapides */}
        {/* {isOpen && (
          <div className="mt-4 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
            <p className="text-xs text-gray-400 font-medium mb-2">Ton niveau</p>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
              <span className="text-xs text-white font-bold">75%</span>
            </div>
            <p className="text-xs text-gray-500">Niveau 12 • 250 XP restant</p>
          </div>
        )} */}

        {/* Logout stylisé */}
        <div className="mt-6">
          {isOpen ? <LogoutButton /> : null}
        </div>
      </nav>
    </aside>
  );
}