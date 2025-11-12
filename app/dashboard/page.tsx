
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";

// export default async function Dashboard() {

//     const session = await auth.api.getSession({ headers: await headers() });

//     return (
//         <div>
//             <h2>Bienvenu {session?.user.name} </h2>
//             <p>Email :
//                 <strong> {session?.user.email} </strong>
//             </p>
//             <div className="space-y-2">
//                 <p>Email: {session?.user.email}</p>
//                 <p><strong>ID:</strong> {session?.user.id}</p>
//                 {session?.user.image && (
//                     <img
//                         src={session.user.image}
//                         alt="Avatar"
//                         className="w-16 h-16 rounded-full"
//                     />
//                 )}
//             </div>
//         </div>
//     );
// }


"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faTrophy, faChartLine, faDollarSign } from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
  const stats = [
    { 
      icon: faUsers, 
      label: "UTILISATEURS", 
      value: "247", 
      change: "+12% ce mois",
      bgColor: "bg-green-500"
    },
    { 
      icon: faChartLine, 
      label: "SCORE MOYEN", 
      value: "8", 
      change: "+0.3 ce mois",
      bgColor: "bg-orange-500"
    },
    { 
      icon: faTrophy, 
      label: "CHALLENGES", 
      value: "89", 
      change: "+23% ce mois",
      bgColor: "bg-blue-500"
    },
    { 
      icon: faDollarSign, 
      label: "CANDIDATS", 
      value: "156", 
      change: "+8% ce mois",
      bgColor: "bg-red-500"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          CV Analytics Dashboard
        </h1>
        <p className="text-gray-400">
          Vue d'ensemble de vos analyses de CV
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <FontAwesomeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-4xl font-bold text-white mb-2">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 font-medium mb-1">
              {stat.label}
            </p>
            <p className="text-sm text-green-400 font-medium">
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolution des Scores */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">
              Évolution des Scores
            </h2>
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-600">
            Graphique d'évolution
          </div>
        </div>

        {/* Distribution par Secteur */}
        <div className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">
              Distribution par Secteur
            </h2>
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
          <div className="h-64 flex items-center justify-center text-gray-600">
            Graphique de distribution
          </div>
        </div>
      </div>
    </div>
  );
}