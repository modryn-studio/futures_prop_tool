# Build Log

**Project:** Futures Prop Firm Quiz (futuresproptool.com)  
**Started:** December 29, 2025

---

## December 29, 2025 — Day 0: Planning & Foundation

### Completed
- [x] Purchased domain: futuresproptool.com (via Vercel)
- [x] Signed up for Kit (ConvertKit) - free tier
- [x] Created comprehensive funnel document (`futures_prop_firm_funnel.md`)
- [x] Built scoring algorithm (`scoring.js`) - 11 questions, 12 firms
- [x] Defined tech stack: Next.js + Tailwind + Vercel + Kit + Supabase
- [x] Created landing page headline options
- [x] Created roadmap and build log

### Key Decisions Made
1. **Funnel-first approach** — Quiz before content pages
2. **11 questions** — Split Q3 into budget + payment preference
3. **Email gate before results** — Not after
4. **Scoring logic** — Dealbreakers eliminate, other factors add/subtract points
5. **Q5 swing trading** — Deprioritize, don't auto-eliminate (let Q10 handle)
6. **Affiliate links** — Environment variables, placeholder until approved
7. **Promo codes** — Hardcoded Day 1, move to database Week 2

### Files Created
- `futures_prop_firm_funnel.md` — Complete copy package
- `scoring.js` — Quiz scoring algorithm
- `landing_page_headline_options.md` — 4 headline variants
- `roadmap.md` — Project roadmap
- `buildlog.md` — This file
- `.github/copilot-instructions.md` — AI coding guidelines

### Data Files (Pre-existing)
- `futures_prop_firms.json` — 12 firms with full data
- `propFirmData.ts` — TypeScript export of firm data
- `futures_prop_firm_database.xlsx` — Source spreadsheet

### Architecture Files (Pre-existing, will update)
- `site_architecture.md` — Full site structure (future state)
- `page_templates.md` — Templates for firm/VS pages (future)
- `build_plan.md` — Day-by-day plan
- `tech_stack.md` — Technology choices
- `launch_checklist.md` — Pre-launch checklist
- `revenue_timeline.md` — Revenue projections

---

## Session Notes

### What We Discussed
1. Original plan was content-heavy (12 firm pages in 7 days)
2. Pivoted to funnel-first: Quiz → Email → Results → Affiliate click
3. Validated funnel before building content
4. Identified critical fixes in scoring.js (swing trading, affiliate links, promo codes)
5. Split budget question for better matching to one-time fee firms

### Outstanding TODOs
- [ ] Apply to affiliate programs (Apex, Topstep, MFFU priority)
- [ ] Write 5-email Kit sequence
- [ ] Set up Supabase project
- [ ] Configure Vercel Analytics

---

## Template for Future Entries

```markdown
## [Date] — Day [N]: [Focus Area]

### Completed
- [x] Task 1
- [x] Task 2

### Blockers/Issues
- Issue 1: [description] → Resolution: [how fixed]

### Metrics (if applicable)
- Quiz completions: X
- Email captures: X
- Affiliate clicks: X

### Next Session
- [ ] Priority task 1
- [ ] Priority task 2
```

---

## Changelog

| Date | Change | Files Affected |
|------|--------|----------------|
| 2025-12-29 | Initial planning complete | All planning docs |
| 2025-12-29 | Added Q3a payment preference | scoring.js, funnel.md |
| 2025-12-29 | Fixed Q5 swing trading logic | scoring.js |
| 2025-12-29 | Added affiliate ID env vars | scoring.js |
| 2025-12-29 | Fixed maxPossibleScore 30→40 | scoring.js |
