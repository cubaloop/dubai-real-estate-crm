import React, { useState } from 'react';
import { 
  X, 
  Cloud, 
  Database, 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

export const SupabaseConfigModal = ({
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const sqlSchema = `-- Tabla de Leads para Supabase (Netlify Ready)
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  campaign_category TEXT DEFAULT 'Miami',
  full_name TEXT NOT NULL,
  phone TEXT,
  work_phone_number TEXT,
  email TEXT,
  investment_goal TEXT,
  purchase_timeline TEXT,
  preferred_time_to_call TEXT,
  ad_name TEXT,
  campaign_name TEXT,
  platform TEXT,
  lead_status TEXT DEFAULT 'new',
  comments TEXT,
  budget TEXT,
  next_task_date TIMESTAMP WITH TIME ZONE,
  activity_log JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Despliegue en Netlify & Supabase</h2>
              <p className="text-xs text-slate-500 font-medium">Instrucciones de conexión para base de datos persistente</p>
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
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700 flex-1">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-emerald-900">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold block mb-0.5">El CRM ya funciona 100% de forma autónoma:</strong>
              Todos los leads, cambios de etapas, notas y recordatorios se guardan automáticamente en tu navegador (LocalStorage) y se sincronizarán al conectar tus claves de Supabase.
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-extrabold text-slate-900 uppercase tracking-wider">1. Variables de Entorno en Netlify:</h4>
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl font-mono text-[11px] space-y-1">
              <p>VITE_SUPABASE_URL=https://tu-proyecto.supabase.co</p>
              <p>VITE_SUPABASE_ANON_KEY=tu-clave-anon-publica</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider">2. Script SQL para Crear la Tabla en Supabase:</h4>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-blue-600 hover:underline font-bold text-xs cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copied ? '¡Copiado!' : 'Copiar SQL'}</span>
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto">
              {sqlSchema}
            </pre>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
