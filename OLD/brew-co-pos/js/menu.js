/* ============================================================
   menu.js — Menu rendering, category tabs, item modal,
             order management, and order panel rendering.
   ============================================================ */

const MenuController = (() => {

  /* ── Build menu on page entry ── */
  function init() {
    buildTabs('All');
    renderOrder();
  }

  /* ── Category filter tabs ── */
  function buildTabs(activeCat) {
    State.set('currentCategory', activeCat);

    const cats = ['All', ...new Set(MENU.map(i => i.cat))];
    UI.setHtml('cat-tabs', cats.map(cat =>
      `<button class="cat-tab ${cat === activeCat ? 'active' : ''}" onclick="MenuController.buildTabs('${cat}')">${cat}</button>`
    ).join(''));

    buildGrid(activeCat);
  }

  /* ── Item grid ── */
  function buildGrid(cat) {
    const items = cat === 'All' ? MENU : MENU.filter(i => i.cat === cat);
    UI.setHtml('menu-grid', items.map(item =>
      `<div class="menu-item-card" onclick="MenuController.openModal(${item.id})">
        <span class="item-emoji">${item.emoji}</span>
        <div class="item-name">${item.name}</div>
        <div class="item-desc">${item.desc}</div>
        <div class="item-price">${UI.formatCurrency(item.price)}</div>
      </div>`
    ).join(''));
  }

  /* ── Customization modal ── */
  function openModal(id) {
    const item = MENU.find(i => i.id === id);
    State.set('modalItem', item);

    // Initialize selections to defaults
    const selections = {};
    item.customs.forEach(c => {
      selections[c.label] = c.type === 'multi' ? [...c.selected] : c.selected;
    });
    State.set('modalSelections', selections);

    // Populate modal DOM
    UI.setHtml('mod-emoji', item.emoji);
    UI.setText('mod-title', item.name);
    UI.setText('mod-price', UI.formatCurrency(item.price));
    UI.el('mod-notes').value = '';

    UI.setHtml('modal-customs', item.customs.map(c => `
      <div class="custom-section">
        <div class="custom-section-title">${c.label}</div>
        <div class="options-grid">
          ${c.options.map(opt => {
            const costMatch = opt.match(/\+\$(\d+\.\d+)/);
            const isSelected = c.type === 'multi'
              ? c.selected.includes(opt)
              : opt === c.selected;
            const label = opt.replace(/ \(\+\$[\d.]+\)/, '');
            const costTag = costMatch ? ` <span style="opacity:0.7;font-size:11px">(+$${costMatch[1]})</span>` : '';
            return `<button
              class="opt-chip ${isSelected ? 'selected' : ''}"
              onclick="MenuController.selectOpt('${c.label}', \`${opt}\`, '${c.type}', this)">
              ${label}${costTag}
            </button>`;
          }).join('')}
        </div>
      </div>
    `).join(''));

    UI.el('modal').classList.add('open');
  }

  function closeModal() {
    UI.el('modal').classList.remove('open');
    State.set('modalItem', null);
  }

  /* ── Option selection ── */
  function selectOpt(label, opt, type, btn) {
    const selections = State.get('modalSelections');

    if (type === 'single') {
      selections[label] = opt;
      btn.closest('.options-grid').querySelectorAll('.opt-chip').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
    } else {
      if (!selections[label]) selections[label] = [];
      const idx = selections[label].indexOf(opt);
      if (idx > -1) {
        selections[label].splice(idx, 1);
        btn.classList.remove('selected');
      } else {
        selections[label].push(opt);
        btn.classList.add('selected');
      }
    }
  }

  /* ── Calculate extra cost from selections ── */
  function calcExtraCost() {
    let extra = 0;
    const selections = State.get('modalSelections');
    Object.values(selections).forEach(val => {
      const arr = Array.isArray(val) ? val : [val];
      arr.forEach(opt => {
        const m = opt.match(/\+\$(\d+\.\d+)/);
        if (m) extra += parseFloat(m[1]);
      });
    });
    return extra;
  }

  /* ── Add item to order ── */
  function addToOrder() {
    const item       = State.get('modalItem');
    const selections = State.get('modalSelections');
    const extra      = calcExtraCost();

    // Build readable mod strings
    const mods = [];
    Object.entries(selections).forEach(([label, val]) => {
      const arr     = Array.isArray(val) ? val : [val];
      const cleaned = arr
        .filter(o => o !== 'None')
        .map(o => o.replace(/ \(\+\$[\d.]+\)/, ''));
      if (cleaned.length) mods.push(`${label}: ${cleaned.join(', ')}`);
    });

    const notes = UI.el('mod-notes').value.trim();
    if (notes) mods.push(`Note: ${notes}`);

    State.addOrderItem({
      id:    Date.now(),
      item,
      qty:   1,
      price: item.price + extra,
      mods,
    });

    closeModal();
    renderOrder();
  }

  /* ── Quantity change ── */
  function changeQty(id, delta) {
    State.updateOrderQty(id, delta);
    renderOrder();
  }

  /* ── Render order panel ── */
  function renderOrder() {
    const order = State.get('order');
    const el    = UI.el('order-items');

    if (order.length === 0) {
      el.innerHTML = `
        <div class="order-empty">
          <span class="empty-icon">&#128721;</span>
          No items yet.<br>Tap a menu item to add.
        </div>`;
    } else {
      el.innerHTML = order.map(o => `
        <div class="order-item">
          <span style="font-size:24px">${o.item.emoji}</span>
          <div class="oi-info">
            <div class="oi-name">${o.item.name}</div>
            ${o.mods.length ? `<div class="oi-mods">${o.mods.join(' &middot; ')}</div>` : ''}
            <div class="qty-ctrl">
              <button class="qty-btn" onclick="MenuController.changeQty(${o.id}, -1)">&#8722;</button>
              <span class="qty-num">${o.qty}</span>
              <button class="qty-btn" onclick="MenuController.changeQty(${o.id}, 1)">+</button>
            </div>
          </div>
          <div class="oi-price">${UI.formatCurrency(o.price * o.qty)}</div>
        </div>
      `).join('');
    }

    UI.refreshTotals();
  }

  return { init, buildTabs, openModal, closeModal, selectOpt, addToOrder, changeQty, renderOrder };
})();
