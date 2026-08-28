import * as XLSX from 'xlsx';

// STRICT COLUMN EXCLUSION RULE:
// IGNORE AND HIDE AUTOMATICALLY columns: created_time, ad_id, adset_id, adset_name, campaign_id, form_id, form_name, is_organic
const HIDE_COLUMNS = [
  'created_time',
  'ad_id',
  'adset_id',
  'adset_name',
  'campaign_id',
  'form_id',
  'form_name',
  'is_organic'
];

/**
 * Parses an Excel (.xlsx / .xls) or CSV file and maps Meta/Facebook Lead Ads format
 * strictly excluding the 8 technical columns.
 */
export const parseMetaLeadExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert sheet to array of raw objects
        const rawJson = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

        const cleanedLeads = [];

        rawJson.forEach((row, index) => {
          // Normalize object keys (lowercase and trimmed)
          const normalizedRow = {};
          Object.keys(row).forEach(key => {
            const cleanKey = key.trim().toLowerCase();
            normalizedRow[cleanKey] = row[key];
          });

          // Extract required 8 field categories while ignoring HIDE_COLUMNS
          const fullName = normalizedRow['full name'] || normalizedRow['fullname'] || normalizedRow['name'] || `Lead #${index + 1}`;
          const rawPhone = String(normalizedRow['phone'] || normalizedRow['phone_number'] || '').replace(/^p:/, '');
          const workPhone = String(normalizedRow['work_phone_number'] || normalizedRow['work_phone'] || '');
          const email = normalizedRow['email'] || '';
          
          const investmentGoal = normalizedRow['what_is_your_main_goal_with_a_dubai_property_investment?'] || 
                                normalizedRow['investment_goal'] || 
                                normalizedRow['what_is_your_main_goal'] || 'investment_purpose';
                                
          const purchaseTimeline = normalizedRow['when_do_you_plan_to_purchase_your_property?'] || 
                                  normalizedRow['purchase_timeline'] || 
                                  normalizedRow['when_do_you_plan'] || 'within_3_-_6_months';
                                  
          const preferredCallTime = normalizedRow['what_is_your_preferred_time_to_call?'] || 
                                   normalizedRow['preferred_time_to_call'] || '12pm_-_4pm_';

          const adName = normalizedRow['ad_name'] || '';
          const campaignName = normalizedRow['campaign_name'] || '';
          const platform = normalizedRow['platform'] || 'fb';
          const rawStatus = normalizedRow['lead_status'] || 'CREATED';
          const comments = normalizedRow['comments'] || normalizedRow['comment'] || '';

          // Map lead_status to Kanban column ID
          let leadStatus = 'new';
          const statusLower = String(rawStatus).toLowerCase();
          if (statusLower.includes('contact') || statusLower.includes('vasu')) leadStatus = 'contacted';
          else if (statusLower.includes('follow') || statusLower.includes('seguimiento')) leadStatus = 'following_up';
          else if (statusLower.includes('meeting') || statusLower.includes('cita')) leadStatus = 'meeting_scheduled';
          else if (statusLower.includes('reserv') || statusLower.includes('eoi')) leadStatus = 'reserved';
          else if (statusLower.includes('closed') || statusLower.includes('cerrado')) leadStatus = 'closed';
          else if (statusLower.includes('disqualific') || statusLower.includes('no_interesado')) leadStatus = 'disqualified';

          cleanedLeads.push({
            id: normalizedRow['id'] || `imported-${Date.now()}-${index}`,
            full_name: fullName,
            phone: rawPhone,
            work_phone_number: workPhone,
            email: email,
            investment_goal: investmentGoal,
            purchase_timeline: purchaseTimeline,
            preferred_time_to_call: preferredCallTime,
            ad_name: adName,
            campaign_name: campaignName,
            platform: platform,
            lead_status: leadStatus,
            comments: comments,
            budget: 'Not Specified',
            next_task_date: null, // Will trigger ADHD red alert dot until set
            activity_log: [
              { timestamp: new Date().toLocaleString(), note: `Imported via Excel Parser (Columns B, C, E, F, G, I, J, K auto-filtered).` }
            ]
          });
        });

        resolve({
          totalProcessed: rawJson.length,
          validLeads: cleanedLeads,
          ignoredColumns: HIDE_COLUMNS
        });
      } catch (err) {
        reject(err);
      }
    };

    reader.onerror = (err) => reject(err);
    reader.readAsArrayBuffer(file);
  });
};
