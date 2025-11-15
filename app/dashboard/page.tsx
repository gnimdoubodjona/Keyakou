"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy, faChartLine, faUsers, faFire, faCode, faClock } from "@fortawesome/free-solid-svg-icons";

export default function DashboardPage() {
  const stats = [
    {
      icon: faChartLine,
      label: "SCORE MOYEN",
      value: "8.5",
      change: "+0.3 ce mois",
      bgColor: " from-orange-400 to-red-500 text-white",
      shadowColor: "shadow-orange-500/50"
    },
    {
      icon: faTrophy,
      label: "CHALLENGES COMPLÉTÉS",
      value: "89",
      change: "+23% ce mois",
      bgColor: " from-blue-400 to-indigo-500",
      shadowColor: "shadow-blue-500/50"
    },
    {
      icon: faUsers,
      label: "CLASSEMENT",
      value: "#42",
      change: "+8 positions",
      bgColor: " from-purple-400 to-pink-500",
      shadowColor: "shadow-purple-500/50"
    },
  ];

  const recentChallenges = [
    { title: "Binary Search Tree", difficulty: "Medium", language: "Python", score: 95, time: "Il y a 2h" },
    { title: "API RESTful Design", difficulty: "Hard", language: "Node.js", score: 88, time: "Il y a 5h" },
    { title: "React Hooks", difficulty: "Easy", language: "React", score: 100, time: "Hier" },
    { title: "SQL Optimization", difficulty: "Hard", language: "SQL", score: 92, time: "Il y a 2j" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header avec gradient */}
      <div className="mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-3xl"></div>
        <div className="relative">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Challenges Analytics Dashboard
          </h1>
          <p className="text-gray-400">
            Continue à apprendre et challenge-toi ! 🚀
          </p>
        </div>
      </div>

      {/* Stats Cards avec effet double carte */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative"
          >
            {/* Carte arrière - juste le bord qui dépasse */}
            <div className="absolute inset-0 border-2 border-white rounded-3xl translate-x-3 translate-y-3 opacity-40"></div>

            {/* Carte principale */}
            <div className="relative bg-black rounded-3xl p-6 border-2 border-white transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
              {/* Header avec icône */}
              <div className="flex items-start justify-between mb-4">
                <div className="relative">
                  <div className={`absolute inset-0 ${stat.bgColor} rounded-2xl blur-xl opacity-50`}></div>
                  <div className={`relative w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center ${stat.shadowColor} shadow-lg border border-white/20`}>
                    <FontAwesomeIcon icon={stat.icon} className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Contenu */}
              <p className="text-5xl font-black text-white mb-3 tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs text-gray-300 font-bold tracking-wider mb-2">
                {stat.label}
              </p>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-green-500/20 rounded-lg border border-green-500/50">
                  <p className="text-sm text-green-400 font-bold">
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section à deux colonnes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Challenges récents - 2/3 */}
        <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-6 border border-gray-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faFire} className="text-orange-500 w-6 h-6" />
                Challenges Récents
              </h2>
              <button className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-xl text-blue-400 text-sm font-semibold transition-all">
                Voir tout
              </button>
            </div>

            <div className="space-y-3">
              {recentChallenges.map((challenge, index) => (
                <div
                  key={index}
                  className="p-4 bg-black/30 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-gray-700 transition-all group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={faCode} className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">
                          {challenge.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${challenge.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                              'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                            {challenge.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-400">{challenge.language}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">
                        {challenge.score}
                        <span className="text-sm text-gray-500">/100</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                        {challenge.time}
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
                      style={{ width: `${challenge.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Progression du jour - 1/3 */}
        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-3xl p-6 border border-gray-800 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/10 to-transparent"></div>

          <div className="relative">
            <h2 className="text-xl font-bold text-white mb-6">
              Objectif du Jour
            </h2>

            {/* Cercle de progression */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-800"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - 0.75)}`}
                    className="transition-all duration-1000"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">75%</span>
                  <span className="text-xs text-gray-400">Completé</span>
                </div>
              </div>
            </div>

            {/* Liste des objectifs */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-xl border border-green-500/30">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">3 challenges terminés</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-500/30">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm text-gray-300">30 min de code</span>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-xl border border-gray-700">
                <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full"></span>
                </div>
                <span className="text-sm text-gray-500">1 challenge à faire</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
