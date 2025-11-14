// components/dashboard/DashboardNavbar.tsx
"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useAuthSession } from "@/hooks/use-auth-session";
import Image from "next/image";
import LogoutButton from "../LogoutButton";

interface DashboardNavbarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function DashboardNavbar({ isOpen, toggleSidebar }: DashboardNavbarProps) {
  const { user, loading } = useAuthSession();

  // Fonction pour obtenir les initiales du nom
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

          {/* Search Bar */}
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

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 transition-all text-gray-400 hover:text-white border border-transparent hover:border-purple-500/30 group">
            <FontAwesomeIcon icon={faBell} className="w-5 h-5 group-hover:animate-bounce" />
            <span className="absolute top-1.5 right-1.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </button>

          {/* Profile avec vraies données */}
          <div className="relative group">
            {loading ? (
              // Skeleton loading
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-gray-700 rounded-full animate-pulse"></div>
              </div>
            ) : user ? (
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white">{user.name}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs text-gray-400">En ligne</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  {user.image ? (
                    <div className="relative w-11 h-11 rounded-full ring-2 ring-white group-hover:ring-white transition-all overflow-hidden">
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={44}
                        height={44}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold ring-2 ring-gray-800 group-hover:ring-blue-500 transition-all">
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Non connecté
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-gray-400">Non connecté</p>
                </div>
                <div className="relative w-11 h-11 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 font-bold ring-2 ring-gray-800">
                  ?
                </div>
              </div>
            )}

            {/* Dropdown Menu avec vraies infos */}
            {user && (
              <div className="absolute right-0 top-full mt-3 w-84 bg-[#0f0f0f] border border-gray-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>

                <div className="relative p-4 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white">
                        <Image
                          src={user.image}
                          alt={user.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {getInitials(user.name)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
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

                {/* Reste du dropdown menu inchangé */}
                <div className="relative py-2">
                  <button className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10 transition-all flex items-center gap-3 group/item">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover/item:bg-blue-500 transition-colors">
                      <svg className="w-4 h-4 text-blue-400 group-hover/item:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span className="font-medium">Mon profil</span>
                  </button>

                  {/* ... autres boutons du dropdown ... */}
                </div>

                <div className="relative border-t border-gray-800 py-2">
                  <LogoutButton />  {/* ← Utilise ton composant ici */}
                </div>
              </div>
            )}


          </div>
        </div>
      </div>
    </header>
  );
}