# MEDI SPLIT

**Smart Medicine Price & Discount Calculator**  

---

## Overview

**MediSplit** is a fast, browser-based utility designed for pharmaceutical sales workers. It lets users build a medicine list, apply a discount percentage, instantly view per-item and grand-total breakdowns — all without any account or server required.

---

## Features

- **Medicine Entry Form** — Add medicines by name, unit price, and quantity. Pressing `Enter` submits the form.
- **Autocomplete Suggestions** — As you type a medicine name, previously saved medicines are suggested with their last-used price. Selecting a suggestion auto-fills the price field.
- **Auto-save to Browser** — Every medicine you add is automatically saved to `localStorage`. The saved list persists across sessions.
- **Product List with Live Discount** — All added products are displayed in a responsive table (desktop) or card layout (mobile), showing unit price, quantity, total, and the after-discount price in real time.
- **Edit & Delete** — Each product row has Edit and Delete actions. Editing pre-fills the form at the top; saving updates the list immediately.
- **Discount Application** — Enter a discount percentage (0–100). All per-item "After Discount" values and the grand total summary update instantly.
- **Calculation Summary** — A dedicated Summary section shows: Total Product Price → Discount % → Discount Amount → **Final Payable**.
- **Preview Modal** — Preview the full calculation (table + summary) in a modal before downloading the PDF.
- **Clear All** — Clears the current working session (product list + discount). Does not affect saved medicines.
- **Saved Medicines Page** — A dedicated page listing all locally saved medicines. Supports inline editing (name + price) and deletion of individual or all entries.
- **Language Toggle** — Switch the interface between **English** and **Bangla (বাংলা)** via Google Translate, accessible from the navigation sidebar.
- **Responsive Design** — Fully optimized for both desktop and mobile viewports.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Persistence | Browser `localStorage` |
| Translation | Google Translate Widget |

---

## How It Works

1. **Add medicines** using the form on the Home page. Each entry requires a name, unit price, and quantity. The row total is calculated as `unitPrice × quantity`.
2. **Saved medicines** are written to `localStorage` automatically. The next time you type a medicine name, matching suggestions appear in a dropdown.
3. **Apply a discount** by entering a percentage in the Discount field. All totals recalculate in real time — no button press needed.
4. **Review the summary** which shows the grand total, discount amount deducted, and the final payable amount.
5. **Manage saved medicines** via the *Saved Medicines* page in the navigation menu — edit names/prices inline or delete entries permanently.

---

## Pages & Navigation

| Route | Description |
|---|---|
| `/` | Home — main calculator |
| `/all-medicines` | View, edit, and delete all locally saved medicines |
| `/how-to-use` | Step-by-step usage guide |
| `/terms-and-conditions` | Terms & Conditions |

Navigation is accessible via a **sidebar drawer** opened from the header menu button.

---

## Local Development

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm** (comes with Node.js)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/SIMANTO-PODDAR/Medi-Split.git
cd medi-split

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the production bundle |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Data & Privacy

All medicine data is stored **exclusively in your browser's `localStorage`**. No data is sent to any server. Clearing your browser data will remove all saved medicines.

---

## Credits

- **Developer**: [Simanto Poddar](https://simanto-poddar-portfolio.vercel.app)
