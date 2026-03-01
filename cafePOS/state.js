/* ============================================================
   state.js — Single source of truth for application state.
   All modules read/write through this object. No state lives
   scattered in individual modules.
   ============================================================ */

const State = (() => {
  let _state = {
    currentEmployee:   null,   // { name, role, avatarColor }
    currentPin:        null,   // correct PIN for selected employee
    pinEntered:        '',     // digits entered so far
    order:             [],     // array of order line items
    currentCategory:   'All',  // active menu filter tab
    paymentMethod:     null,   // 'cash' | 'card' | 'mobile'
    modalItem:         null,   // menu item currently in customization modal
    modalSelections:   {},     // { [label]: string | string[] }
  };

  return {
    get: (key)         => _state[key],
    set: (key, value)  => { _state[key] = value; },
    reset: ()          => {
      _state.currentEmployee = null;
      _state.currentPin      = null;
      _state.pinEntered      = '';
      _state.order           = [];
      _state.currentCategory = 'All';
      _state.paymentMethod   = null;
      _state.modalItem       = null;
      _state.modalSelections = {};
    },

    /* Order helpers */
    addOrderItem(item) {
      _state.order.push(item);
    },
    removeOrderItem(id) {
      _state.order = _state.order.filter(o => o.id !== id);
    },
    updateOrderQty(id, delta) {
      const line = _state.order.find(o => o.id === id);
      if (!line) return;
      line.qty += delta;
      if (line.qty <= 0) this.removeOrderItem(id);
    },
    clearOrder() {
      _state.order = [];
    },

    /* Derived totals */
    getSubtotal() {
      return _state.order.reduce((sum, o) => sum + o.price * o.qty, 0);
    },
    getTax() {
      return this.getSubtotal() * CONFIG.taxRate;
    },
    getGrandTotal() {
      return this.getSubtotal() + this.getTax();
    },
    getItemCount() {
      return _state.order.reduce((sum, o) => sum + o.qty, 0);
    },
  };
})();
