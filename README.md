# Futures Prop Firm Quiz

**Live:** [futuresproptool.com](https://futuresproptool.com)  
**Type:** Affiliate lead-gen funnel  
**Stack:** Next.js 14 + Tailwind CSS + Vercel + Mailerlite

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your Mailerlite API key and group ID

# Run dev server
npm run dev
```

Visit http://localhost:3000

## Project Structure

```
/src
  /app              → Next.js App Router pages
  /components       → React components
  /lib              → Utilities, scoring, integrations
/docs               → Planning & documentation
/data               → Source data (firms, spreadsheets)
```

## Key Files

- [src/lib/scoring.ts](src/lib/scoring.ts) — Quiz scoring logic (730 lines)
- [src/lib/quiz-data.ts](src/lib/quiz-data.ts) — 11 quiz questions
- [src/components/Quiz.tsx](src/components/Quiz.tsx) — Quiz state machine
- [src/components/Results.tsx](src/components/Results.tsx) — Results display
- [docs/futures_prop_firm_funnel.md](docs/futures_prop_firm_funnel.md) — Complete copy
- [docs/buildlog.md](docs/buildlog.md) — Development log

## Documentation

- [Build Log](docs/buildlog.md) — Development history
- [Roadmap](docs/roadmap.md) — Project phases
- [Funnel Copy](docs/futures_prop_firm_funnel.md) — All copy (landing, quiz, emails)
- [Tech Stack](docs/tech_stack.md) — Technology choices
- [UI Design System](docs/ui_design_system.md) — Design system docs

## Environment Variables

See [.env.example](.env.example) for all required variables.

Critical variables:
- `MAILERLITE_API_KEY` — Mailerlite API key
- `MAILERLITE_GROUP_ID` — Mailerlite group ID for quiz subscribers
- Affiliate IDs for all 12 firms (add as approved)

## Deployment

Deployed automatically to Vercel on push to `main` branch.

## License

Proprietary
