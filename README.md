# Ramadan Tracker 🌙

[![CI](https://github.com/Abdelkaderbzz/ramadan-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/Abdelkaderbzz/ramadan-tracker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Abdelkaderbzz/ramadan-tracker/pulls)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-orange.svg)](https://buymeacoffee.com/jhe1ep04xt)

A progressive web app that helps Muslims stay on track during Ramadan — monitor your prayers, duas, Quran recitation, and daily worship with insightful progress tracking throughout the blessed month.

## ✨ Features

### 🕌 Prayer Times

- Live prayer times fetched from the [Aladhan API](https://aladhan.com/prayer-times-api) using the **MWL (Muslim World League)** calculation method
- Auto-detects user location via Geolocation API (falls back to Mecca)
- Highlights the next upcoming prayer

### 📖 Quran Tracker

- Track surahs and juz' you have read
- Visual progress bar for your Quran completion journey

### 🤲 Dua & Dhikr

- Log morning and evening adhkar completion
- Browse a curated dua collection
- Save and manage your personal duas

### 📊 Dashboard & Progress

- Daily tracking table for fasting, prayers, Quran, charity, and more
- Worship statistics with visual charts
- Daily motivation quotes to keep you inspired

### 📅 Islamic Calendar

- Integrated Hijri calendar with RTL support
- Ramadan day counter

### 🏆 Achievements

- Earn badges for consistent worship and milestones

### 📝 Ramadan Journey

- Set and track personal Ramadan goals
- Daily journal for reflections and memories

### 🌍 Multilingual

- Full support for **Arabic** (RTL), **English**, and **French**
- Language switcher built into the UI

### 📱 PWA Support

- Installable on mobile and desktop as a Progressive Web App
- Offline-capable with service worker caching

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.0+ runtime installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Abdelkaderbzz/ramadan-tracker.git
   ```

2. Navigate to the project folder:

   ```bash
   cd ramadan-tracker
   ```

3. Install dependencies:

   ```bash
   bun install
   ```

4. Start the development server:

   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Tech Stack

| Category          | Technology                                                                  |
| ----------------- | --------------------------------------------------------------------------- |
| **Framework**     | [Next.js 14](https://nextjs.org/) (App Router)                              |
| **Runtime**       | [Bun](https://bun.sh/)                                                      |
| **Language**      | [TypeScript](https://www.typescriptlang.org/)                               |
| **Styling**       | [Tailwind CSS](https://tailwindcss.com/)                                    |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **State**         | [Zustand](https://zustand-demo.pmnd.rs/)                                    |
| **Animations**    | [Framer Motion](https://www.framer.com/motion/)                             |
| **i18n**          | [next-intl](https://next-intl-docs.vercel.app/)                             |
| **Forms**         | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)   |
| **Charts**        | [Recharts](https://recharts.org/)                                           |
| **Theming**       | [next-themes](https://github.com/pacocoursey/next-themes)                   |
| **PWA**           | [@ducanh2912/next-pwa](https://github.com/nicedayyy/next-pwa)               |
| **Prayer Times**  | [Aladhan API](https://aladhan.com/prayer-times-api) (MWL method)            |

## 📁 Project Structure

```
ramadan-tracker/
├── app/
│   └── [locale]/            # Locale-based routing (en, fr, ar)
│       ├── layout.tsx
│       └── page.tsx
├── components/
│   ├── features/
│   │   ├── achievements/    # Badge system
│   │   ├── calendar/        # Islamic/Hijri calendar
│   │   ├── dashboard/       # Stats, daily tracking table
│   │   ├── journey/         # Goals, journal, motivation
│   │   ├── prayer/          # Prayer times, duas, dhikr
│   │   └── quran/           # Quran surah/juz tracker
│   ├── layout/              # Header, main layout
│   └── ui/                  # shadcn/ui primitives
├── hooks/                   # Custom React hooks
├── i18n/                    # next-intl configuration
├── lib/
│   ├── constants/           # Duas, motivations
│   ├── store/               # Zustand store & types
│   ├── date-utils.ts        # Hijri date helpers
│   └── quran-data.ts        # Surah & Juz metadata
├── messages/                # Translation files (en, fr, ar)
├── public/                  # Static assets, PWA manifest
└── styles/                  # Global CSS
```

## 📝 Scripts

| Command              | Description                  |
| -------------------- | ---------------------------- |
| `bun run dev`        | Start the development server |
| `bun run build`      | Build for production         |
| `bun run start`      | Start the production server  |
| `bun run lint`       | Run ESLint                   |
| `bun run type-check` | Run TypeScript type checking |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on the development workflow and how to submit pull requests.

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## 👤 Author

**abdelkaderbzz**

- GitHub: [@Abdelkaderbzz](https://github.com/Abdelkaderbzz)

## ☕ Support

If you find this project useful and want to support its development, you can buy me a coffee!

<a href="https://buymeacoffee.com/jhe1ep04xt" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>

## ⭐ Show Your Support

Give a ⭐ if this project helped you during Ramadan!
