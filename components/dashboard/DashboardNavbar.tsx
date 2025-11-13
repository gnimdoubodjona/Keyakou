"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell, faSearch, faFire, faStar } from "@fortawesome/free-solid-svg-icons";

interface DashboardNavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function DashboardNavbar({ isOpen, toggleSidebar }: DashboardNavbarProps) {
  return (
    <header
      className={`h-20 fixed top-0 z-30 transition-all duration-300 backdrop-blur-xl border-b border-gray-800 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]
    ${isOpen ? "left-72" : "left-20"} right-0`}
    >

      <div className="h-full px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all text-gray-400 hover:text-white border border-transparent hover:border-blue-500/30"
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="w-5 h-5"
            />
          </button>

          {/* Search Bar améliorée */}
          <div className="relative hidden md:block group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-hover:text-blue-400 w-4 h-4 transition-colors z-10"
            />
            <input
              type="text"
              placeholder="Rechercher un challenge..."
              className="relative pl-11 pr-4 py-3 w-96 bg-[#0f0f0f] border border-gray-800 rounded-xl text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:bg-black transition-all"
            />
          </div>
        </div>

        {/* Center - Streak
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30">
            <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-sm font-bold text-white">12 jours</span>
            <span className="text-xs text-gray-400">de suite!</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-xl border border-yellow-500/30">
            <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-bold text-white">2,340</span>
            <span className="text-xs text-gray-400">XP</span>
          </div>
        </div> */}

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notifications avec badge animé */}
          <button className="relative p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all text-gray-400 hover:text-white border border-transparent hover:border-purple-500/30 group">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5 group-hover:animate-bounce" />
            <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>

          {/* Profile avec dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">John Doe</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-xs text-gray-400">En ligne</p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ring-2 ring-gray-800 group-hover:ring-blue-500 transition-all p-0.5">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center">
                    JD
                  </div>
                </div>
              </div>
            </div>

            {/* Dropdown Menu amélioré */}
            <div className="absolute right-0 top-full mt-3 w-64 bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

              <div className="relative p-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-xs text-gray-400">john.doe@email.com</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <div className="flex-1 text-center py-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-xs text-gray-400">Niveau</p>
                    <p className="text-sm font-bold text-blue-400">12</p>
                  </div>
                  <div className="flex-1 text-center py-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                    <p className="text-xs text-gray-400">Rang</p>
                    <p className="text-sm font-bold text-purple-400">#42</p>
                  </div>
                </div>
              </div>

              <div className="relative py-2">
                <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all flex items-center gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover/item:bg-blue-500 transition-colors">
                    <svg className="w-4 h-4 text-blue-400 group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="font-medium">Mon profil</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all flex items-center gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover/item:bg-purple-500 transition-colors">
                    <svg className="w-4 h-4 text-purple-400 group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">Paramètres</span>
                </button>

                <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gradient-to-r hover:from-green-500/10 hover:to-emerald-500/10 transition-all flex items-center gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center group-hover/item:bg-green-500 transition-colors">
                    <svg className="w-4 h-4 text-green-400 group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium">Aide & Support</span>
                </button>
              </div>

              <div className="relative border-t border-gray-800 py-2">
                <button className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-gradient-to-r hover:from-red-500/20 hover:to-pink-500/20 transition-all flex items-center gap-3 group/item">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center group-hover/item:bg-red-500 transition-colors">
                    <svg className="w-4 h-4 text-red-400 group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span className="font-semibold">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}