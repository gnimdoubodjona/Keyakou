"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTrophy,
  faChartLine,
  faCog,
  faChevronDown,
  faRocket,
  faBars,
  faTimes,
  faUser,
  faSignOutAlt,
  faBarsStaggered,
} from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "../auth/LogoutButton";
import Link from "next/link";
import { useAuthSession } from "@/hooks/use-auth-session";
import { useUserChallenges } from "@/hooks/use-user-challenges";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface MenuItem {
  icon: any;
  label: string;
  active?: boolean;
  href?: string;
  submenu?: { label: string; href: string }[];
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, loading: authLoading } = useAuthSession();
  const { challenges, loading: challengesLoading } = useUserChallenges();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  // Fonction pour obtenir les initiales
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Génération du sous-menu dynamique
  const generateChallengeSubmenu = () => {
    const baseSubmenu = [
      { label: "Tous les challenges", href: "/dashboard/liste-challenge" },
      { label: "Mes challenges", href: "/dashboard/mes-challenges" },
      { label: "Exploration", href: "/dashboard/exploration" },
    ];

    const userActiveChallenges = challenges
      .filter(challenge => challenge.isActive)
      .map(challenge => ({
        label: challenge.title,
        href: `/dashboard/serveur-challenge/${challenge.id}`
      }));

    const createChallengeItem = user?.role === "super_admin"
      ? [{ label: "Créer un challenge", href: "/dashboard/creer-challenge" }]
      : [];

    return [...baseSubmenu, ...userActiveChallenges, ...createChallengeItem];
  };

  const baseMenuItems: MenuItem[] = [
    { icon: faHome, label: "Dashboard", href: "/dashboard", active: true },
    { icon: faTrophy, label: "Challenges", submenu: generateChallengeSubmenu(), active: false },
    { icon: faChartLine, label: "Progression", href: "/dashboard/progression", active: false },
  ];

  const adminMenuItems: MenuItem[] =
    user?.role === "super_admin"
      ? [{
          icon: faCog,
          label: "Admin",
          submenu: [
            { label: "Gérer les utilisateurs", href: "/dashboard/admin/users" },
            { label: "Modérer les challenges", href: "/dashboard/admin/moderate" },
          ],
        }]
      : [];

  const menuItems = [...baseMenuItems, ...adminMenuItems];

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  // Gestion du chargement
  if (authLoading || challengesLoading) {
    return (
      <aside className={`fixed left-0 top-0 h-full bg-black border-r border-white/20 transition-all duration-300 z-40 ${isOpen ? "w-72" : "w-20"}`}>
        <div className="h-20 flex items-center justify-center border-b border-white/20">
          {isOpen ? "Chargement..." : "..."}
        </div>
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
    <aside className={`fixed left-0 top-0 h-full bg-black border-r-2 border-white rounded-r-lg transition-all duration-300 z-40 flex flex-col ${isOpen ? "w-72" : "w-20"}`}>
      {/* Header avec Logo et Toggle */}
      <div className="h-20 flex items-center justify-between border-b-2 border-white   px-4">
        {isOpen ? (
          <>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <FontAwesomeIcon icon={faRocket} className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-white">CodeLLenge</span>
            </div>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-white/10 text-white transition-all border border-transparent hover:border-white/20"
            >
              <FontAwesomeIcon icon={faBarsStaggered} className="w-5 h-5" />
            </button>
          </>
        ) : (
          <button
            onClick={toggleSidebar}
            className="w-full flex justify-center p-2 rounded-lg hover:bg-white/10 text-white transition-all"
          >
            
            <FontAwesomeIcon icon={faRocket} className="text-white text-xl" />
          </button>
        )}
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 mt-6 px-3 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <button
                  onClick={() => toggleSubmenu(item.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${
                    item.active ? "bg-white text-black shadow-lg" : "text-white hover:bg-white/5"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  {isOpen && (
                    <>
                      <span className="font-semibold text-base">{item.label}</span>
                      {item.label === "Challenges" && challenges.length > 0 && (
                        <span className="ml-auto bg-green-500 text-black text-xs font-bold px-2 py-1 rounded-full">
                          {challenges.filter(c => c.isActive).length}
                        </span>
                      )}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`w-3 h-3 transition-transform duration-200 ${openSubmenu === item.label ? "rotate-180" : ""}`}
                      />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 relative group ${
                    item.active ? "bg-white text-black shadow-lg" : "text-white hover:bg-white/5"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  {isOpen && <span className="font-semibold text-base">{item.label}</span>}
                </Link>
              )}

              {/* Sous-menu */}
              {item.submenu && isOpen && openSubmenu === item.label && (
                <div className="mt-2 space-y-1">
                  {item.submenu.map((subItem, subIndex) => {
                    const isActiveChallenge = challenges.some(
                      challenge => challenge.title === subItem.label
                    );
                    return (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={`w-full text-left pl-14 pr-4 py-2.5 transition-all text-sm flex items-center gap-3 group relative ${
                          isActiveChallenge ? "text-green-400 hover:text-green-300" : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
                        <div className={`absolute left-[1.875rem] w-2 h-2 rounded-full border-2 bg-black transition-all ${
                          isActiveChallenge ? "border-green-400" : "border-gray-700 group-hover:border-white"
                        }`}></div>
                        <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                          {subItem.label}
                        </span>
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

      {/* Section Profil en bas */}
      {user && (
        <div className="border-t border-white/20 p-3">
          {isOpen ? (
            <div className="relative group">
              {/* Carte profil */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer">
                {user.image ? (
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                    <Image src={user.image} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                    {getInitials(user.name)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-xs text-gray-400">En ligne</p>
                  </div>
                </div>
              </div>

              {/* Dropdown */}
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-black border border-white/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <div className="p-4 border-b border-white/20">
                  <div className="flex items-center gap-3">
                    {user.image ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/20">
                        <Image src={user.image} alt={user.name} width={48} height={48} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
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

                <div className="py-2">
                  <Link href="/dashboard/profile" className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/5 transition-all flex items-center gap-3">
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">Mon profil</span>
                  </Link>
                </div>

                <div className="border-t border-white/20 py-2">
                  <LogoutButton />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              {user.image ? (
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white/20">
                  <Image src={user.image} alt={user.name} width={40} height={40} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {getInitials(user.name)}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}