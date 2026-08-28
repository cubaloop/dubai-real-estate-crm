/**
 * Supabase Connection Client configuration.
 * Ready for deployment on Netlify using environment variables:
 * VITE_SUPABASE_URL
 * VITE_SUPABASE_ANON_KEY
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

export const getSupabaseConfig = () => {
  return {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
    status: isSupabaseConfigured() ? 'Connected' : 'Local Storage Mode'
  };
};

/**
 * Saves lead state to LocalStorage as a fallback when Supabase is not active.
 */
export const saveLeadsToStorage = (leads) => {
  try {
    localStorage.setItem('dubai_crm_leads', JSON.stringify(leads));
  } catch (e) {
    console.error('Error saving leads to localStorage', e);
  }
};

export const loadLeadsFromStorage = (defaultLeads) => {
  try {
    const saved = localStorage.getItem('dubai_crm_leads');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Error loading leads from localStorage', e);
  }
  return defaultLeads;
};
