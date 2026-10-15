# Medi-Split

**A fast, local-first medicine pricing and discount calculator designed for pharmaceutical sales representatives, field workers, and retail pharmacy staff.**

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#environment-variables)
  - [Variable Reference](#variable-reference)
  - [Configuration Template](#configuration-template)
- [Firebase Configuration & Services](#firebase-configuration--services)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Security and Privacy](#security-and-privacy)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License and Credits](#license-and-credits)

---

## Overview

In pharmaceutical distribution and retail sales, medical representatives and pharmacists regularly calculate aggregate costs for varied lists of medications, negotiate percentage-based trade discounts or dealer promotions, and generate payable totals on the spot. Performing these calculations manually or via generic calculators is prone to human error and slows down field operations.

**Medi-Split** solves this with an instant, zero-friction web utility:

- **Zero Friction**: Operates immediately in the browser without requiring user registration, login, or database authentication.
- **Client-Side Privacy**: Medicine names, unit prices, quantities, and calculation totals are processed and stored exclusively in the user's browser runtime and `localStorage`.
- **Field-Ready Design**: Features responsive desktop and mobile layouts, currency formatting in Bangladeshi Taka (`৳`), autocomplete suggestions based on historical entries, and real-time discount adjustments.
- **Operational Telemetry**: Integrates a lightweight, asynchronous visitor analytics pipeline using Firebase Admin SDK and Google Cloud Firestore to record non-sensitive visitor engagement metrics, device categories, and dwell time for application maintenance and threat prevention.

---

## Key Features

- **Interactive Medicine Entry Form**:
  - Add medicines by entering the product name, unit price, and quantity.
  - Pressing `Enter` in any field validates and submits the entry immediately.
  - Dynamic currency formatting using the Bangladeshi Taka symbol (`৳`).
- **Real-Time Autocomplete Suggestions**:
  - As a user types in the product name field, matching entries from previously saved medicines in `localStorage` appear in a dropdown list.
  - Selecting a suggestion auto-fills the product name and its last-used unit price, automatically transferring focus to the quantity input.
- **Dual-Mode Responsive Product List**:
  - **Desktop View**: A tabular layout showing Serial Number (SL), Product Name, Unit Price, Quantity, Row Total (`unitPrice × quantity`), and net price After Discount.
  - **Mobile View**: Optimized touch-friendly card elements displaying product metrics and action buttons cleanly in constrained viewports.
- **Inline Editing & Product Deletion**:
  - Each item in the active calculation list can be edited or removed.
  - Clicking edit populates the form at the top of the page with existing values and smoothly scrolls into view for fast updates.
- **Live Discount Computation**:
  - Apply a global discount percentage (between 0% and 100%).
  - Per-item discounted prices and the grand calculation summary update instantaneously without requiring a manual refresh or button press.
  - Built-in two-decimal financial rounding (`roundCurrency`) prevents floating-point precision inaccuracies.
- **Comprehensive Calculation Summary**:
  - Displays Total Product Price, Applied Discount %, Deducted Discount Amount (highlighted in red), and the final payable balance.
- **Dedicated Saved Medicines Catalog (`/all-medicines`)**:
  - View all medicines saved across sessions directly from browser `localStorage`.
  - Supports inline renaming and unit price editing with confirm (`✓`) and cancel (`✕`) controls.
  - Allows individual deletion or complete catalogue clearing via a confirmation modal dialog.
- **Bilingual Interface (English & Bengali)**:
  - Integrated Google Translate engine supporting seamless toggling between English and Bengali (**বাংলা**).
  - Custom UI controls embedded in the slide-out navigation menu synchronize directly with the `googtrans` cookie and Google Translate widget.
- **Anonymized Engagement & Visitor Telemetry**:
  - Background tracking component (`VisitorTracker`) monitors active window visibility time.
  - Dispatches non-blocking heartbeat beacons to an internal Next.js Route Handler (`/api/track`), which logs daily visitor counts, device types, operating systems, and engagement duration in Google Cloud Firestore via atomic transactions.
- **Reporting & Document Generation Modules**:
  - Implements a dedicated PDF generation utility (`src/lib/pdf.ts`) using `jspdf` and `jspdf-autotable` to produce formatted A4 medicine calculation statements.
  - Includes an invoice preview dialog component (`PreviewModal.tsx`) ready to preview calculations before export.
- **Guidance & Legal Documentation**:
  - Step-by-step usage walkthrough available at `/how-to-use` with anchored section links.
  - Transparent legal terms and acceptable use policy available at `/terms-and-conditions`.

---

## Technology Stack

| Category           | Technology / Library                                                                                        | Version             | Description / Purpose                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Framework**      | [Next.js](https://nextjs.org/)                                                                              | `16.3.4`            | App Router, Server Components, Route Handlers, and image/font optimization                                      |
| **Core UI**        | [React](https://react.dev/)                                                                                 | `19.2.8`            | Component lifecycle, hooks, and virtual DOM                                                                     |
| **Compiler**       | React Compiler                                                                                              | `1.0.0`             | `babel-plugin-react-compiler` enabled via `reactCompiler: true` in `next.config.ts`                             |
| **Language**       | [TypeScript](https://www.typescriptlang.org/)                                                               | `^5`                | Strict static type checking across client and server modules                                                    |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/)                                                                    | `^4`                | Utility-first CSS using `@tailwindcss/postcss` and CSS design tokens                                            |
| **Icons**          | [React Icons](https://react-icons.github.io/react-icons/)                                                   | `^5.7.0`            | Icon sets from Feather (`fi`), Font Awesome 6 (`fa6`), Ionicons 5 (`io5`), Tabler (`tb`), and Game Icons (`gr`) |
| **Local Storage**  | Web Storage API (`localStorage`)                                                                            | Native              | Client-side medicine catalog persistence (`medi-split-saved-products`)                                          |
| **Cloud Database** | [Google Cloud Firestore](https://firebase.google.com/docs/firestore)                                        | —                   | Document-based NoSQL database storing aggregated visitor analytics                                              |
| **Server SDK**     | [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)                                          | `^14.5.0`           | Server-side Firestore transactions, increments, and service account authentication                              |
| **Client SDK**     | [Firebase Web SDK](https://firebase.google.com/docs/web/setup)                                              | `^13.0.0`           | Client-side Firebase application initialization                                                                 |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) & [AutoTable](https://github.com/simonbengtsson/jsPDF-AutoTable) | `^4.2.1` / `^5.0.8` | Client-side invoice and calculation sheet PDF generation engine                                                 |
| **Translation**    | Google Translate Element API                                                                                | External            | Embedded multilingual support for English and Bengali                                                           |
| **Linting**        | [ESLint](https://eslint.org/)                                                                               | `^9`                | Flat configuration with `eslint-config-next` and TypeScript rules                                               |

---

## Project Architecture

The application adopts a hybrid architecture combining a local-first client application with an asynchronous serverless telemetry backend:

```mermaid
graph TD
    subgraph Client ["Client Browser Runtime"]
        UI["React 19 UI (Calculator, Pages, Navigation)"]
        Storage["Browser localStorage<br/>('medi-split-saved-products')"]
        Tracker["VisitorTracker Component<br/>(Visibility API & Heartbeat)"]
        GTrans["Google Translate Script<br/>(Cookie Sync: googtrans)"]
    end

    subgraph NextServer ["Next.js Server (Node.js Runtime)"]
        API["POST /api/track<br/>(Route Handler)"]
        AdminSDK["Firebase Admin SDK<br/>(cert-based credentials)"]
    end

    subgraph Cloud ["External Cloud Services"]
        Firestore[("Google Cloud Firestore<br/>'visitors' Collection")]
    end

    UI <-->|"Read / Write Medicines & Autocomplete"| Storage
    UI -.->|"Triggers Language Switch"| GTrans
    Tracker -->|"Send Beacon / POST (Active Seconds)"| API
    API -->|"Server-Side Authentication"| AdminSDK
    AdminSDK -->|"Atomic Transaction & FieldValue.increment"| Firestore
```

### Architectural Breakdown

1. **Client-Side Pricing & Storage Engine**:
   - All sensitive domain data (medicine names, custom prices, quantities, and discount figures) resides exclusively in the client's memory and browser `localStorage`.
   - Data mutations run through pure helper functions (`src/lib/calculations.ts`, `src/lib/storage.ts`, `src/lib/format.ts`) with input sanitization, case-insensitive index lookups, and corruption recovery.
2. **Serverless Visitor Tracking Route**:
   - The client `VisitorTracker` component records engagement duration using the browser Page Visibility API (`document.visibilityState`).
   - Engagement deltas are transmitted asynchronously via `navigator.sendBeacon` (during tab closure or navigation) or standard `fetch` with `keepalive: true` to avoid blocking UI operations.
   - The route handler (`src/app/api/track/route.ts`) runs on the Next.js `nodejs` runtime (`runtime = "nodejs"` and `dynamic = "force-dynamic"`).
   - It extracts the client IP address (supporting Cloudflare `cf-connecting-ip`, `x-real-ip`, and `x-forwarded-for` proxy headers), determines device metadata (`Desktop`, `Mobile`, `Tablet`, OS version) via `userAgent(request)`, and reads edge geolocation headers (`x-vercel-ip-country`, `x-vercel-ip-city`).
3. **Firestore Atomic Aggregation**:
   - Telemetry data is recorded in the `visitors` collection under a deterministic daily document ID: `${YYYY-MM-DD}_${sanitizedIp}` (calculated using the `Asia/Dhaka` timezone).
   - A Firestore atomic transaction (`db.runTransaction`) checks if the visitor document exists for the day:
     - **New Daily Visitor**: Creates a new document with IP address, date, device type, OS, location, timestamps, and initial seconds.
     - **Existing Visitor**: Atomically increments `totalTimeSpent` using `FieldValue.increment(safeSeconds)` and updates `updatedAt` with `FieldValue.serverTimestamp()`.

---

## Getting Started

### Prerequisites

Ensure the following tools are installed on your local development machine:

- **Node.js**: `v18.18.0` or higher (Node.js `v20.x` or `v22.x` LTS recommended)
- **npm**: `v9.x` or higher (distributed with Node.js)
- **Git**: For source version control
- **Firebase Project**: A Google Firebase project with Cloud Firestore created in production or test mode

---

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/SIMANTO-PODDAR/Medi-Split.git
   cd medi-split
   ```

2. **Install project dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the project root by copying the provided example template:
   ```bash
   cp .example.env .env.local
   ```
   Open `.env.local` and populate the variables with your Firebase project credentials (see [Environment Variables](#environment-variables)).

---

## Environment Variables

The project separates configuration into public client-side credentials and privileged server-only secrets.

### Variable Reference

| Variable                                   | Scope            | Required | Description                                                           |
| ------------------------------------------ | ---------------- | -------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_FIREBASE_API_KEY`             | Client (Browser) | Yes      | Web API key for the Firebase project                                  |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`         | Client (Browser) | Yes      | Firebase Auth domain (e.g., `project-id.firebaseapp.com`)             |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID`          | Client (Browser) | Yes      | Target Firebase project ID                                            |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`      | Client (Browser) | Yes      | Cloud Storage bucket URL (e.g., `project-id.appspot.com`)             |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Client (Browser) | Yes      | Numeric sender ID for Firebase messaging services                     |
| `NEXT_PUBLIC_FIREBASE_APP_ID`              | Client (Browser) | Yes      | Unique web application identifier assigned by Firebase                |
| `FIREBASE_PROJECT_ID`                      | Server Only      | Yes      | Google Cloud / Firebase project identifier for Firebase Admin         |
| `FIREBASE_CLIENT_EMAIL`                    | Server Only      | Yes      | Service Account email address with Firestore Admin privileges         |
| `FIREBASE_PRIVATE_KEY`                     | Server Only      | Yes      | Private RSA key for the service account (PEM format, containing `\n`) |

> [!WARNING] > **Server Credential Protection**: The variables `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` grant administrative access to your Cloud Firestore database. They must **never** be prefixed with `NEXT_PUBLIC_`, must never be imported in client components, and must never be committed to public version control.

### Configuration Template

Below is a safe template suitable for your `.env.local` file:

```env
# ========================================================
# Firebase Client SDK Configuration (Exposed to Browser)
# ========================================================
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id

# ========================================================
# Firebase Admin SDK Configuration (Server-Only Secrets)
# ========================================================
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nreplace-with-your-private-key\n-----END PRIVATE KEY-----\n"
```

---

## Firebase Configuration & Services

Firebase is integrated into Medi-Split for two specific functions:

1. **Client Firebase App (`src/lib/firebase.ts`)**:
   - Initializes the client Firebase app instance via `initializeApp` using the public `NEXT_PUBLIC_FIREBASE_*` configuration variables.
2. **Server Firebase Admin SDK (`src/lib/firebase-admin.ts`)**:
   - Initialized using service account credentials (`cert({...})`).
   - Features runtime environment enforcement: throws an explicit error if evaluated in a browser runtime (`typeof window !== "undefined"`).
   - Includes private key formatting logic (`formatPrivateKey`) that strips surrounding quotes and properly interprets escaped newline characters (`\n` to actual newlines), ensuring compatibility with Vercel and Docker environment stores.
   - Exposes `getAdminDb()` which returns a singleton `Firestore` database instance.
3. **Firestore Collection Structure**:
   - Collection name: `visitors`
   - Document ID convention: `${date}_${sanitizedIp}` (e.g., `2026-10-15_103_25_12_4`)
   - Tracked Fields:
     - `ipAddress` (`string`): Visitor IP address.
     - `date` (`string`): Date string in `YYYY-MM-DD` format (Dhaka timezone).
     - `totalTimeSpent` (`number`): Cumulative seconds spent on the website for the day.
     - `deviceType` (`"Desktop"` | `"Mobile"` | `"Tablet"`): Detected form factor.
     - `deviceModel` (`string` | `null`): Device hardware model when exposed by User-Agent.
     - `operatingSystem` (`string` | `null`): Operating system name and major version.
     - `country` (`string` | `null`): ISO country code detected via edge headers (`x-vercel-ip-country`, `cf-ipcountry`).
     - `region` (`string` | `null`): State/region code from edge headers.
     - `city` (`string` | `null`): URL-decoded city name from edge headers.
     - `createdAt` (`Timestamp`): Initial record creation server timestamp.
     - `updatedAt` (`Timestamp`): Most recent heartbeat update server timestamp.

---

## Available Scripts

The project defines standard lifecycle scripts in `package.json`:

```bash
# Start the local development server (with HMR)
npm run dev

# Build the application for production
npm run build

# Start the built production server locally
npm run start

# Run ESLint to verify code quality and coding conventions
npm run lint
```

- `npm run dev`: Starts the Next.js development server at `http://localhost:3000`. Fast refresh is enabled by default.
- `npm run build`: Executes the Next.js production compiler, evaluates TypeScript types, executes the React Compiler, and generates optimized client and server bundles.
- `npm run start`: Boots the Next.js production server using output generated by `npm run build`.
- `npm run lint`: Analyzes all source files using ESLint with Next.js Core Web Vitals and TypeScript configurations.

---

## Project Structure

```
medi-split/
├── .example.env                       # Example environment variables template
├── eslint.config.mjs                  # ESLint flat configuration (core-web-vitals & ts)
├── next.config.ts                     # Next.js configuration (React Compiler, dev origins)
├── package.json                       # Dependencies, project metadata, and npm scripts
├── postcss.config.mjs                 # PostCSS setup for Tailwind CSS v4
├── public/                            # Static media and branding assets
│   ├── MediSplit-logo.jpg             # Header brand logo
│   └── MediSplit-logo-footer.jpg      # Footer brand logo
├── src/
│   ├── app/
│   │   ├── (pages)/                   # Sub-routes with dedicated layout and pages
│   │   │   ├── all-medicines/         # Saved medicines catalog management
│   │   │   │   ├── layout.tsx         # Page layout metadata
│   │   │   │   └── page.tsx           # Inline edit, delete, and clear catalog view
│   │   │   ├── how-to-use/            # Application usage guide
│   │   │   │   ├── layout.tsx         # Page layout metadata
│   │   │   │   └── page.tsx           # Step-by-step instruction guide
│   │   │   └── terms-and-conditions/  # Service terms and disclosures
│   │   │       ├── layout.tsx         # Page layout metadata
│   │   │       └── page.tsx           # Terms, disclaimers, and tracking policy
│   │   ├── api/
│   │   │   └── track/                 # Serverless telemetry route handler
│   │   │       └── route.ts           # POST handler with Firestore transaction
│   │   ├── error.tsx                  # Global client error boundary component
│   │   ├── globals.css                # Tailwind CSS v4 directives and custom styles
│   │   ├── layout.tsx                 # Root layout with fonts, tracker, and translator
│   │   ├── not-found.tsx              # Custom 404 Not Found presentation
│   │   └── page.tsx                   # Main entry point hosting the Calculator
│   ├── components/
│   │   ├── GoogleTranslate/           # Google Translate integration
│   │   │   └── GoogleTranslate.tsx    # Script loader and Translate widget mount
│   │   ├── VisitorTracker/            # Background analytics telemetry
│   │   │   └── VisitorTracker.tsx     # Page visibility heartbeat & beacon emitter
│   │   └── calculator/                # Main medicine calculator UI components
│   │       ├── CalculationSummary.tsx # Gross price, discount, and net payable summary
│   │       ├── Calculator.tsx         # Calculator state container and coordinator
│   │       ├── DiscountSection.tsx    # Percentage discount input component
│   │       ├── EmptyState.tsx         # Placeholder illustration for empty lists
│   │       ├── PreviewModal.tsx       # Invoice statement preview modal component
│   │       ├── ProductForm.tsx        # Medicine input form with autocomplete
│   │       └── ProductList.tsx        # Responsive desktop table and mobile cards
│   ├── lib/
│   │   ├── calculations.ts            # Currency rounding and discount math utilities
│   │   ├── firebase-admin.ts          # Server-only Firebase Admin initialization
│   │   ├── firebase.ts                # Client Firebase initialization
│   │   ├── format.ts                  # Currency (৳) and timestamp formatters
│   │   ├── pdf.ts                     # jsPDF & AutoTable document generator
│   │   ├── storage.ts                 # LocalStorage persistence and query utilities
│   │   └── types.ts                   # TypeScript interfaces (Product, SavedProduct)
│   └── sections/
│       ├── Footer/                    # Application footer with author credits
│       │   └── Footer.tsx
│       └── Header/                    # Header bar with branding & slide-out navigation
│           └── Header.tsx
└── tsconfig.json                      # TypeScript configuration with path aliases (@/*)
```

---

## Security and Privacy

Medi-Split implements deliberate architectural boundaries to preserve user privacy and maintain system integrity:

- **Local-Only Medicine Data**: Medicine names, prices, quantities, and discount rates never leave the user's browser. They are not transmitted over the network, logged on the server, or stored in Firebase.
- **Strict Server Credential Isolation**: The Firebase Admin SDK is restricted to server runtimes. Calling it from client-side code triggers an immediate exception (`Firebase Admin SDK cannot be executed on the client`).
- **Telemetry Input Sanitization**:
  - `timeSpent` values received by `/api/track` are clamped between 0 and 3,600 seconds per ping to reject malformed or inflated inputs.
  - Client IP addresses are scrubbed of illegal characters via regex sanitization before being used as Firestore document identifiers.
- **Non-Blocking Telemetry Fail-Safes**: All client tracking network calls execute via `navigator.sendBeacon` or background `fetch` with `keepalive: true` inside a silent `catch` block, ensuring analytics failures never impact calculator functionality or user interactions.
- **Defensive Storage Parsing**: `src/lib/storage.ts` verifies all incoming JSON retrieved from `localStorage`. If corrupted or invalid JSON is detected, the key is safely purged to prevent application crashes.
- **Edge Header Resolution**: IP address and geolocation discovery gracefully parses multi-tier proxy headers (`cf-connecting-ip`, `x-real-ip`, `x-forwarded-for`) with safe fallbacks.

---

## Deployment

The application is built on the Next.js App Router and can be deployed to any hosting environment supporting modern Node.js runtimes.

### Deploying to Vercel (Recommended)

1. Import your Medi-Split repository into [Vercel](https://vercel.com).
2. Ensure the Framework Preset is set to **Next.js**.
3. In the project settings, navigate to **Environment Variables** and add all variables listed in the [Environment Variables](#environment-variables) section.
   - Enter your `FIREBASE_PRIVATE_KEY` with actual newline formatting or literal `\n` characters (both formats are supported by `src/lib/firebase-admin.ts`).
4. Trigger the deployment. Vercel automatically supplies edge geolocation headers (`x-vercel-ip-country`, `x-vercel-ip-city`), allowing the visitor tracking pipeline to record location analytics without third-party IP lookup services.

### Deploying to a Node.js Server or Docker

1. Ensure the target environment has **Node.js 18+** installed.
2. Provide the production environment variables via `.env.production` or system environment variables.
3. Build and launch the application:
   ```bash
   npm run build
   npm run start
   ```
4. For reverse proxies (such as Nginx or Cloudflare), ensure standard proxy headers (`X-Forwarded-For`, `X-Real-IP`, or `CF-Connecting-IP`) are forwarded to the application server.

---

## License and Credits

- **Developer**: [Simanto Poddar](https://simanto-poddar-portfolio.vercel.app)
- **Repository Status**: This project is private / proprietary. All rights are reserved by the author. No open-source license is granted unless explicitly stated in writing.
