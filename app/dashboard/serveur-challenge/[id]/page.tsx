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

  const recentActivity = [
    { task: "Créer API REST", points: 250, time: "il y a 2h" },
    { task: "Tests unitaires", points: 150, time: "il y a 5h" },
    { task: "UI Dashboard", points: 200, time: "Hier" },
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
                <p className="text-gray-600 text-sm mt-1">
                  <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-1" />
                  En cours • 18 jours restants
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-black">#{challengeInfo.rang}</div>
              <div className="text-sm text-gray-600">Votre rang</div>
            </div>
          </div>

          {/* Barre de progression */}
          <div>
            <div className="flex justify-between text-sm mb-2 text-black font-sans">
              <span className="flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
                Progression globale
              </span>
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

        {/* Deux colonnes principales */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2 bg-black border-2 border-white rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-white" />
                <h2 className="text-2xl font-bold font-sans">Classement</h2>
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
                      ? "bg-white border-2 border-white"
                      : "bg-gray-900/50 hover:bg-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rang */}
                    <div className="w-8 text-center">
                      {user.rank <= 3 ? (
                        <FontAwesomeIcon
                          icon={faTrophy}
                          className={`w-5 h-5 ${
                            user.rank === 1
                              ? "text-yellow-400"
                              : user.rank === 2
                              ? "text-gray-400"
                              : "text-orange-600"
                          }`}
                        />
                      ) : (
                        <span className={`font-bold ${user.isYou ? "text-black" : "text-gray-500"}`}>
                          {user.rank}
                        </span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                      user.isYou ? "bg-black text-white" : "bg-white text-black"
                    }`}>
                      {user.avatar}
                    </div>

                    {/* Nom */}
                    <div>
                      <p className={`font-semibold ${user.isYou ? "text-black" : "text-white"}`}>
                        {user.name}
                      </p>
                      <p className={`text-sm ${user.isYou ? "text-gray-600" : "text-gray-400"}`}>
                        {user.points} points
                      </p>
                    </div>
                  </div>

                  {/* Changement rang */}
                  {user.change !== 0 && (
                    <div
                      className={`flex items-center gap-1 text-sm font-bold ${
                        user.change > 0 ? "text-green-500" : "text-red-500"
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
              ))}
            </div>
          </div>

          {/* Colonne droite */}
          <div className="space-y-6">
            {/* Votre profil */}
            <div className="bg-black border-2 border-white rounded-3xl p-6">
              <h3 className="text-lg font-bold mb-4 font-sans">Votre Profil</h3>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-white  rounded-full flex items-center justify-center text-3xl font-bold mb-3 border-2 border-white text-black">
                  XR
                </div>
                <p className="font-bold text-xl mb-1">Xavier R.</p>
                <div className="flex items-center gap-2 text-yellow-500 mb-4">
                  <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
                  <span className="font-bold">2210 pts</span>
                </div>
                <button className="w-full py-2 bg-white text-black rounded-xl font-semibold hover:bg-gray-200 transition">
                  Voir profil
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section Radar Chart - Analyse des compétences */}
        <div className="bg-black border-2 border-white rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <FontAwesomeIcon icon={faTrophy} className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold font-sans">Analyse des Compétences</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Radar Chart */}
            <div className="lg:col-span-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#ffffff" strokeWidth={1} />
                  <PolarAngleAxis 
                    dataKey="skill" 
                    tick={{ fill: '#ffffff', fontSize: 14, fontWeight: 'bold' }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                  />
                  <Radar
                    name="Vous"
                    dataKey="vous"
                    stroke="#ffffff"
                    fill="#ffffff"
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Moyenne"
                    dataKey="moyenne"
                    stroke="#6b7280"
                    fill="#6b7280"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Legend 
                    wrapperStyle={{ 
                      paddingTop: '20px',
                      fontWeight: 'bold',
                    }}
                    iconType="circle"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Légende détaillée */}
            <div className="space-y-3">
              {skillsData.map((item, idx) => (
                <div key={idx} className="bg-gray-900/50 rounded-xl p-4 border border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-semibold text-white text-sm">{item.skill}</p>
                    <span className="text-white text-lg font-bold">{item.vous}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${item.vous}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Moyenne: {item.moyenne}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}