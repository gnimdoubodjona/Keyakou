"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faCode,
  faFire,
  faClock,
  faUsers,
  faChartLine,
  faStar,
  faArrowUp,
  faArrowDown,
  faCheckCircle,
  faCrown,
  faMedal,
} from "@fortawesome/free-solid-svg-icons";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ServeurChallenge() {
  // Données simulées pour l'exemple
  const challengeInfo = {
    titre: "Challenge Full Stack 2024",
    progression: 67,
    rang: 3,
    totalParticipants: 24,
    streakJours: 12,
    tasksCompleted: 8,
    totalTasks: 12,
  };

  // Données pour le Radar Chart (compétences)
  const skillsData = [
    { skill: "Frontend", vous: 85, moyenne: 65, fullMark: 100 },
    { skill: "Backend", vous: 70, moyenne: 75, fullMark: 100 },
    { skill: "Database", vous: 90, moyenne: 60, fullMark: 100 },
    { skill: "Testing", vous: 60, moyenne: 55, fullMark: 100 },
    { skill: "DevOps", vous: 75, moyenne: 70, fullMark: 100 },
    { skill: "UI/UX", vous: 80, moyenne: 50, fullMark: 100 },
  ];

  const leaderboard = [
    { rank: 1, name: "Alice Dev", points: 2450, avatar: "AD", change: 0 },
    { rank: 2, name: "Bob Code", points: 2380, avatar: "BC", change: 1 },
    { rank: 3, name: "Vous", points: 2210, avatar: "XR", change: -1, isYou: true },
    { rank: 4, name: "Charlie JS", points: 2150, avatar: "CJ", change: 0 },
    { rank: 5, name: "Diana React", points: 2080, avatar: "DR", change: 2 },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header avec info challenge */}
        <div className="bg-white rounded-3xl p-8 mb-6 border-2 border-white">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-black rounded-xl flex items-center justify-center border-2 border-black">
                <FontAwesomeIcon icon={faCode} className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-sans text-black">{challengeInfo.titre}</h1>
                <p className="text-gray-600 text-sm mt-1">En cours • 18 jours restants</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2 mb-2">
                <FontAwesomeIcon icon={faTrophy} className="w-6 h-6 text-yellow-500" />
                <div className="text-4xl font-bold text-black">#{challengeInfo.rang}</div>
              </div>
              <div className="text-sm text-gray-600">Votre rang</div>
            </div>
          </div>

          {/* Barre de progression */}
          <div>
            <div className="flex justify-between text-sm mb-2 text-black">
              <span>Progression globale</span>
              <span className="font-bold">{challengeInfo.progression}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-500"
                style={{ width: `${challengeInfo.progression}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Grid Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {/* Streak */}
          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <FontAwesomeIcon icon={faFire} className="w-6 h-6 text-orange-500" />
              <span className="text-3xl font-bold">{challengeInfo.streakJours}</span>
            </div>
            <p className="text-gray-400 text-sm font-sans">Jours consécutifs</p>
          </div>

          {/* Tasks */}
          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-green-500" />
              <span className="text-3xl font-bold">{challengeInfo.tasksCompleted}/{challengeInfo.totalTasks}</span>
            </div>
            <p className="text-gray-400 text-sm font-sans">Tâches complétées</p>
          </div>

          {/* Participants */}
          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-blue-500" />
              <span className="text-3xl font-bold">{challengeInfo.totalParticipants}</span>
            </div>
            <p className="text-gray-400 text-sm font-sans">Participants actifs</p>
          </div>

          {/* Temps */}
          <div className="bg-black border-2 border-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <FontAwesomeIcon icon={faClock} className="w-6 h-6 text-purple-500" />
              <span className="text-3xl font-bold">32h</span>
            </div>
            <p className="text-gray-400 text-sm font-sans">Temps investi</p>
          </div>
        </div>

        {/* Layout Principal - 2 colonnes côte à côte */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Colonne Gauche : Classement + Profil */}
          <div className="space-y-6">
            {/* Classement */}
            <div className="bg-black border-2 border-white rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faCrown} className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold font-sans">Classement des Challengers</h2>
                </div>
                <button className="text-sm text-gray-400 hover:text-white transition">
                  Voir tout →
                </button>
              </div>

              <div className="space-y-3">
                {leaderboard.map((user) => (
                  <div
                    key={user.rank}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                      user.isYou
                        ? "bg-gradient-to-r from-white to-gray-100 border-2 border-yellow-400"
                        : "bg-gray-900/50 hover:bg-gray-900 border border-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Rang avec médaille */}
                      <div className="w-8 text-center">
                        {user.rank <= 3 ? (
                          <div className="relative">
                            <FontAwesomeIcon
                              icon={faMedal}
                              className={`w-6 h-6 ${
                                user.rank === 1
                                  ? "text-yellow-400"
                                  : user.rank === 2
                                  ? "text-gray-400"
                                  : "text-orange-600"
                              }`}
                            />
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-black">
                              {user.rank}
                            </span>
                          </div>
                        ) : (
                          <span className={`font-bold text-lg ${user.isYou ? "text-black" : "text-gray-500"}`}>
                            {user.rank}
                          </span>
                        )}
                      </div>

                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold border-2 ${
                        user.isYou ? "bg-black text-white border-yellow-400" : "bg-white text-black border-gray-300"
                      }`}>
                        {user.avatar}
                      </div>

                      {/* Nom et Points */}
                      <div>
                        <p className={`font-semibold ${user.isYou ? "text-black" : "text-white"}`}>
                          {user.name}
                        </p>
                        <p className={`text-sm ${user.isYou ? "text-gray-700" : "text-gray-400"}`}>
                          {user.points.toLocaleString()} points
                        </p>
                      </div>
                    </div>

                    {/* Changement rang */}
                    <div className="flex items-center gap-2">
                      {user.change !== 0 && (
                        <div
                          className={`flex items-center gap-1 text-sm font-bold px-2 py-1 rounded ${
                            user.change > 0 
                              ? "bg-green-500/20 text-green-400" 
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={user.change > 0 ? faArrowUp : faArrowDown}
                            className="w-3 h-3"
                          />
                          {Math.abs(user.change)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Votre profil */}
            <div className="bg-black border-2 border-white rounded-3xl p-6">
              <h3 className="text-lg font-bold mb-4 font-sans">Votre Profil</h3>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center text-3xl font-bold mb-3 border-2 border-white text-black">
                  XR
                </div>
                <p className="font-bold text-xl mb-1">Xavier R.</p>
                <div className="flex items-center gap-2 text-yellow-500 mb-4">
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                  <span className="font-bold">2,210 pts</span>
                </div>
                <div className="w-full grid grid-cols-2 gap-3">
                  <button className="py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition">
                    Voir profil
                  </button>
                  <button className="py-2 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10 transition">
                    Partager
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Radar Chart avec analyse détaillée */}
          <div className="bg-black border-2 border-white rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold font-sans">Analyse des Compétences</h2>
            </div>

            {/* Radar Chart */}
            <div className="h-80 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#ffffff" strokeWidth={1} strokeOpacity={0.3} />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fill: '#ffffff', fontSize: 12, fontWeight: 'bold' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#9ca3af', fontSize: 10 }}
                    strokeOpacity={0.5}
                  />
                  <Radar
                    name="Vos compétences"
                    dataKey="vous"
                    stroke="#fbbf24"
                    fill="#fbbf24"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Moyenne générale"
                    dataKey="moyenne"
                    stroke="#6b7280"
                    fill="#6b7280"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Legend 
                    wrapperStyle={{ 
                      paddingTop: '20px',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }}
                    iconType="circle"
                    iconSize={8}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Légende détaillée des compétences */}
            <div className="grid grid-cols-2 gap-4">
              {skillsData.map((skill, index) => (
                <div key={skill.skill} className="bg-gray-900/50 rounded-xl p-3 border border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm">{skill.skill}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm font-bold">{skill.vous}</span>
                      <span className="text-gray-400 text-xs">/100</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.vous}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Moyenne: {skill.moyenne}</span>
                    <span className={skill.vous > skill.moyenne ? "text-green-400" : "text-red-400"}>
                      {skill.vous > skill.moyenne ? `+${skill.vous - skill.moyenne}` : skill.vous - skill.moyenne}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}