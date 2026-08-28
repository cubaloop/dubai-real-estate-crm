import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Building2, 
  Plane, 
  Train, 
  Umbrella, 
  Compass,
  Maximize2
} from 'lucide-react';

export const DubaiInteractiveMap = ({
  project,
  onExploreProject3D
}) => {
  const [selectedLandmark, setSelectedLandmark] = useState(null);

  // Key landmarks positioned on the Dubai coastline SVG map
  const landmarks = [
    { id: 'dmc', name: 'Dubai Maritime City (Chelsea Residences)', x: 420, y: 150, isProject: true, time: 'Sitio del Proyecto' },
    { id: 'burj', name: 'Burj Khalifa & Downtown Dubai', x: 500, y: 310, isProject: false, time: '15 mins' },
    { id: 'dxb', name: 'Dubai Int. Airport (DXB)', x: 670, y: 180, isProject: false, time: '20 mins' },
    { id: 'j1', name: 'J1 Beach (La Mer)', x: 380, y: 220, isProject: false, time: '14 mins' },
    { id: 'palm', name: 'Palm Jumeirah', x: 190, y: 390, isProject: false, time: '25 mins' },
    { id: 'citywalk', name: 'City Walk', x: 460, y: 270, isProject: false, time: '15 mins' },
    { id: 'difc', name: 'DIFC Financial District', x: 520, y: 260, isProject: false, time: '12 mins' }
  ];

  return (
    <div className="bg-slate-900 rounded-3xl p-6 text-white border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-blue-400 text-xs font-extrabold uppercase tracking-widest mb-1">
            <Compass className="w-4 h-4 animate-spin-slow" /> Mapa Interactivo de Dubái & Conectividad
          </div>
          <h3 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            Dubai Maritime City (Madinat Dubai Al Melaheyah)
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Ubicación privilegiada en la costa, entre Port Rashid y Downtown Dubai.
          </p>
        </div>

        <button
          onClick={onExploreProject3D}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all transform hover:scale-105 cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
          <span>Abrir Explorador 3D del Proyecto</span>
        </button>
      </div>

      {/* Interactive Map Visual (SVG Canvas) */}
      <div className="relative z-10 w-full h-[380px] bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
        <svg viewBox="0 0 800 500" className="w-full h-full object-cover">
          {/* Dubai Sea Water */}
          <path
            d="M 0,0 L 800,0 L 800,200 C 600,220 500,280 300,340 C 150,380 0,420 0,500 Z"
            fill="#091E3A"
            opacity="0.9"
          />

          {/* Palm Jumeirah outline */}
          <ellipse cx="190" cy="390" rx="40" ry="25" fill="#0E355B" stroke="#38BDF8" strokeWidth="1" opacity="0.6" />

          {/* Dubai Maritime City Peninsula outline */}
          <path
            d="M 380,120 L 460,110 L 470,160 L 420,180 Z"
            fill="#1E3A8A"
            stroke="#60A5FA"
            strokeWidth="2"
            className="animate-pulse"
          />

          {/* Coastal Highway Route lines */}
          <path
            d="M 190,390 Q 380,240 420,150 T 670,180"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.7"
          />
          <path
            d="M 420,150 L 500,310"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.8"
          />

          {/* Map Pins */}
          {landmarks.map((lm) => (
            <g
              key={lm.id}
              transform={`translate(${lm.x}, ${lm.y})`}
              className="cursor-pointer transition-transform hover:scale-125"
              onClick={() => setSelectedLandmark(lm)}
            >
              {lm.isProject ? (
                <>
                  <circle r="18" fill="#3B82F6" opacity="0.3" className="animate-ping" />
                  <circle r="12" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
                  <text y="28" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="bold">
                    📍 Chelsea Residences (DMC)
                  </text>
                </>
              ) : (
                <>
                  <circle r="6" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text y="18" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="600">
                    {lm.name.split(' ')[0]} ({lm.time})
                  </text>
                </>
              )}
            </g>
          ))}
        </svg>

        {/* Floating Quick Distance Badges Overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex flex-wrap items-center justify-around gap-2 text-xs">
          {project.keyDistances.map((d, i) => (
            <div key={i} className="flex items-center gap-1.5 px-2 py-1 bg-slate-800/80 rounded-lg text-slate-300">
              <span className="text-amber-400 font-bold">●</span>
              <span className="font-medium">{d.place}:</span>
              <strong className="text-white font-bold">{d.time}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
