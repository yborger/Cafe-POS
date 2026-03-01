/* ============================================================
   auth.js — Employee login, PIN entry, and sign-out logic.
   ============================================================ */

const Auth = (() => {

  /* ── Build employee buttons from data ── */
  function init() {
    const grid = UI.el('employees-grid');
    grid.innerHTML = EMPLOYEES.map((emp, i) =>
      `<div class="employee-btn" onclick="Auth.selectEmployee(${i})" id="emp-btn-${i}">
        <div class="avatar" style="background:${emp.avatarColor}">${UI.getInitials(emp.name)}</div>
        <div class="name">${emp.name}</div>
        <div class="role">${emp.role}</div>
      </div>`
    ).join('');
  }

  /* ── Employee selection ── */
  function selectEmployee(index) {
    const emp = EMPLOYEES[index];
    State.set('currentEmployee', emp);
    State.set('currentPin', emp.pin);
    clearPin();
    setError('');

    document.querySelectorAll('.employee-btn').forEach(b => b.classList.remove('selected'));
    UI.el(`emp-btn-${index}`).classList.add('selected');
  }

  /* ── PIN entry ── */
  function enterPin(digit) {
    const current = State.get('pinEntered');
    if (current.length >= 4) return;
    State.set('pinEntered', current + digit);
    updateDots();
  }

  function clearPin() {
    State.set('pinEntered', '');
    updateDots();
  }

  function updateDots() {
    const len = State.get('pinEntered').length;
    for (let i = 0; i < 4; i++) {
      UI.toggleClass(`dot${i}`, 'filled', i < len);
    }
  }

  /* ── Submission ── */
  function submit() {
    const emp = State.get('currentEmployee');
    const pin = State.get('pinEntered');

    if (!emp)          { setError('Please select an employee.'); return; }
    if (pin.length < 4){ setError('Please enter your 4-digit PIN.'); return; }
    if (pin !== State.get('currentPin')) {
      setError('Incorrect PIN. Try again.');
      clearPin();
      return;
    }

    setError('');
    UI.setText('cashier-name', `Cashier: ${emp.name}`);
    UI.showPage('page-menu');
    MenuController.init();
  }

  /* ── Sign out ── */
  function signOut() {
    State.reset();
    document.querySelectorAll('.employee-btn').forEach(b => b.classList.remove('selected'));
    updateDots();
    setError('');
    UI.showPage('page-login');
  }

  function setError(msg) {
    UI.setText('login-error', msg);
  }

  return { init, selectEmployee, enterPin, clearPin, submit, signOut };
})();
