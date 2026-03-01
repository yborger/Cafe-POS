/* ============================================================
   app.js — Application entry point.
   Bootstraps modules once the DOM is ready.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Build employee login grid from data
  Auth.init();

  // Start on login page
  UI.showPage('page-login');
});
