# ☕ Brew & Co — Point of Sale

A clean, multi-file browser-based POS system for a café. No build tools, no dependencies — just open `index.html`.

---

## Project Structure

```
pos/
├── index.html          # App shell & all page markup
├── README.md
│
├── css/
│   ├── base.css        # CSS variables, resets, animations, shared components
│   ├── login.css       # Employee login page
│   ├── menu.css        # Menu grid, category tabs, order panel
│   ├── payment.css     # Payment methods, receipt sidebar
│   └── modal.css       # Item customization modal
│
└── js/
    ├── data.js         # ⬅ Edit this to update the menu & employees
    ├── state.js        # Single source of truth (app state)
    ├── ui.js           # Shared DOM utilities & formatters
    ├── auth.js         # Login, PIN entry, sign-out
    ├── menu.js         # Menu rendering, modal, order management
    ├── payment.js      # Payment flow, change calculator, receipt
    └── app.js          # Entry point — bootstraps everything
```

---

## Features

### Login
- Employee selection grid (built from `data.js`)
- 4-digit PIN authentication with visual dot indicators
- Sign out from any page

### Menu
- Category filter tabs (auto-generated from item data)
- Item cards with emoji, description, and base price
- Customization modal per item:
  - **Single-select** options (size, milk, temperature, etc.)
  - **Multi-select** options (syrups, add-ons, extras)
  - Special instructions free-text field
  - Add-on costs automatically calculated
- Live order panel with quantity controls
- Running subtotal, tax (8.5%), and grand total

### Payment
- Three payment methods: Cash · Card · Mobile Pay
- Cash: quick-tender buttons + manual input + change calculator
- Card/Mobile: animated terminal waiting state
- Receipt summary sidebar
- Success screen with change due (cash) or confirmation

---

## Customizing the Menu

All menu data lives in **`js/data.js`** — no other file needs touching.

### Adding an employee
```js
{ name: 'Riley', role: 'Barista', avatarColor: '#5a3e8c', pin: '7890' }
```

### Adding a menu item
```js
{
  id: 17, cat: 'Coffee', emoji: '&#9749;',
  name: 'Flat White', price: 5.00,
  desc: 'Ristretto shots with microfoam',
  customs: [
    { label: 'Milk', type: 'single', options: ['Whole', 'Oat (+$0.75)'], selected: 'Whole' },
    { label: 'Size', type: 'single', options: ['Small', 'Large (+$0.75)'], selected: 'Small' },
  ],
},
```

**Option pricing:** Include `(+$X.XX)` anywhere in the option string and the cost is automatically parsed and added to the item total.

```js
options: ['Vanilla (+$0.50)', 'Caramel (+$0.50)', 'None']
//         ↑ adds $0.50           ↑ adds $0.50       ↑ free
```

### Changing tax rate or store info
Edit the `CONFIG` object at the top of `js/data.js`:
```js
const CONFIG = {
  taxRate:      0.085,
  storeName:    'Brew & Co',
  storeAddress: '123 Main St · Long Branch, NJ',
  cardDelay:    1500,   // ms before card terminal shows "ready"
};
```

---

## Running Locally

No server needed — just open `index.html` in any modern browser.

```bash
# Or with a simple dev server:
npx serve .
python3 -m http.server 8080
```

---

## Demo PINs

| Employee | Role       | PIN  |
|----------|------------|------|
| Maya     | Barista    | 1234 |
| Jordan   | Barista    | 5678 |
| Sam      | Shift Lead | 9012 |
| Alex     | Manager    | 3456 |
