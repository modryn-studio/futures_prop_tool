# Copilot Instructions for Futures Prop Firm Quiz

## Project Identity

**Name:** Futures Prop Firm Quiz  
**Domain:** futuresproptool.com  
**Type:** Affiliate lead-gen funnel for futures prop trading firms  
**Stack:** Next.js 14 (App Router) + Tailwind CSS + Vercel + Mailerlite

---

## User Profile

The developer (Luke) operates at 5-10x typical speed:
- **No pacing** — Don't suggest breaks, don't pad timelines
- **Assume competence** — Skip beginner explanations
- **Bias to action** — Ship fast, iterate based on data
- **No fluff** — Direct answers, no motivational content

---

## Core Architecture

### Day 1 MVP Structure
```
/app
  /page.tsx              → Landing page with quiz CTA
  /quiz
    /page.tsx            → 11-question quiz flow
  /results
    /page.tsx            → Personalized results (requires email)
  /api
    /submit-quiz         → Send to Mailerlite
/lib
  /scoring.ts            → Port of scoring.js
  /firms.ts              → Firm data from propFirmData.ts
  /mailerlite.ts         → Mailerlite API integration
/components
  /Quiz.tsx              → Quiz state machine
  /QuizQuestion.tsx      → Individual question component
  /Results.tsx           → Results display
  /FirmCard.tsx          → Firm recommendation card
```

### Key Files Reference
- `scoring.js` — Complete quiz scoring logic (port to TypeScript)
- `futures_prop_firms.json` — Full firm data (13 firms)
- `propFirmData.ts` — TypeScript firm data export
- `futures_prop_firm_funnel.md` — All copy (landing, quiz, emails)
- `roadmap.md` — Project phases and success criteria
- `buildlog.md` — Session notes and changelog

---

## Coding Conventions

### TypeScript
- Strict mode enabled
- Prefer `interface` over `type` for objects
- Use `const` assertions for firm data
- Avoid `any` — type everything

### React/Next.js
- Use App Router (not Pages)
- Server Components by default
- Client Components only when needed (quiz state, interactivity)
- Use `'use client'` directive explicitly

### Styling
- Tailwind CSS only — no custom CSS files
- Mobile-first responsive design
- Use Tailwind's color system consistently
- Component composition over utility sprawl

### State Management
- React useState for quiz flow
- URL params for shareable results (optional)
- No Redux/Zustand — keep it simple

---

## Quiz Logic Rules

### 11 Questions
1. `q1_experience` — Experience level (4 options)
2. `q2_situation` — Previous prop firm attempts (4 options)
3. `q3_budget` — Monthly budget (4 options)
4. `q3a_payment_preference` — Monthly vs one-time (3 options)
5. `q4_account_size` — Target account size (4 options)
6. `q5_timeframe` — Trading style/duration (4 options)
7. `q6_concern` — Biggest rule concern (6 options)
8. `q7_risk` — Risk tolerance (4 options)
9. `q8_payout_priority` — Payout speed importance (4 options)
10. `q9_support` — Education/support preference (4 options)
11. `q10_dealbreakers` — Multi-select dealbreakers (7 options)

### Scoring Approach
- Each answer adds/subtracts points to relevant firms
- Dealbreakers (Q10) eliminate firms entirely
- Top 3 non-eliminated firms become recommendations
- Tiebreaker: Trustpilot rating

