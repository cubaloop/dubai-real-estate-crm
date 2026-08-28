import React from 'react';
import { KANBAN_STAGES } from '../data/initialLeads';
import { LeadCard } from './LeadCard';
import { Layers, Sparkles } from 'lucide-react';

export const KanbanBoard = ({
  leads,
  onSelectLead,
  onUpdateLeadTask,
  onMoveLeadStage,
  campaignFilter,
  setCampaignFilter
}) => {
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('text/plain', leadId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, stageId) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('text/plain');
    if (leadId) {
      onMoveLeadStage(leadId, stageId);
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-[1900px] mx-auto">
      {/* Campaign Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            🇪🇸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-tight">
                Campaña Activa: Madrid (Sep'26 | RT | Spanish)
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800">
                {leads.length} Leads Cargados
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Datos exclusivos de leads de España (Teléfonos directos a WhatsApp +34)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Arrastra y suelta tarjetas entre etapas para actualizar el pipeline</span>
        </div>
      </div>

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 items-start overflow-x-auto pb-6">
        {KANBAN_STAGES.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.lead_status === stage.id);

          return (
            <div
              key={stage.id}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage.id)}
              className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-3 min-h-[600px] flex flex-col transition-colors duration-200 hover:border-blue-300"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between gap-2 mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stage.color}`}></span>
                  <h2 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">
                    {stage.title}
                  </h2>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${stage.badgeColor}`}>
                  {stageLeads.length}
                </span>
              </div>

              {/* Column Cards Container */}
              <div className="flex-1 space-y-3">
                {stageLeads.length > 0 ? (
                  stageLeads.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onSelectLead={onSelectLead}
                      onUpdateLeadTask={onUpdateLeadTask}
                      onDragStart={handleDragStart}
                    />
                  ))
                ) : (
                  <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs font-medium">
                    Suelta aquí
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
