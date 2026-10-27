/* ===== MUIDS Residence apps — settings (edit this file only) ===== */
window.APP_CONFIG = {
  API_URL: 'https://script.google.com/macros/s/AKfycbxfX0mzfhbbz8GH484lyUn-lwX5U9V_2-LuXsHMUGFzt8hb2-8U_CHS1Q8eHnCXsFDQ/exec',   // Apps Script Web app URL ending in /exec
  LOGO_URL: 'muids-logo.png',
  OFFICE_PHONE: '080-060-6139',
  OFFICE_HOURS: 'Mon–Sun, 15:00–20:00'
};

/* shared helper: call the Apps Script API (text/plain = no CORS preflight, works from GitHub Pages) */
window.api = async function (body) {
  const res = await fetch(window.APP_CONFIG.API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(body)
  });
  return res.json();
};

/* register the service worker (makes the apps installable / faster to open) */
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
