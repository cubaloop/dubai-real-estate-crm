import React, { useState } from 'react';
import { DEVELOPERS_DATA } from '../data/projectData';
import { DubaiInteractiveMap } from './DubaiInteractiveMap';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  ArrowRight, 
  Eye, 
  Download, 
  Sparkles,
  Layers
} from 'lucide-react';

export const DevelopersSection = ({
  currency,
  onOpenProject3D
}) => {
  const [selectedDeveloper, setSelectedDeveloper] = useState(DEVELOPERS_DATA[0]);
  const [selectedProject, setSelectedProject] = useState(DEVELOPERS_DATA[0].projects[0]);

  return (
    <div className="p-4 sm:p-6 max-w-[1700px] mx-auto space-y-8">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Catálogo de Desarrolladoras de Dubái
          </span>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Desarrolladoras Oficiales & Proyectos Off-Plan
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Acceso directo a inventario exclusivo, mapas de ubicación y planes de pago detallados.
          </p>
        </div>

        {/* Developer Tabs */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-2xl border border-slate-200">
          {DEVELOPERS_DATA.map((dev) => (
            <button
              key={dev.id}
              onClick={() => {
                setSelectedDeveloper(dev);
                setSelectedProject(dev.projects[0]);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                selectedDeveloper.id === dev.id
                  ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{dev.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Dubai Map Section */}
      <DubaiInteractiveMap
        project={selectedProject}
        onExploreProject3D={() => onOpenProject3D(selectedProject)}
      />

      {/* Projects Grid for the Selected Developer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" /> Proyectos Activos de {selectedDeveloper.name}
          </h3>
          <span className="text-xs text-slate-500 font-bold">1 Proyecto Disponible</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedDeveloper.projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Project Card Media Header */}
              <div className="relative h-56 bg-slate-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80"
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-xl text-xs font-black shadow-md">
                    {proj.tower}
                  </span>
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-xs text-slate-900 rounded-xl text-xs font-extrabold shadow-md">
                    Entrega: {proj.completionDate.split(' ')[2]}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h4 className="text-xl font-black text-white">{proj.name}</h4>
                  <p className="text-xs text-slate-300 font-medium flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" /> {proj.locationName}
                  </p>
                </div>
              </div>

              {/* Project Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {proj.tagline}. Conectividad inigualable a 15 mins de Downtown y 12 km de costa en Dubai Maritime City.
                </p>

                {/* Unit Price Starting Info */}
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-semibold">1 Bedroom (Desde):</span>
                    <strong className="text-slate-900 font-extrabold font-mono">
                      {currency.symbol}{Math.round(proj.units[0].minPriceAED * currency.rate).toLocaleString()}
                    </strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-semibold">Plan de Pago:</span>
                    <strong className="text-blue-600 font-bold">60/40 con 5% Depósito</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-semibold">DLD Fee (4%):</span>
                    <span className="text-amber-700 font-bold">No Incluido (Pago extra)</span>
                  </div>
                </div>

                {/* Open 3D Explorer Button */}
                <button
                  onClick={() => onOpenProject3D(proj)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>Explorar en 3D & Generar PDF</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
