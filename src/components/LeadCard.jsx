import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  MoreVertical, 
  CheckCircle2, 
  StickyNote,
  DollarSign
} from 'lucide-react';
import { getClientWhatsAppUrl } from '../utils/whatsapp';

export const LeadCard = ({
  lead,
  onSelectLead,
  onUpdateLeadTask,
  onDragStart
}) => {
  const [showQuickMenu, setShowQuickMenu] = useState(false);

  // Determine urgency badge styling
  const getUrgencyBadge = (timeline) => {
    switch (timeline) {
      case 'within_a_month':
        return {
          label: '⚡ Urgente (< 1 mes)',
          classes: 'bg-red-100 text-red-800 border-red-200'
        };
      case 'within_3_-_6_months':
        return {
          label: '⭐ 3 a 6 meses',
          classes: 'bg-amber-100 text-amber-900 border-amber-200'
        };
      case 'after_6_months':
        return {
          label: '📅 Más de 6 meses',
          classes: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      default:
        return {
          label: '🔍 No decidido',
          classes: 'bg-slate-100 text-slate-700 border-slate-200'
        };
    }
  };

  const badge = getUrgencyBadge(lead.purchase_timeline);

  // ADHD Anti-Forgetfulness Red Alert Check:
  // Triggered if lead has no next_task_date OR next_task_date is older than today OR not scheduled within 2 days!
  const isUrgentTaskAlert = () => {
    if (!lead.next_task_date) return true;
    const taskDate = new Date(lead.next_task_date);
    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 86400000);
    return taskDate < now || taskDate > twoDaysFromNow;
  };

  const needsFollowupAlert = isUrgentTaskAlert();

  // Quick Action Handler for ADHD 24h & Tomorrow Reminders
  const handleQuickReminder = (e, hoursAhead) => {
    e.stopPropagation();
    const targetDate = new Date(Date.now() + hoursAhead * 3600000).toISOString();
    onUpdateLeadTask(lead.id, targetDate, `Recordatorio automático en ${hoursAhead}h`);
    setShowQuickMenu(false);
  };

  const whatsappPhone = lead.phone || lead.work_phone_number;
  const whatsappUrl = getClientWhatsAppUrl(whatsappPhone, lead.full_name);

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      onClick={() => onSelectLead(lead)}
      className="adhd-card group relative bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-blue-400 cursor-pointer select-none mb-3"
    >
      {/* ADHD Visual Notification Alert Pulse Dot */}
      {needsFollowupAlert && (
        <div 
          className="absolute -top-1.5 -right-1.5 flex items-center justify-center"
          title="¡ALERTA TDAH! Este lead no tiene seguimiento programado para los próximos 2 días"
        >
          <span className="relative flex h-4 w-4">
            <span className="adhd-alert-pulse absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 text-[9px] text-white font-black items-center justify-center">!</span>
          </span>
        </div>
      )}

      {/* Card Header: Client Name & Quick Actions */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 pr-2">
          <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
            {lead.full_name}
          </h3>
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {lead.email || 'Sin correo'}
          </p>
        </div>

        {/* Quick Menu Trigger */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowQuickMenu(!showQuickMenu)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* ADHD Fast Action Menu */}
          {showQuickMenu && (
            <div className="absolute right-0 top-7 z-20 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1 text-xs">
              <div className="px-2 py-1 font-bold text-slate-400 text-[10px] uppercase tracking-wider">
                Recordatorios TDAH
              </div>
              <button
                onClick={(e) => handleQuickReminder(e, 24)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-blue-700 font-semibold flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" /> Recordarme en 24h
              </button>
              <button
                onClick={(e) => handleQuickReminder(e, 48)}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-blue-700 font-semibold flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" /> Llamar mañana
              </button>
              <div className="my-1 border-t border-slate-100"></div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLead(lead);
                  setShowQuickMenu(false);
                }}
                className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-medium flex items-center gap-1.5"
              >
                <StickyNote className="w-3.5 h-3.5" /> Agregar Notas
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Urgency Badge & Call Time Pill */}
      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.classes}`}>
          {badge.label}
        </span>

        {lead.preferred_time_to_call && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-medium border border-slate-200">
            <Clock className="w-3 h-3 text-slate-400" />
            {lead.preferred_time_to_call.replace(/_/g, ' ')}
          </span>
        )}
      </div>

      {/* Goal & Budget details */}
      <div className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 mb-3 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Objetivo:</span>
          <strong className="text-slate-800 font-semibold">
            {lead.investment_goal === 'investment_purpose' ? '📈 Inversión ROI' : 
             lead.investment_goal === 'relocation/residency' ? '🏛️ Residencia / Visa' : '🔍 Explorando'}
          </strong>
        </div>
        {lead.budget && (
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Presupuesto:</span>
            <span className="font-bold text-emerald-700">{lead.budget}</span>
          </div>
        )}
      </div>

      {/* Direct Contact Buttons Bar */}
      <div className="flex items-center gap-1.5 pt-1 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
        {/* Direct WhatsApp Single-Click Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-all shadow-xs"
          title="Abrir WhatsApp directo con número formateado"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Direct Phone Call Button */}
        {whatsappPhone && (
          <a
            href={`tel:${whatsappPhone}`}
            className="p-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg transition-colors border border-slate-200"
            title="Llamada Directa"
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        )}

        {/* Direct Email Button */}
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            className="p-1.5 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-lg transition-colors border border-slate-200"
            title="Enviar Correo"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
