/* ============================================================
   data.js — All menu items, categories, and configuration.
   Edit this file to update the menu without touching any logic.
   ============================================================ */

const CONFIG = {
  taxRate:      0.085,   // 8.5%
  storeName:    'Brew & Co',
  storeAddress: '123 Main St · Long Branch, NJ · (732) 555-0190',
  cardDelay:    1500,    // ms before card/mobile "ready" (simulates terminal)
};

/**
 * EMPLOYEES
 * Each employee has: name, role, avatarColor, pin
 * PIN is stored as a string for leading-zero support.
 * In production this would be a hashed server-side check.
 */
const EMPLOYEES = [
  { name: 'Maya',   role: 'Barista',    avatarColor: '#6b3f2a', pin: '1234' },
  { name: 'Jordan', role: 'Barista',    avatarColor: '#4a2f1a', pin: '5678' },
  { name: 'Sam',    role: 'Shift Lead', avatarColor: '#3a7c5c', pin: '9012' },
  { name: 'Alex',   role: 'Manager',    avatarColor: '#c8813a', pin: '3456' },
];

/**
 * MENU
 * Each item has:
 *   id       — unique number
 *   cat      — category string (used to build filter tabs)
 *   emoji    — display emoji (HTML entity string for safety)
 *   name     — display name
 *   price    — base price in USD (number)
 *   desc     — short description
 *   customs  — array of customization groups:
 *     label    — section heading
 *     type     — 'single' (radio) | 'multi' (checkbox)
 *     options  — array of option strings; include "(+$X.XX)" to add cost
 *     selected — default selection (string for single, [] for multi)
 */
