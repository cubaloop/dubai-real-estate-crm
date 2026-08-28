import React, { useState } from 'react';
import { 
  X, 
  Download, 
  MessageSquare, 
  TrendingUp, 
  MapPin, 
  Check, 
  ChevronDown, 
  ChevronRight, 
  Layers, 
  Sparkles,
  Maximize,
  Compass,
  ArrowRight,
  ShieldCheck,
  Building,
  Info
} from 'lucide-react';
import { generateUnitPDFOffer } from '../utils/pdfGenerator';
import { getUnitBookingWhatsAppUrl } from '../utils/whatsapp';

export const Project3DExplorer = ({
  project,
  currency,
  onClose
}) => {
  const [selectedUnitType, setSelectedUnitType] = useState('1-BR');
  const [expandedUnitAccordion, setExpandedUnitAccordion] = useState('1-BR');
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);
  const [is3DMode, setIs3DMode] = useState(true);

  // Active unit object
  const activeUnit = project.units.find(u => u.type === selectedUnitType) || project.units[0];

  // Price conversion calculation
  const convertPrice = (aedAmount) => {
    const converted = Math.round(aedAmount * currency.rate);
    return converted.toLocaleString();
  };

  const handleDownloadPDF = () => {
    generateUnitPDFOffer(
      activeUnit,
      project,
      currency,
      convertPrice(activeUnit.samplePrice)
    );
  };

  const whatsappUrl = getUnitBookingWhatsAppUrl(
    activeUnit,
    project,
    currency,
    convertPrice(activeUnit.samplePrice)
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 text-white overflow-hidden animate-in fade-in duration-300">
      {/* Top Navigation Bar */}
      <header className="h-16 px-6 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-500/30">
            3D
          </div>
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 leading-none">
              {project.name} <span className="text-blue-400">({project.tower})</span>
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Desarrollador: {project.developer} | Partner Oficial: {project.partner}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* PDF Offer Generator CTA */}
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold border border-slate-700 transition-all cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span>Descargar Oferta PDF</span>
          </button>

          {/* Direct Buy WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-extrabold shadow-lg shadow-emerald-600/30 transition-all transform hover:scale-105"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Buy This Unit (+971504497663)</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main 3-Column Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT COLUMN: Unit Types & Collapsible Payment Plans */}
        <aside className="w-full lg:w-[380px] bg-slate-900/95 border-r border-slate-800 flex flex-col overflow-y-auto shrink-0 p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Tipologías y Planes de Pago
            </span>
            <span className="text-[11px] font-bold text-blue-400">Moneda: {currency.label.split(' ')[0]}</span>
          </div>

          {/* Unit Typology Accordions */}
          <div className="space-y-3">
            {project.units.map((unit) => {
              const isExpanded = expandedUnitAccordion === unit.type;
              const isSelected = selectedUnitType === unit.type;

              return (
                <div
                  key={unit.type}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isSelected
                      ? 'border-blue-500 bg-slate-800/90 shadow-md shadow-blue-500/10'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  {/* Accordion Header */}
                  <div
                    onClick={() => {
                      setSelectedUnitType(unit.type);
                      setExpandedUnitAccordion(isExpanded ? null : unit.type);
                      setSelectedRoomIndex(0);
                    }}
                    className="p-3.5 flex items-center justify-between cursor-pointer select-none"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-300 font-black text-xs">
                          {unit.type}
                        </span>
                        <h4 className="font-extrabold text-sm text-white">{unit.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-1">
                        Área: {unit.minAreaSqft} - {unit.maxAreaSqft} sq.ft | Avg PSF: {currency.symbol}{Math.round(unit.avgPsfAED * currency.rate).toLocaleString()}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-xs font-black text-emerald-400">
                        {currency.symbol}{convertPrice(unit.samplePrice)}
                      </p>
                      <div className="flex justify-end mt-1 text-slate-400">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Payment Plan Breakdown */}
                  {isExpanded && (
                    <div className="p-3.5 bg-slate-950/70 border-t border-slate-800/80 space-y-3 text-xs animate-in slide-in-from-top-2 duration-200">
                      {/* DLD Fee Warning/Note */}
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-start gap-2">
                        <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                        <div>
                          <strong>Tarifa DLD (4%):</strong> No incluida en el precio base. Se abona en adición al depósito inicial.
                        </div>
                      </div>

                      <h5 className="font-extrabold text-slate-300 uppercase tracking-wider text-[10px]">
                        Estructura del Plan 60/40 Tower C:
                      </h5>

                      <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                        {project.paymentPlan.map((item, idx) => {
                          const itemAmount = Math.round((unit.samplePrice * currency.rate * item.percent) / 100);
                          return (
                            <div
                              key={idx}
                              className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between text-[11px]"
                            >
                              <span className="text-slate-400 font-medium">
                                {item.milestone} {item.detail ? `(${item.detail})` : ''}
                              </span>
                              <div className="text-right">
                                <span className="font-bold text-white">{item.percent}%</span>
                                <span className="text-slate-400 ml-2 font-mono">
                                  {currency.symbol}{itemAmount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-slate-400">Entrega Estimada (ACD):</span>
                        <strong className="text-white font-bold">{project.completionDate}</strong>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* CENTER COLUMN: 3D / Isometric Floorplan & Virtual Room Tour */}
        <main className="flex-1 bg-slate-950 flex flex-col relative overflow-hidden">
          {/* Virtual Room Selector Tabs */}
          <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
            <div className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 pointer-events-auto shadow-lg">
              {activeUnit.rooms.map((room, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRoomIndex(idx)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    selectedRoomIndex === idx
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {room.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-slate-800 pointer-events-auto">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-bold text-slate-200">Vista 3D Render HD</span>
            </div>
          </div>

          {/* Interactive Visual Stage */}
          <div className="flex-1 relative flex items-center justify-center p-6">
            <img
              src={activeUnit.rooms[selectedRoomIndex].image}
              alt={activeUnit.rooms[selectedRoomIndex].name}
              className="w-full h-full max-h-[580px] object-cover rounded-3xl border border-slate-800 shadow-2xl transition-all duration-500"
            />

            {/* Room Caption Card */}
            <div className="absolute bottom-10 left-10 right-10 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 block mb-0.5">
                  {activeUnit.type} - {activeUnit.rooms[selectedRoomIndex].name}
                </span>
                <p className="text-xs text-slate-300 font-medium">
                  {activeUnit.rooms[selectedRoomIndex].desc}
                </p>
              </div>

              {/* Buy This Unit WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 transition-all transform hover:scale-105 shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Buy This Unit (+971504497663)</span>
              </a>
            </div>
          </div>
        </main>

        {/* RIGHT COLUMN: Location characteristics & Price Appreciation Timeline */}
        <aside className="w-full lg:w-[360px] bg-slate-900/95 border-l border-slate-800 flex flex-col overflow-y-auto shrink-0 p-4 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Análisis y Plusvalía
            </span>
            <span className="text-[11px] font-black text-emerald-400">
              {project.appreciationStat}
            </span>
          </div>

          {/* Historical Price Appreciation Bar Chart */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="font-extrabold text-xs text-slate-200 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-blue-400" /> Evolución Precio PSF (AED)
              </h5>
              <span className="text-[10px] text-slate-500">DLD Monitor</span>
            </div>

            {/* Visual Bars */}
            <div className="space-y-2 pt-1">
              {project.priceTrendHistory.map((item, i) => {
                const maxPsf = 3500;
                const widthPercent = Math.round((item.primaryPsf / maxPsf) * 100);
                return (
                  <div key={i} className="text-xs">
                    <div className="flex justify-between text-slate-400 text-[11px] mb-1 font-mono">
                      <span>{item.year}</span>
                      <strong className="text-white font-bold">{item.primaryPsf} AED/sqft</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-blue-600 to-cyan-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${widthPercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-400 italic pt-1">
              Proyección de crecimiento sostenido por desarrollo continuo de DP World en DMC.
            </p>
          </div>

          {/* Location Distances List */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2.5">
            <h5 className="font-extrabold text-xs text-slate-200 flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-red-400" /> Tiempos de Conectividad
            </h5>
            {project.keyDistances.map((dist, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60">
                <span className="text-slate-400">{dist.place}</span>
                <strong className="text-white font-mono">{dist.time}</strong>
              </div>
            ))}
          </div>

          {/* Masterplan Highlights */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <h5 className="font-extrabold text-xs text-slate-200">Aspectos Clave del Masterplan:</h5>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {project.masterplanHighlights.map((hl, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
