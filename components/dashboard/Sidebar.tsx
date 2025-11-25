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
  faPlus, // ⬅️ AJOUTÉ
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../auth/LogoutButton";
import Link from "next/link";
import { useAuthSession } from "@/hooks/use-auth-session";

interface SidebarProps {
  isOpen: boolean;
}

// ⬇️ NOUVELLE INTERFACE POUR LES ITEMS DE MENU
interface MenuItem {
  icon: any;
  label: string;
  active?: boolean;
  href?: string;
  submenu?: { label: string; href: string }[];
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const { user, loading } = useAuthSession();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

 
  // ⬇️ MENU DE BASE POUR TOUT LE MONDE
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
      submenu: [
        {
          label: "Tous les challenges",
          href: "/dashboard/liste-challenge"
        },
        {
          label: "Mes challenges",
          href: "/dashboard/mes-challenges"
        },
        {
          label: "Serveur Challenge",
          href: "/dashboard/serveur-challenge"
        },
        // ✅ AJOUTE CONDITIONNELLEMENT "Créer un challenge" si super_admin
        ...(user?.role === "super_admin"
          ? [{ label: "Créer un challenge", href: "/dashboard/creer-challenge" }]
          : []
        ),
      ],
      active: false,
    },
    {
      icon: faChartLine,
      label: "Progression",
      href: "/dashboard/progression",
      active: false,
    },
  ];

  // ⬇️ TU PEUX MÊME ENLEVER LE MENU ADMIN SI TU VEUX
  // Ou le garder pour d'autres options admin
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

  console.log("📋 Admin menu items:", adminMenuItems); // ← Debug

  // ⬇️ COMBINAISON DES DEUX MENUS
  const menuItems = [...baseMenuItems, ...adminMenuItems];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  if (loading) {
    return (
      <aside
        className={`fixed left-0 top-0 h-full bg-black border-r border-white transition-all duration-300 z-40 ${isOpen ? "w-72" : "w-20"
          }`}
      >
        <div className="h-20 flex items-center justify-center border-b border-white">
          {isOpen ? "Chargement..." : "..."}
        </div>
      </aside>
    );
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-black border-r border-white transition-all duration-300 z-40 ${isOpen ? "w-72" : "w-20"
        }`}
    >
      {/* Logo - TON CODE EXISTANT */}
      <div className="h-20 flex items-center justify-center border-b border-white px-4 relative">
        <div className="absolute inset-0 from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
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
              {/* ⬇️ CONDITION POUR LES ITEMS AVEC SOUS-MENU */}
              {item.submenu ? (
                // Item AVEC sous-menu
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${item.active
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
                    className={`${item.active ? "" : "group-hover:scale-110 transition-transform"
                      }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  </div>
                  {isOpen && (
                    <>
                      <span className="font-semibold text-base">{item.label}</span>
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`w-3 h-3 ml-auto transition-transform duration-200 ${openSubmenu === item.label ? "rotate-180" : ""
                          }`}
                      />
                    </>
                  )}
                </button>
              ) : (
                // Item SANS sous-menu (avec lien)
                <Link
                  href={item.href || "#"}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${item.active
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
                    className={`${item.active ? "" : "group-hover:scale-110 transition-transform"
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

              {/* ⬇️ SOUS-MENU */}
              {item.submenu && isOpen && openSubmenu === item.label && (
                <div className="mt-2 space-y-1 overflow-hidden animate-slideDown">
                  {item.submenu.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className="w-full text-left pl-14 pr-4 py-2.5 text-gray-400 hover:text-white transition-all text-sm flex items-center gap-3 group relative"
                    >
                      {/* Ligne de connexion subtile */}
                      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>

                      {/* Point indicateur */}
                      <div className="absolute left-[1.875rem] w-2 h-2 rounded-full border-2 border-gray-700 bg-black group-hover:border-white group-hover:bg-white transition-all"></div>

                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        {subItem.label}
                      </span>
                    </Link>
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