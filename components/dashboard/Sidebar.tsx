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
      // gradient: "from-blue-500 to-cyan-500" 
    },
    {
      icon: faTrophy,
      label: "Challenges",
      active: false,
      // gradient: "from-yellow-500 to-orange-500",
      submenu: [
        { label: "Créer un challenge", href: "/dashboard/creer-challenge" },
      ]
    },


    {
      icon: faChartLine,
      label: "Progression",
      active: false,
      // gradient: "from-purple-500 to-pink-500" 
    },



  ];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-black from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] border-r border-white transition-all duration-300 z-40 ${isOpen ? "w-72" : "w-20"
        }`}
    >
      {/* Logo avec effet glow */}
      <div className="h-20 flex items-center justify-center border-b border-white px-4 relative">
        <div className="absolute inset-0  from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        {isOpen ? (
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-white from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
              <div className="relative w-12 h-12 bg-gray from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl font-mono">C</span>
              </div>
            </div>
            <div>
              <span className="text-2xl font-sans font-bold bg-white from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeLLenge
              </span>
              <p className="text-xs text-gray-500 font-medium">Learn & Challenge</p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-white from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
            <div className="relative w-12 h-12 bg-white from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-xl">C</span>
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
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${item.active
                  ? "bg-white " + " text-black shadow-lg"
                  : "text-white hover:text-white hover:bg-white/5"
                  }`}
              >
                {item.active && (
                  <div className={`absolute inset-0 rounded-xl blur-xl opacity-30 -z-10`}></div>
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
                        className={`w-3 h-3 ml-auto transition-transform duration-200 ${openSubmenu === item.label ? 'rotate-180' : ''
                          }`}
                      />
                    )}
                  </>
                )}
                {item.active && isOpen && !item.submenu && (
                  <div className="ml-auto">
                    <div className="w-2 h-2  rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>

              {/* Sous-menu */}
              {/* Sous-menu - Version vraiment pro */}
              {item.submenu && isOpen && openSubmenu === item.label && (
                <div className="mt-2 space-y-1 overflow-hidden animate-slideDown">
                  {item.submenu.map((subItem, subIndex) => (
                    <button
                      key={subIndex}
                      className="w-full text-left pl-14 pr-4 py-2.5 text-gray-400 hover:text-white transition-all text-sm flex items-center gap-3 group relative"
                    >
                      {/* Ligne de connexion subtile */}
                      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

                      {/* Point indicateur */}
                      <div className="absolute left-[1.875rem] w-2 h-2 rounded-full border-2 border-gray-700 bg-black group-hover:border-white group-hover:bg-white transition-all"></div>

                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        {subItem.label}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Logout stylisé */}
      <div className="mt-6">
        {isOpen ? <LogoutButton /> : null}
      </div>

    </aside>
  );
}