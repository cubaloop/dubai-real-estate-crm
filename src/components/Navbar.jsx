import React from 'react';
import { 
  Building2, 
  Users, 
  Upload, 
  Search, 
  Filter, 
  DollarSign, 
  Cloud, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { EXCHANGE_RATES } from '../data/projectData';

export const Navbar = ({
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  timelineFilter,
  setTimelineFilter,
  goalFilter,
  setGoalFilter,
  currency,
  setCurrency,
  onOpenImporter,
  onOpenSupabase,
  leadsCount,
  urgentLeadsCount,
  supabaseConfigured
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner for ADHD quick summary */}
      <div className="bg-slate-900 text-white px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" /> High-Productivity ADHD CRM
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="text-slate-300">
            Leads Activos: <strong className="text-white">{leadsCount}</strong>
          </span>
          {urgentLeadsCount > 0 && (
            <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-300 px-2 py-0.5 rounded-full font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping"></span>
              {urgentLeadsCount} Leads sin seguimiento &lt; 2 días
            </span>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenSupabase}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Cloud className={`w-3.5 h-3.5 ${supabaseConfigured ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>{supabaseConfigured ? 'Supabase Conectado' : 'Modo Local (Netlify Ready)'}</span>
          </button>

          <a 
            href="https://wa.me/971504497663" 
            target="_blank" 
            rel="noreferrer"
            className="text-emerald-400 hover:underline font-mono text-[11px]"
          >
            Hotline: +971 50 449 7663
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Logo & Section Tabs */}
        <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20">
              D
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg leading-tight tracking-tight flex items-center gap-1.5">
                DUBAI REAL ESTATE <span className="text-blue-600 font-bold">CRM</span>
              </h1>
              <p className="text-[11px] text-slate-500 font-medium">DAMAC & Meta Ads Lead Manager</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('kanban')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'kanban'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>CRM Leads</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'projects'
                  ? 'bg-white text-blue-600 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Desarrolladoras & Proyectos</span>
            </button>
          </nav>
        </div>

        {/* Filter Controls & Action Buttons */}
        {activeTab === 'kanban' ? (
          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por Nombre, Teléfono o Email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-800 placeholder-slate-400"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Timeline Filter Dropdown */}
            <div className="relative min-w-[150px]">
              <select
                value={timelineFilter}
                onChange={(e) => setTimelineFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer text-slate-700 appearance-none"
              >
                <option value="ALL">🗓️ Plazo: Todos</option>
                <option value="within_a_month">🔴 En menos de 1 mes</option>
                <option value="within_3_-_6_months">🟡 De 3 a 6 meses</option>
                <option value="after_6_months">🔵 Más de 6 meses</option>
                <option value="not_sure">⚪ No decidido</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</div>
            </div>

            {/* Investment Goal Filter Dropdown */}
            <div className="relative min-w-[150px]">
              <select
                value={goalFilter}
                onChange={(e) => setGoalFilter(e.target.value)}
                className="w-full pl-3 pr-8 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 cursor-pointer text-slate-700 appearance-none"
              >
                <option value="ALL">🎯 Objetivo: Todos</option>
                <option value="investment_purpose">📈 Inversión (ROI)</option>
                <option value="relocation/residency">🏛️ Residencia / Golden Visa</option>
                <option value="just_exploring">🔍 Explorando</option>
              </select>
              <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">▼</div>
            </div>

            {/* Excel Importer Button */}
            <button
              onClick={onOpenImporter}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Importar Excel / Meta Ads</span>
            </button>
          </div>
        ) : (
          /* Currency Switcher for Projects View */
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-blue-600" /> Moneda Global:
            </span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              {Object.keys(EXCHANGE_RATES).map((currKey) => (
                <button
                  key={currKey}
                  onClick={() => setCurrency(EXCHANGE_RATES[currKey])}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    currency.label === EXCHANGE_RATES[currKey].label
                      ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {currKey}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
