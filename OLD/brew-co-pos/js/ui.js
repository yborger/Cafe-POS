/* ============================================================
   ui.js — Shared UI utilities: page routing, DOM helpers,
           formatting helpers. No business logic lives here.
   ============================================================ */

const UI = (() => {

  /* ── Page routing ── */
  function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
  }

  /* ── Format helpers ── */
  function formatCurrency(amount) {
    return '$' + amount.toFixed(2);
  }

  /* ── DOM shorthand ── */
  function el(id)          { return document.getElementById(id); }
  function setText(id, v)  { el(id).textContent = v; }
  function setHtml(id, v)  { el(id).innerHTML   = v; }

  /* ── Class toggles ── */
  function addClass(id, cls)    { el(id).classList.add(cls); }
  function removeClass(id, cls) { el(id).classList.remove(cls); }
  function toggleClass(id, cls, force) { el(id).classList.toggle(cls, force); }

  /* ── Update order totals in the sidebar ── */
  function refreshTotals() {
    setText('sub-total',   formatCurrency(State.getSubtotal()));
    setText('tax-total',   formatCurrency(State.getTax()));
    setText('grand-total', formatCurrency(State.getGrandTotal()));
    setText('order-count', State.getItemCount());
    el('btn-checkout').disabled = State.get('order').length === 0;
  }

  /* ── Build employee avatar initials ── */
  function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  }

  return { showPage, formatCurrency, el, setText, setHtml, addClass, removeClass, toggleClass, refreshTotals, getInitials };
})();
