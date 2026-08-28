import React, { useState } from 'react';
import { 
  X, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  Send, 
  Tag, 
  ShieldCheck, 
  Building, 
  User, 
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { KANBAN_STAGES } from '../data/initialLeads';
import { getClientWhatsAppUrl } from '../utils/whatsapp';

export const LeadDetailModal = ({
  lead,
  onClose,
  onUpdateLead,
  onAddActivity
}) => {
  if (!lead) return null;

  const [newNote, setNewNote] = useState('');
  const [currentStatus, setCurrentStatus] = useState(lead.lead_status);
  const [budget, setBudget] = useState(lead.budget || '');
  const [isEditingBudget, setIsEditingBudget] = useState(false);

  const handleStatusChange = (e) => {
    const newStat = e.target.value;
    setCurrentStatus(newStat);
    onUpdateLead(lead.id, { lead_status: newStat });
    onAddActivity(lead.id, `Etapa cambiada a: ${KANBAN_STAGES.find(s => s.id === newStat)?.title || newStat}`);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAddActivity(lead.id, newNote.trim());
    setNewNote('');
  };

  const handleSaveBudget = () => {
    onUpdateLead(lead.id, { budget });
    setIsEditingBudget(false);
    onAddActivity(lead.id, `Presupuesto actualizado a: ${budget}`);
  };

  const whatsappPhone = lead.phone || lead.work_phone_number;
  const whatsappUrl = getClientWhatsAppUrl(whatsappPhone, lead.full_name);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {lead.full_name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">{lead.full_name}</h2>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  Campaña: {lead.campaign_category || 'General'}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                ID Lead: <span className="font-mono">{lead.id}</span> | Plataforma: {lead.platform.toUpperCase()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Quick Action Contact Bar */}
          <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Abrir WhatsApp</span>
            </a>

            {whatsappPhone && (
              <a
                href={`tel:${whatsappPhone}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 rounded-xl font-bold text-xs transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Llamar ({whatsappPhone})</span>
              </a>
            )}

            {lead.email && (
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200 rounded-xl font-bold text-xs transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            )}
          </div>

          {/* Grid Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status & Stage Switcher */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Etapa del Lead (Kanban)
              </label>
              <select
                value={currentStatus}
                onChange={handleStatusChange}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                {KANBAN_STAGES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Editor */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Presupuesto Estimado
                </label>
                {!isEditingBudget && (
                  <button
                    onClick={() => setIsEditingBudget(true)}
                    className="text-xs text-blue-600 hover:underline font-semibold"
                  >
                    Editar
                  </button>
                )}
              </div>
              {isEditingBudget ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="ej. AED 3,000,000"
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                  />
                  <button
                    onClick={handleSaveBudget}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold"
                  >
                    Guardar
                  </button>
                </div>
              ) : (
                <p className="text-base font-extrabold text-emerald-700">
                  {lead.budget || 'Sin especificar'}
                </p>
              )}
            </div>

            {/* Extracted Profile Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider">Perfil de Inversión</h4>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Objetivo:</span>
                <span className="font-bold text-slate-800">
                  {lead.investment_goal === 'investment_purpose' ? 'Inversión y Retorno (ROI)' : 
                   lead.investment_goal === 'relocation/residency' ? 'Residencia / Golden Visa' : 'Explorando Oportunidades'}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Plazo de Compra:</span>
                <span className="font-bold text-slate-800">
                  {lead.purchase_timeline === 'within_a_month' ? 'Menos de 1 mes (Urgente)' :
                   lead.purchase_timeline === 'within_3_-_6_months' ? '3 a 6 meses' :
                   lead.purchase_timeline === 'after_6_months' ? 'Más de 6 meses' : 'No decidido'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Horario de Llamada:</span>
                <span className="font-bold text-slate-800">
                  {lead.preferred_time_to_call ? lead.preferred_time_to_call.replace(/_/g, ' ') : 'Flexible'}
                </span>
              </div>
            </div>

            {/* Marketing Origin Details */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider">Origen de Campaña</h4>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Campaña:</span>
                <span className="font-bold text-slate-800">{lead.campaign_name || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-500">Anuncio (Ad):</span>
                <span className="font-bold text-slate-800">{lead.ad_name || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Comentarios Meta:</span>
                <span className="font-medium text-slate-700 italic">{lead.comments || 'Sin comentarios adicionales'}</span>
              </div>
            </div>
          </div>

          {/* Activity Timeline & Notes Log */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs mb-3">
              Historial de Actividad y Notas de Seguimiento
            </h4>

            {/* Note input form */}
            <form onSubmit={handleAddNote} className="flex gap-2 mb-4">
              <input
                type="text"
                placeholder="Escribe una nota rápida de seguimiento..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Agregar</span>
              </button>
            </form>

            {/* Timeline list */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {lead.activity_log && lead.activity_log.length > 0 ? (
                lead.activity_log.map((act, index) => (
                  <div key={index} className="flex items-start gap-2.5 p-2 bg-white rounded-xl border border-slate-100 text-xs">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                    <div className="flex-1">
                      <p className="text-slate-800 font-medium">{act.note}</p>
                      <span className="text-[10px] text-slate-400 font-mono">{act.timestamp}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No hay notas registradas todavía.</p>
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
