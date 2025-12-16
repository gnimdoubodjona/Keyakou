"use client";
import React, { useState, useEffect } from "react";
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
  faPlus,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../auth/LogoutButton";
import Link from "next/link";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useUserChallenges } from "@/hooks/use-user-challenges"; // ⬅️ IMPORT DU HOOK

interface SidebarProps {
  isOpen: boolean;
}

interface MenuItem {
  icon: any;
  label: string;
  active?: boolean;
  href?: string;
  submenu?: { label: string; href: string }[];
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { user, loading: authLoading } = useAuthSession();
  const { challenges, loading: challengesLoading } = useUserChallenges(); // ⬅️ UTILISATION DU HOOK
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // ⬇️ FONCTION POUR GÉNÉRER LE SOUS-MENU DYNAMIQUE
  const generateChallengeSubmenu = () => {
    const baseSubmenu = [
      {
        label: "Tous les challenges",
        href: "/dashboard/liste-challenge"
      },
      {
        label: "Mes challenges",
        href: "/dashboard/mes-challenges"
      },
      {
        label:"Exploration",
        href: "/dashboard/exploration"
      },
    ];

    // ⬇️ AJOUTER LES CHALLENGES ACTIFS DE L'UTILISATEUR
    const userActiveChallenges = challenges
      .filter(challenge => challenge.isActive)
      .map(challenge => ({
        label: challenge.title, // ⬅️ LE VRAI NOM DU CHALLENGE !
        href: `/dashboard/serveur-challenge/${challenge.id}`
      }));

    // ⬇️ AJOUTER "CRÉER UN CHALLENGE" POUR LES SUPER_ADMIN
    const createChallengeItem = user?.role === "super_admin"
      ? [{ label: "Créer un challenge", href: "/dashboard/creer-challenge" }]
      : [];

    return [...baseSubmenu, ...userActiveChallenges, ...createChallengeItem];
  };

  // ⬇️ MENU DE BASE AVEC CHALLENGES DYNAMIQUES
  const baseMenuItems: MenuItem[] = [
    {
      icon: faHome,
      label: "Dashboard",
      href: "/dashboard",
      active: true,
    },
    {
      icon: faTrophy,
      label: "Challenges",
      submenu: generateChallengeSubmenu(), // ⬅️ SOUS-MENU DYNAMIQUE ICI
      active: false,
    },
    {
      icon: faChartLine,
      label: "Progression",
      href: "/dashboard/progression",
      active: false,
    },
  ];

  // ⬇️ MENU ADMIN (INCHANGÉ)
  const adminMenuItems: MenuItem[] =
    user?.role === "super_admin"
      ? [
          {
            icon: faCog,
            label: "Admin",
            submenu: [
              {
                label: "Gérer les utilisateurs",
                href: "/dashboard/admin/users"
              },
              {
                label: "Modérer les challenges",
                href: "/dashboard/admin/moderate"
              },
            ],
          },
        ]
      : [];

  // ⬇️ COMBINAISON DES MENUS
  const menuItems = [...baseMenuItems, ...adminMenuItems];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  // ⬇️ GESTION DU CHARGEMENT COMBINÉ
  if (authLoading || challengesLoading) {
    return (
      <aside
        className={`fixed left-0 top-0 h-full bg-black border-r border-white transition-all duration-300 z-40 ${
          isOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="h-20 flex items-center justify-center border-b border-white">
          {isOpen ? "Chargement..." : "..."}
        </div>
        {/* SQUELETTE DE CHARGEMENT POUR LE MENU */}
        {isOpen && (
          <div className="p-4 space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-800 rounded-xl animate-pulse"></div>
            ))}
          </div>
        )}
      </aside>
    );
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-black border-r border-white transition-all duration-300 z-40 ${
        isOpen ? "w-72" : "w-20"
      }`}
    >
      {/* Logo - CODE EXISTANT */}
      <div className="h-20 flex items-center justify-center border-b border-white px-4 relative rounded-tl-lg">
        <div className="absolute inset-0 from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        {isOpen ? (
          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="absolute inset-0  rounded-xl blur-lg opacity-50"></div>
              <div className="relative w-12 h-12  rounded-xl flex items-center justify-center shadow-lg">
                
              
                <span className="text-white font-bold text-xl font-mono">
                  <FontAwesomeIcon icon={faRocket} className="text-white" />
                </span>


              </div>
            </div>
            <div>
              <span className="text-2xl font-sans font-bold bg-white from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CodeLLenge
              </span>
              {/* <p className="text-xs text-gray-500 font-medium">Learn & Challenge</p> */}
            </div>
          </div>
        ) : (
          <div className="relative">
            <div className="absolute inset-0 bg-white from-blue-500 to-purple-600 rounded-xl blur-lg opacity-50"></div>
            <div className="relative w-12 h-12 bg-white from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              {/* <span className="text-black font-bold text-xl">C</span> */}
              <span className="text-black font-bold text-xl font-mono">
                  <FontAwesomeIcon icon={faRocket} className="text-black" />
                </span>
            </div>
          </div>
        )}
      </div>