### Critical Scoring Rules
- Q5 "swing_trading" → Boost Elite +5, deprioritize others -2 (DON'T eliminate)
- Q10 dealbreakers → Hard elimination with reason
- Q3a "one_time" → Boost Bulenox/Goat +5

---

## Data Patterns

### Firm Data Shape
```typescript
interface Firm {
  name: string;
  score: number;
  eliminated: boolean;
  eliminationReason: string;
  promoCode: string;
  promoDiscount: string;
  monthlyFee: string;
  profitSplit: string;
  trustpilot: number;
  keyStrength: string;
  affiliateLink: string;
}
```

### Quiz Answer Shape
```typescript
interface QuizAnswers {
  q1_experience: 'less_than_6mo' | '6_to_12mo' | '1_to_3yr' | '3yr_plus';
  q2_situation: 'first_time' | 'attempted_not_passed' | 'passed_didnt_work' | 'currently_funded';
  q3_budget: 'under_100' | '100_to_200' | '200_to_400' | '400_plus';
  q3a_payment_preference: 'monthly' | 'one_time' | 'no_preference';
  q4_account_size: '25k_to_50k' | '50k_to_100k' | '100k_to_150k' | '150k_plus';
  q5_timeframe: 'scalping' | 'day_trading' | 'swing_trading' | 'mixed';
  q6_concern: 'drawdown_limits' | 'consistency_rules' | 'overnight_restrictions' | 'time_pressure' | 'payout_restrictions' | 'not_sure';
  q7_risk: 'conservative' | 'moderate' | 'aggressive' | 'depends';
  q8_payout_priority: 'critical' | 'important' | 'flexible' | 'other_factors';
  q9_support: 'none' | 'minimal' | 'moderate' | 'significant';
  q10_dealbreakers: string[]; // Multi-select
}
```

---

## API Integrations

### Mailerlite
- Forever-free tier: 1,000 subscribers
- Automation builder (available on free plan after trial)
- Custom fields: top_firm, experience_level, budget, trading_style, submission_type, UTM params
- Add subscribers to group for automation triggers
- Bearer token auth with JWT API key

### Vercel Analytics
- Track funnel: Landing → Quiz Start → Email Capture → Results → Affiliate Click
- Use `@vercel/analytics` package

---

## Environment Variables

```env
# Mailerlite
MAILERLITE_API_KEY=
MAILERLITE_GROUP_ID=

# Affiliate IDs (add as approved)
NEXT_PUBLIC_APEX_AFFILIATE_ID=PENDING
NEXT_PUBLIC_TOPSTEP_AFFILIATE_ID=PENDING
NEXT_PUBLIC_MFFU_AFFILIATE_ID=PENDING
# ... etc for all 13 firms

# Analytics
NEXT_PUBLIC_GA_ID=
```

---

## Common Tasks

### "Build the quiz component"
→ Use `futures_prop_firm_funnel.md` PART 2 for question copy
→ Reference `scoring.js` for answer value keys
→ 11 questions total (Q1-Q10, plus Q3a)
→ Email capture BEFORE showing results

### "Add a new firm"
→ Add to `futures_prop_firms.json`
→ Add to `propFirmData.ts`
→ Add to `createFirmData()` in scoring.js
→ Add scoring logic for all 11 questions
→ Add affiliate ID env var

### "Update promo codes"
→ Currently in `scoring.js` `createFirmData()`
→ Promo codes change weekly — consider database if this becomes a pain point

### "Fix scoring issue"
→ Check `scoring.js` for the specific question handler
→ Points are additive — check for unintended stacking
→ Dealbreakers ONLY happen in Q10 section
→ Test with example answers in the usage example at bottom

---

## Testing Priorities

### Must Test Before Launch
1. Full quiz flow (all 11 questions)
2. Email capture → Mailerlite subscriber created & added to group
3. Results page shows correct top 3
4. Affiliate links have correct UTM params
5. Mobile responsive on real device
6. Edge case: All firms eliminated by dealbreakers

### Test Scenarios
- Beginner with low budget → Expect: Topstep, BluSky
- Swing trader → Expect: Elite #1, others deprioritized
- Hates monthly fees → Expect: Bulenox, Goat only
- Wants fast payouts → Expect: MFFU, BluSky, TPT

---

## Don't Do

- ❌ Don't build 12 firm pages before validating quiz
- ❌ Don't add Redux/complex state management
- ❌ Don't use Pages Router (App Router only)
- ❌ Don't over-engineer affiliate tracking Day 1
- ❌ Don't suggest breaks or timeline padding
- ❌ Don't create documentation files unless asked
