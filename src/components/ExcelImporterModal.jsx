import React, { useState, useRef } from 'react';
import { 
  X, 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { parseMetaLeadExcel } from '../utils/excelParser';

export const ExcelImporterModal = ({
  onClose,
  onImportLeads
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [campaignCategory, setCampaignCategory] = useState('Miami');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = async (file) => {
    setSelectedFile(file);
    setIsProcessing(true);
    setErrorMsg('');

    try {
      const result = await parseMetaLeadExcel(file);
      setParsedData(result);
    } catch (err) {
      console.error(err);
      setErrorMsg('Error al procesar el archivo Excel. Verifica que tenga formato válido (.xlsx, .xls, .csv)');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmImport = () => {
    if (!parsedData || !parsedData.validLeads) return;

    // Apply campaign category tag
    const finalizedLeads = parsedData.validLeads.map(l => ({
      ...l,
      campaign_category: campaignCategory
    }));

    onImportLeads(finalizedLeads);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">Importador Inteligente Meta Ads Excel</h2>
              <p className="text-xs text-slate-500 font-medium">Filtrado automático de columnas técnicas B, C, E, F, G, I, J, K</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Strict Exclusion Badge / ADHD explanation */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs text-blue-900">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-extrabold block mb-0.5">Regla Estricta de Filtrado Activa:</strong>
              El sistema descarta automáticamente los identificadores técnicos (`created_time`, `ad_id`, `adset_id`, `adset_name`, `campaign_id`, `form_id`, `form_name`, `is_organic`) y extrae únicamente los datos de contacto y perfil de inversión necesarios.
            </div>
          </div>

          {/* Campaign Category Selector */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Asignar Categoría de Campaña
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCampaignCategory('Miami')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  campaignCategory === 'Miami'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🌴 Campaña: Miami
              </button>
              <button
                type="button"
                onClick={() => setCampaignCategory('Nigeria')}
                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  campaignCategory === 'Nigeria'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-700 shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                🌍 Campaña: Nigeria
              </button>
            </div>
          </div>

          {/* Drag & Drop Area */}
          {!parsedData ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-emerald-500 bg-emerald-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/60'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".xlsx, .xls, .csv"
                onChange={handleChange}
                className="hidden"
              />

              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-xs">
                <UploadCloud className="w-7 h-7 text-emerald-600" />
              </div>

              <h3 className="font-extrabold text-slate-800 text-sm mb-1">
                Arrastra tu archivo Excel o CSV de Meta Leads aquí
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                o haz clic para explorar en tu computadora (.xlsx, .xls, .csv)
              </p>

              {isProcessing && (
                <div className="mt-4 text-xs font-bold text-blue-600 animate-pulse">
                  Procesando y filtrando columnas...
                </div>
              )}
            </div>
          ) : (
            /* Parsed Preview */
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-extrabold text-slate-900 text-sm">
                    {parsedData.validLeads.length} Leads listos para importar
                  </span>
                </div>
                <button
                  onClick={() => setParsedData(null)}
                  className="text-xs text-blue-600 hover:underline font-semibold"
                >
                  Cambiar archivo
                </button>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <p><strong>Archivo:</strong> {selectedFile?.name}</p>
                <p><strong>Columnas ignoradas:</strong> {parsedData.ignoredColumns.join(', ')}</p>
              </div>

              {/* Sample preview list */}
              <div className="max-h-40 overflow-y-auto space-y-1.5 pt-2 border-t border-slate-200">
                {parsedData.validLeads.slice(0, 5).map((l, i) => (
                  <div key={i} className="p-2 bg-white rounded-xl border border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{l.full_name}</span>
                    <span className="text-slate-500 font-mono">{l.phone}</span>
                    <span className="text-[11px] font-semibold text-emerald-600">{l.investment_goal}</span>
                  </div>
                ))}
                {parsedData.validLeads.length > 5 && (
                  <p className="text-[11px] text-center text-slate-400 italic pt-1">
                    + {parsedData.validLeads.length - 5} leads adicionales
                  </p>
                )}
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700 font-bold">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancelar
          </button>

          {parsedData && (
            <button
              onClick={handleConfirmImport}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <span>Importar {parsedData.validLeads.length} Leads a {campaignCategory}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
