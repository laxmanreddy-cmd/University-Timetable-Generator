# AI Smart Timetable Generator

A complete frontend-only university SaaS demo built with Next.js 15, React 19, TypeScript, Tailwind CSS, ShadCN-style UI primitives, Framer Motion, Recharts, and Lucide icons.

## Features

- Student registration form with exactly four elective selections
- Cluster A and Cluster B faculty choices for every subject
- Local CSP-inspired timetable generation engine
- Conflict checks for subject, faculty, classroom, duplicate periods, daily free slots, continuous classes, workload balance, and quality scoring
- Explainable AI panel with heuristic decisions and conflict analysis
- Responsive timetable grid with color-coded subjects
- Analytics dashboard with Recharts visualizations
- CO1 through CO6 interactive AI concept showcases
- Dark and light mode toggle
- Course search, faculty search, filter/share/PDF mock/print/favorite UI
- No backend, APIs, authentication, or database

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```text
app/                 Next.js App Router pages
components/          Product views and ShadCN-style UI primitives
hooks/               Reusable local state hook
lib/                 Mock data, types, utilities, and timetable engine
```

## Scheduling Engine

The generator in `lib/timetable-engine.ts` simulates AI scheduling with:

- CSP variables and domains
- Backtracking-style retry loops
- MRV and LCV-inspired decision ordering
- Min-conflicts repair notes
- Heuristic slot scoring
- Explainable constraint checks

All data is mock JSON-style TypeScript data and all state is local to the frontend.