const MENU = [
  /* ── COFFEE ── */
  {
    id: 1, cat: 'Coffee', emoji: '&#9749;',
    name: 'Espresso', price: 2.75,
    desc: 'Rich & bold, straight from the group head',
    customs: [
      { label: 'Shot',        type: 'single', options: ['Single', 'Double (+$0.50)'],            selected: 'Single' },
      { label: 'Temperature', type: 'single', options: ['Hot', 'Extra Hot', 'Iced (+$0.50)'],    selected: 'Hot'    },
    ],
  },
  {
    id: 2, cat: 'Coffee', emoji: '&#129483;',
    name: 'Latte', price: 5.25,
    desc: 'Espresso with velvety steamed milk',
    customs: [
      { label: 'Size',        type: 'single', options: ['Small 12oz', 'Medium 16oz (+$0.50)', 'Large 20oz (+$1.00)'], selected: 'Small 12oz' },
      { label: 'Milk',        type: 'single', options: ['Whole', 'Oat (+$0.75)', 'Almond (+$0.75)', 'Skim'],          selected: 'Whole'      },
      { label: 'Shots',       type: 'single', options: ['1 Shot', '2 Shots (+$0.50)', '3 Shots (+$1.00)'],           selected: '1 Shot'     },
      { label: 'Syrup',       type: 'multi',  options: ['Vanilla (+$0.50)', 'Caramel (+$0.50)', 'Hazelnut (+$0.50)'], selected: []           },
      { label: 'Temperature', type: 'single', options: ['Hot', 'Iced'],                                               selected: 'Hot'        },
    ],
  },
  {
    id: 3, cat: 'Coffee', emoji: '&#127751;',
    name: 'Cappuccino', price: 4.75,
    desc: 'Equal parts espresso, steamed milk & microfoam',
    customs: [
      { label: 'Size',  type: 'single', options: ['Small', 'Medium (+$0.50)'],                         selected: 'Small'    },
      { label: 'Milk',  type: 'single', options: ['Whole', 'Oat (+$0.75)', 'Skim'],                    selected: 'Whole'    },
      { label: 'Style', type: 'single', options: ['Standard', 'Dry (more foam)', 'Wet (more milk)'],   selected: 'Standard' },
    ],
  },
  {
    id: 4, cat: 'Coffee', emoji: '&#10052;&#65039;',
    name: 'Cold Brew', price: 5.50,
    desc: 'Slow-steeped 12 hours, served over ice',
    customs: [
      { label: 'Size',     type: 'single', options: ['12oz', '16oz (+$0.75)'],                                          selected: '12oz' },
      { label: 'Add-ons',  type: 'multi',  options: ['Oat Milk (+$0.75)', 'Sweet Cream (+$0.75)', 'Vanilla Syrup (+$0.50)'], selected: [] },
    ],
  },
  {
    id: 5, cat: 'Coffee', emoji: '&#127810;',
    name: 'Pumpkin Spice Latte', price: 6.00,
    desc: 'Seasonal — espresso, pumpkin, warm spices',
    customs: [
      { label: 'Size',  type: 'single', options: ['Medium', 'Large (+$0.75)'],         selected: 'Medium' },
      { label: 'Milk',  type: 'single', options: ['Whole', 'Oat (+$0.75)', 'Skim'],    selected: 'Whole'  },
      { label: 'Whip',  type: 'single', options: ['Whipped Cream', 'No Whip'],         selected: 'Whipped Cream' },
    ],
  },
  {
    id: 6, cat: 'Coffee', emoji: '&#127774;',
    name: 'Americano', price: 3.75,
    desc: 'Espresso diluted with hot water',
    customs: [
      { label: 'Size',        type: 'single', options: ['Small', 'Medium (+$0.50)', 'Large (+$1.00)'], selected: 'Small' },
      { label: 'Temperature', type: 'single', options: ['Hot', 'Iced'],                                selected: 'Hot'   },
    ],
  },

  /* ── TEA ── */
  {
    id: 7, cat: 'Tea', emoji: '&#127861;',
    name: 'Matcha Latte', price: 5.75,
    desc: 'Ceremonial grade matcha, steamed milk',
    customs: [
      { label: 'Milk',       type: 'single', options: ['Oat', 'Almond', 'Whole'],                             selected: 'Oat'      },
      { label: 'Sweetness',  type: 'single', options: ['Unsweetened', 'Light', 'Regular', 'Extra Sweet'],     selected: 'Regular'  },
      { label: 'Temperature',type: 'single', options: ['Hot', 'Iced'],                                        selected: 'Hot'      },
    ],
  },
  {
    id: 8, cat: 'Tea', emoji: '&#127807;',
    name: 'Herbal Tea', price: 3.50,
    desc: 'Organic loose-leaf, steeped to order',
    customs: [
      { label: 'Blend', type: 'single', options: ['Chamomile', 'Peppermint', 'Hibiscus', 'Ginger Lemon'], selected: 'Chamomile' },
      { label: 'Honey', type: 'single', options: ['None', 'Local Honey (+$0.50)'],                        selected: 'None'     },
    ],
  },
  {
    id: 9, cat: 'Tea', emoji: '&#9924;',
    name: 'Iced Chai', price: 5.25,
    desc: 'Spiced masala chai concentrate over ice',
    customs: [
      { label: 'Size',      type: 'single', options: ['Medium', 'Large (+$0.75)'],                    selected: 'Medium'   },
      { label: 'Milk',      type: 'single', options: ['Oat', 'Whole', 'Almond (+$0.25)'],             selected: 'Oat'      },
      { label: 'Sweetness', type: 'single', options: ['Light', 'Regular', 'Sweet'],                   selected: 'Regular'  },
    ],
  },

  /* ── FOOD ── */
  {
    id: 10, cat: 'Food', emoji: '&#129360;',
    name: 'Croissant', price: 3.75,
    desc: 'Buttery, flaky, baked fresh each morning',
    customs: [
      { label: 'Temperature', type: 'single', options: ['Warmed', 'Room Temp'],                    selected: 'Warmed' },
      { label: 'Add-on',      type: 'single', options: ['Plain', 'Butter (+$0.25)', 'Jam (+$0.50)'], selected: 'Plain' },
    ],
  },
  {
    id: 11, cat: 'Food', emoji: '&#129379;',
    name: 'Avocado Toast', price: 8.50,
    desc: 'Toasted sourdough, smashed avo, sea salt',
    customs: [
      { label: 'Extras', type: 'multi', options: ['Egg (+$1.50)', 'Red Pepper Flakes', 'Feta Cheese (+$0.75)', 'Everything Bagel Seasoning'], selected: [] },
    ],
  },
  {
    id: 12, cat: 'Food', emoji: '&#127856;',
    name: 'Slice of Cake', price: 5.00,
    desc: "Ask your barista for today's selection",
    customs: [
      { label: 'Flavor', type: 'single', options: ['Lemon Ricotta', 'Chocolate Fudge', 'Carrot'], selected: 'Lemon Ricotta' },
      { label: 'Warmed', type: 'single', options: ['No', 'Warmed'],                               selected: 'No'            },
    ],
  },
  {
    id: 13, cat: 'Food', emoji: '&#129365;',
    name: 'Granola Bowl', price: 7.00,
    desc: 'House granola, yogurt, seasonal fruit',
    customs: [
      { label: 'Yogurt', type: 'single', options: ['Greek', 'Coconut (vegan)'],       selected: 'Greek' },
      { label: 'Extras', type: 'multi',  options: ['Extra Honey (+$0.50)', 'Chia Seeds (+$0.50)'], selected: [] },
    ],
  },

  /* ── DRINKS ── */
  {
    id: 14, cat: 'Drinks', emoji: '&#129380;',
    name: 'Lemonade', price: 3.75,
    desc: 'Fresh-squeezed, made daily in-house',
    customs: [
      { label: 'Style',     type: 'single', options: ['Classic', 'Strawberry (+$0.50)', 'Lavender (+$0.50)'], selected: 'Classic' },
      { label: 'Sparkling', type: 'single', options: ['Still', 'Sparkling (+$0.25)'],                         selected: 'Still'   },
    ],
  },
  {
    id: 15, cat: 'Drinks', emoji: '&#127818;',
    name: 'Smoothie', price: 7.50,
    desc: 'Blended to order with fresh fruit',
    customs: [
      { label: 'Blend',  type: 'single', options: ['Tropical Mango', 'Berry Blast', 'Green Detox'],         selected: 'Tropical Mango' },
      { label: 'Base',   type: 'single', options: ['Oat Milk', 'Coconut Water', 'Whole Milk'],               selected: 'Oat Milk'       },
      { label: 'Boost',  type: 'multi',  options: ['Protein (+$1.00)', 'Collagen (+$1.00)', 'Spirulina (+$0.75)'], selected: []        },
    ],
  },
  {
    id: 16, cat: 'Drinks', emoji: '&#127758;',
    name: 'Sparkling Water', price: 2.50,
    desc: 'San Pellegrino, served over ice',
    customs: [
      { label: 'Add citrus', type: 'single', options: ['None', 'Lemon', 'Lime', 'Orange'], selected: 'None' },
    ],
  },
];
