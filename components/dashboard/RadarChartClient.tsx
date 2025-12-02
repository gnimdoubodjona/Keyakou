"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function RadarChartClient() {
  // Données statiques pour le Radar Chart (progression par catégorie)
  const progressionData = [
    { category: "Qualité", value: 75, fullMark: 100 },
    { category: "Rapidité", value: 85, fullMark: 100 },
    { category: "Innovation", value: 60, fullMark: 100 },
    { category: "Complexité", value: 70, fullMark: 100 },
    { category: "Documentation", value: 80, fullMark: 100 },
  ];

  return (
    <div className="bg-black border-2 border-white rounded-3xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <FontAwesomeIcon icon={faChartLine} className="w-6 h-6 text-white" />
        <h3 className="text-xl font-bold font-sans">Analyse de Progression</h3>
      </div>

      {/* Radar Chart */}
      <div className="h-72 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={progressionData}>
            <PolarGrid stroke="#ffffff" strokeWidth={1} strokeOpacity={0.3} />
            <PolarAngleAxis 
              dataKey="category" 
              tick={{ fill: '#ffffff', fontSize: 11, fontWeight: 'bold' }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: '#9ca3af', fontSize: 9 }}
              strokeOpacity={0.5}
            />
            <Radar
              name="Votre score"
              dataKey="value"
              stroke="#ffffff"
              fill="#ffffff"
              fillOpacity={0.6}
              strokeWidth={2}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '10px',
                fontWeight: 'bold',
                fontSize: '11px'
              }}
              iconType="circle"
              iconSize={8}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Détails des catégories */}
      <div className="space-y-2">
        {progressionData.map((item) => (
          <div key={item.category} className="flex items-center justify-between text-sm">
            <span className="text-gray-400">{item.category}</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
              <span className="text-white font-bold w-10 text-right">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}