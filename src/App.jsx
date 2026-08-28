import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_LEADS_RAW } from './data/initialLeads';
import { DEVELOPERS_DATA, EXCHANGE_RATES } from './data/projectData';
import { loadLeadsFromStorage, saveLeadsToStorage, isSupabaseConfigured } from './utils/supabaseClient';
import { Navbar } from './components/Navbar';
import { KanbanBoard } from './components/KanbanBoard';
import { LeadDetailModal } from './components/LeadDetailModal';
import { ExcelImporterModal } from './components/ExcelImporterModal';
import { DevelopersSection } from './components/DevelopersSection';
import { Project3DExplorer } from './components/Project3DExplorer';
import { SupabaseConfigModal } from './components/SupabaseConfigModal';

export function App() {
  // Leads state initialized exclusively with the latest Madrid dataset
  const [leads, setLeads] = useState(() => {
    // Reset or load Madrid leads
    return INITIAL_LEADS_RAW;
  });

  // Navigation tab state: 'kanban' | 'projects'
  const [activeTab, setActiveTab] = useState('kanban');

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [timelineFilter, setTimelineFilter] = useState('ALL');
  const [goalFilter, setGoalFilter] = useState('ALL');
  const [campaignFilter, setCampaignFilter] = useState('ALL');

  // Global Currency State
  const [currency, setCurrency] = useState(EXCHANGE_RATES.AED);

  // Modal states
  const [selectedLead, setSelectedLead] = useState(null);
  const [isImporterOpen, setIsImporterOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [project3DModal, setProject3DModal] = useState(null);

  // Auto-sync leads to storage
  useEffect(() => {
    saveLeadsToStorage(leads);
  }, [leads]);

  // Lead Mutations
  const handleMoveLeadStage = (leadId, newStageId) => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
          return {
            ...lead,
            lead_status: newStageId,
            activity_log: [
              { timestamp, note: `Movido a la etapa: ${newStageId}` },
              ...(lead.activity_log || [])
            ]
          };
        }
        return lead;
      })
    );
  };

  const handleUpdateLead = (leadId, updates) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, ...updates } : lead))
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({ ...prev, ...updates }));
    }
  };

  const handleUpdateLeadTask = (leadId, targetDate, note) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    handleUpdateLead(leadId, {
      next_task_date: targetDate,
      activity_log: [
        { timestamp, note: note || 'Seguimiento programado' },
        ...(selectedLead?.id === leadId ? selectedLead.activity_log : [])
      ]
    });
  };

  const handleAddActivity = (leadId, note) => {
    const timestamp = new Date().toLocaleString();
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const updatedLog = [{ timestamp, note }, ...(lead.activity_log || [])];
          return { ...lead, activity_log: updatedLog };
        }
        return lead;
      })
    );
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead((prev) => ({
        ...prev,
        activity_log: [{ timestamp, note }, ...(prev.activity_log || [])]
      }));
    }
  };

  const handleImportLeads = (newLeads) => {
    setLeads((prev) => [...newLeads, ...prev]);
  };

  // Filtered Leads calculation
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Search term filter (Name, Phone, Email)
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const nameMatch = lead.full_name?.toLowerCase().includes(query);
        const phoneMatch = lead.phone?.includes(query) || lead.work_phone_number?.includes(query);
        const emailMatch = lead.email?.toLowerCase().includes(query);
        if (!nameMatch && !phoneMatch && !emailMatch) return false;
      }

      // Purchase Timeline filter
      if (timelineFilter !== 'ALL' && lead.purchase_timeline !== timelineFilter) {
        return false;
      }

      // Investment Goal filter
      if (goalFilter !== 'ALL' && lead.investment_goal !== goalFilter) {
        return false;
      }

      return true;
    });
  }, [leads, searchTerm, timelineFilter, goalFilter]);

  // Urgent ADHD Leads count (leads needing follow-up within 2 days or past due)
  const urgentLeadsCount = useMemo(() => {
    const now = new Date();
    const twoDaysFromNow = new Date(now.getTime() + 2 * 86400000);

    return leads.filter((lead) => {
      if (!lead.next_task_date) return true;
      const t = new Date(lead.next_task_date);
      return t < now || t > twoDaysFromNow;
    }).length;
  }, [leads]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Fixed Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        timelineFilter={timelineFilter}
        setTimelineFilter={setTimelineFilter}
        goalFilter={goalFilter}
        setGoalFilter={setGoalFilter}
        currency={currency}
        setCurrency={setCurrency}
        onOpenImporter={() => setIsImporterOpen(true)}
        onOpenSupabase={() => setIsSupabaseOpen(true)}
        leadsCount={filteredLeads.length}
        urgentLeadsCount={urgentLeadsCount}
        supabaseConfigured={isSupabaseConfigured()}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'kanban' ? (
          <KanbanBoard
            leads={filteredLeads}
            onSelectLead={setSelectedLead}
            onUpdateLeadTask={handleUpdateLeadTask}
            onMoveLeadStage={handleMoveLeadStage}
            campaignFilter={campaignFilter}
            setCampaignFilter={setCampaignFilter}
          />
        ) : (
          <DevelopersSection
            currency={currency}
            onOpenProject3D={setProject3DModal}
          />
        )}
      </main>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateLead={handleUpdateLead}
          onAddActivity={handleAddActivity}
        />
      )}

      {/* Excel Drag & Drop Importer Modal */}
      {isImporterOpen && (
        <ExcelImporterModal
          onClose={() => setIsImporterOpen(false)}
          onImportLeads={handleImportLeads}
        />
      )}

      {/* 3D Project Interactive Explorer Modal */}
      {project3DModal && (
        <Project3DExplorer
          project={project3DModal}
          currency={currency}
          onClose={() => setProject3DModal(null)}
        />
      )}

      {/* Netlify & Supabase Connection Modal */}
      {isSupabaseOpen && (
        <SupabaseConfigModal
          onClose={() => setIsSupabaseOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