      {/* Menu avec effets */}
      <nav className="mt-6 px-3 overflow-y-auto h-[calc(100vh-200px)]">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {/* CONDITION POUR LES ITEMS AVEC SOUS-MENU */}
              {item.submenu ? (
                // Item AVEC sous-menu
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${
                    item.active
                      ? "bg-white text-black shadow-lg"
                      : "text-white hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.active && (
                    <div
                      className={`absolute inset-0 rounded-xl blur-xl opacity-30 -z-10`}
                    ></div>
                  )}
                  <div
                    className={`${
                      item.active ? "" : "group-hover:scale-110 transition-transform"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  </div>
                  {isOpen && (
                    <>
                      <span className="font-semibold text-base">{item.label}</span>
                      {/* BADGE POUR MONTRER LE NOMBRE DE CHALLENGES ACTIFS */}
                      {item.label === "Challenges" && challenges.length > 0 && (
                        <span className="ml-auto bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                          {challenges.filter(c => c.isActive).length}
                        </span>
                      )}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`w-3 h-3 transition-transform duration-200 ${
                          openSubmenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </>
                  )}
                </button>
              ) : (
                // Item SANS sous-menu (avec lien)
                <Link
                  href={item.href || "#"}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${
                    item.active
                      ? "bg-white text-black shadow-lg"
                      : "text-white hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.active && (
                    <div
                      className={`absolute inset-0 rounded-xl blur-xl opacity-30 -z-10`}
                    ></div>
                  )}
                  <div
                    className={`${
                      item.active ? "" : "group-hover:scale-110 transition-transform"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  </div>
                  {isOpen && (
                    <>
                      <span className="font-semibold text-base">{item.label}</span>
                      {item.active && (
                        <div className="ml-auto">
                          <div className="w-2 h-2 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </>
                  )}
                </Link>
              )}

              {/* SOUS-MENU */}
              {item.submenu && isOpen && openSubmenu === item.label && (
                <div className="mt-2 space-y-1 overflow-hidden animate-slideDown">
                  {item.submenu.map((subItem, subIndex) => {
                    // STYLE SPÉCIAL POUR LES CHALLENGES ACTIFS
                    const isActiveChallenge = challenges.some(
                      challenge => challenge.title === subItem.label
                    );
                    
                    return (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={`w-full text-left pl-14 pr-4 py-2.5 transition-all text-sm flex items-center gap-3 group relative ${
                          isActiveChallenge 
                            ? "text-green-400 hover:text-green-300" 
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        {/* Ligne de connexion subtile */}
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

                        {/* Point indicateur - vert pour les challenges actifs */}
                        <div className={`absolute left-[1.875rem] w-2 h-2 rounded-full border-2 bg-black transition-all ${
                          isActiveChallenge
                            ? "border-green-400 group-hover:border-green-300 group-hover:bg-green-300"
                            : "border-gray-700 group-hover:border-white group-hover:bg-white"
                        }`}></div>

                        <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                          {subItem.label}
                        </span>

                        {/* Indicateur de challenge actif */}
                        {isActiveChallenge && (
                          <div className="ml-auto w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </Link>
                    );
                  })}
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