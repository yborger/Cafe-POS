/* ============================================================
   payment.js — Payment page: method selection, cash change
                calculator, receipt building, and completion.
   ============================================================ */

const Payment = (() => {

  /* ── Navigate to payment page ── */
  function goTo() {
    if (State.get('order').length === 0) return;

    // Reset payment state
    State.set('paymentMethod', null);
    document.querySelectorAll('.pay-method').forEach(p => p.classList.remove('selected'));
    ['cash-section', 'card-section', 'mobile-section'].forEach(id =>
      UI.el(id).classList.remove('visible')
    );
    UI.el('btn-complete-pay').classList.remove('ready');
    UI.el('cash-input').value = '';
    UI.setText('change-due', '$0.00');

    buildReceipt();
    UI.showPage('page-payment');
  }

  /* ── Build the receipt sidebar ── */
  function buildReceipt() {
    const order = State.get('order');
    UI.setText('r-sub',   UI.formatCurrency(State.getSubtotal()));
    UI.setText('r-tax',   UI.formatCurrency(State.getTax()));
    UI.setText('r-total', UI.formatCurrency(State.getGrandTotal()));

    UI.setHtml('receipt-items', order.map(o => `
      <div class="receipt-item">
        <div>
          <div class="ri-name">${o.item.emoji} ${o.item.name} &times; ${o.qty}</div>
          ${o.mods.length ? `<div class="ri-mods">${o.mods.join(', ')}</div>` : ''}
        </div>
        <div class="ri-price">${UI.formatCurrency(o.price * o.qty)}</div>
      </div>
    `).join(''));
  }

  /* ── Payment method selection ── */
  function selectMethod(method) {
    State.set('paymentMethod', method);

    document.querySelectorAll('.pay-method').forEach(p => p.classList.remove('selected'));
    UI.el(`pm-${method}`).classList.add('selected');

    ['cash-section', 'card-section', 'mobile-section'].forEach(id =>
      UI.el(id).classList.remove('visible')
    );

    const completeBtn = UI.el('btn-complete-pay');
    completeBtn.classList.remove('ready');

    if (method === 'cash') {
      UI.el('cash-section').classList.add('visible');
      buildQuickCash();
    } else if (method === 'card') {
      UI.el('card-section').classList.add('visible');
      setTimeout(() => completeBtn.classList.add('ready'), CONFIG.cardDelay);
    } else if (method === 'mobile') {
      UI.el('mobile-section').classList.add('visible');
      setTimeout(() => completeBtn.classList.add('ready'), CONFIG.cardDelay);
    }
  }

  /* ── Quick-tender cash buttons ── */
  function buildQuickCash() {
    const grand = State.getGrandTotal();
    const amounts = [...new Set([
      Math.ceil(grand),
      Math.ceil(grand / 5)  * 5,
      Math.ceil(grand / 10) * 10,
      Math.ceil(grand / 20) * 20,
    ])].slice(0, 4);

    UI.setHtml('cash-quick-btns', amounts.map(a =>
      `<button class="cash-btn" onclick="Payment.setCash(${a}, this)">${UI.formatCurrency(a)}</button>`
    ).join(''));
  }

  /* ── Set cash amount (from quick buttons or manual) ── */
  function setCash(amount, btn) {
    UI.el('cash-input').value = amount.toFixed(2);
    document.querySelectorAll('.cash-btn').forEach(b => b.classList.remove('selected'));
    if (btn) btn.classList.add('selected');
    calcChange();
  }

  /* ── Calculate change ── */
  function calcChange() {
    const tendered = parseFloat(UI.el('cash-input').value) || 0;
    const grand    = State.getGrandTotal();
    const change   = tendered - grand;

    UI.setText('change-due', change >= 0 ? UI.formatCurrency(change) : '—');

    const completeBtn = UI.el('btn-complete-pay');
    if (change >= 0) completeBtn.classList.add('ready');
    else             completeBtn.classList.remove('ready');
  }

  /* ── Complete payment ── */
  function complete() {
    const method     = State.get('paymentMethod');
    const changeBox  = UI.el('success-change-box');

    if (method === 'cash') {
      const tendered = parseFloat(UI.el('cash-input').value) || 0;
      const change   = tendered - State.getGrandTotal();
      changeBox.style.display = 'block';
      UI.setText('success-change-amt', UI.formatCurrency(change));
    } else {
      changeBox.style.display = 'none';
    }

    UI.el('success-overlay').classList.add('open');
  }

  /* ── Start new order ── */
  function newOrder() {
    State.clearOrder();
    State.set('paymentMethod', null);
    UI.el('success-overlay').classList.remove('open');
    UI.showPage('page-menu');
    MenuController.init();
  }

  /* ── Back to menu ── */
  function back() {
    UI.showPage('page-menu');
  }

  return { goTo, selectMethod, setCash, calcChange, complete, newOrder, back };
})();
