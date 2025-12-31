# Futures Prop Tool - Launch Checklist

**Project:** futuresproptool.com  
**Status:** Pre-Launch  
**Updated:** December 30, 2025

---

## Phase 1: Environment Setup

- [x] Copy `.env.example` to `.env.local`
- [x] Add Kit API credentials to `.env.local`:
  - `NEXT_PUBLIC_KIT_FORM_ID=8921202`
  - `KIT_API_SECRET=t0yinn-5NXEbAkfvw2iJYGJ8-HuRse2tp6GnS579GzI`
- [x] Leave affiliate IDs as blank for now (will fill as approved)

---

## Phase 2: Mailerlite Setup

- [x] Create free Mailerlite account at mailerlite.com
- [x] Get API key from Mailerlite Settings → Integrations → API
- [x] Copy API key to `.env.local` as `MAILERLITE_API_KEY`
- [x] Create a group in Mailerlite, copy Group ID to `.env.local` as `MAILERLITE_GROUP_ID`
- [ ] Create 11 custom fields in Mailerlite:
  - `first_name`
  - `your_name` (set default to your name, e.g., "Luke")
  - `top_firm`
  - `promo_code`
  - `discount`
  - `experience_level`
  - `budget`
  - `trading_style`
  - `submission_type`
  - `utm_source`
  - `utm_medium`
  - `utm_campaign`
- [ ] Create automation in Mailerlite with trigger "Subscriber joins group"
- [ ] Create 5-email sequence (copy from `docs/futures_prop_firm_funnel.md` PART 4)
  - Email 1: Day 0 - "Your results (save this)"
  - Email 2: Day 2 - "Before you start your {$top_firm} challenge"
  - Email 3: Day 4 - "Save this: Your Week 1 game plan"
  - Email 4: Day 6 - "What to do AFTER you pass"
  - Email 5: Day 8 - "Quick question"
- [ ] Set delays: 0 days, +2 days, +2 days, +2 days, +2 days
- [ ] Use Mailerlite merge tags: {$first_name}, {$top_firm}, {$promo_code}, {$discount}, {$your_name}
- [ ] Add 13 firm homepage/rules page links to emails (manual per firm)
- [ ] Test sequence by subscribing with your own email

---

## Phase 3: Research Current Promo Codes

Visit each firm's website and find current promo codes:

- [ ] **Apex Trader Funding** - Update `src/lib/scoring.ts` line 90
- [ ] **Topstep** - Update line 103
- [ ] **MyFundedFutures** - Update line 117
- [ ] **Tradeday** - Update line 131
- [ ] **BluSky** - Update line 144
- [ ] **Take Profit Trader** - Update line 158
- [ ] **Earn2Trade** - Update line 173
- [ ] **Elite Trader Funding** - Update line 188
- [ ] **Bulenox** - Update line 203
- [ ] **Alpha Capital Group** - Update line 217
- [ ] **Tradeify** - Update line 232
- [ ] **Goat Funded Trader** - Update line 246
- [ ] **Lucid Trading** - Update line 261

**Format in scoring.ts:**
```typescript
promoCode: 'ACTUAL_CODE',
promoDiscount: '80% off first month',
```

---

## Phase 4: Affiliate Applications (Priority Order)

Apply to these firms' affiliate programs (highest volume first):

### Priority 1 (Apply Day 1)
- [ ] **Apex Trader Funding** - apextrading.com/affiliates
- [ ] **Topstep** - topstep.com/partners
- [ ] **MyFundedFutures** - myfundedfutures.com/affiliate

### Priority 2 (Week 1)
- [ ] **Take Profit Trader**
- [ ] **Elite Trader Funding**
- [ ] **Earn2Trade**
- [ ] **BluSky**
- [ ] **Tradeday**

### Priority 3 (Week 2)
- [ ] **Bulenox**
- [ ] **Alpha Capital Group**
- [ ] **Tradeify**
- [ ] **Goat Funded Trader**
- [ ] **Lucid Trading**

**When approved:**
1. Copy your affiliate ID (e.g., "luke123")
2. Add to `.env.local`: `NEXT_PUBLIC_APEX_AFFILIATE_ID=luke123`
3. Update promo code in `src/lib/scoring.ts` if yours differs
4. Redeploy to Vercel

---

## Phase 5: Collect Firm Links for Kit Emails

For each of the 13 firms, collect these URLs:

### Apex Trader Funding
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Topstep
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### MyFundedFutures
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Tradeday
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### BluSky
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Take Profit Trader
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Earn2Trade
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Elite Trader Funding
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Bulenox
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Alpha Capital Group
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Tradeify
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Goat Funded Trader
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

### Lucid Trading
- [ ] Evaluation rules page: _________________________
- [ ] Funded account rules page: _________________________

**Use these links in Kit emails:**
- Email #2: `[See {{ top_firm }} evaluation details]` → firm's evaluation rules URL
- Email #4: `[See {{ top_firm }} funded account details]` → firm's funded account URL

---

## Phase 6: Deploy to Vercel

- [ ] Push latest code to GitHub (if not already)
- [ ] Connect GitHub repo to Vercel (vercel.com)
- [x] Add environment variables in Vercel dashboard:
  - `NEXT_PUBLIC_KIT_FORM_ID=8921202`
  - `KIT_API_SECRET=t0yinn-5NXEbAkfvw2iJYGJ8-HuRse2tp6GnS579GzI`
  - All affiliate IDs (add as you get approved)
- [ ] Deploy to production
- [ ] Verify domain: futuresproptool.com

---

## Phase 7: Test Full Flow (Production)

- [ ] Visit futuresproptool.com
- [ ] Click "See Which Firm Fits You"
- [ ] Complete full quiz (all 11 questions)
- [ ] View results page (should show top 3 matches)
- [ ] Submit email in optional capture form
- [ ] Check Kit dashboard - subscriber added?
- [ ] Check email - received Email #1?
- [ ] Click affiliate link - does it have your ID?
- [ ] Test on mobile device

---

## Phase 8: First Users

- [ ] Post in r/FuturesTrading with genuine value
- [ ] Post in r/Daytrading
- [ ] Share on Twitter/X with insight
- [ ] Join 3 trading Discord servers, share organically
- [ ] Target: 10 quiz completions Day 1

---

## Weekly Maintenance

### Every Monday
- [ ] Check all 13 firms for new promo codes
- [ ] Update `src/lib/scoring.ts` if changed
- [ ] Redeploy to Vercel if updated
- [ ] Update Kit email sequence if needed

### Every Week
- [ ] Review Kit analytics (open rates, click rates)
- [ ] Check affiliate dashboards for conversions
- [ ] Reply to any email responses
- [ ] Drive 20-50 new quiz takers

---

## Future Improvements (Month 2+)

- [ ] Build individual firm pages (13 pages)
- [ ] Update Kit emails to link to YOUR firm pages
- [ ] Add comparison tool (Firm A vs Firm B)
- [ ] Add drawdown calculator
- [ ] Consider moving promo codes to database
- [ ] Add exit-intent popup (if email rates are low)

---

## Notes

**Critical Path (Day 1):**
1. Environment setup → Kit setup → Test locally → Deploy
2. Everything else can happen Week 1

**Don't Block On:**
- Perfect promo codes (use placeholders, update later)
- All 13 affiliate approvals (launch with 3-5, add rest over time)
- Firm pages (link to their sites Day 1)

**First Revenue Timeline:**
- Day 1-3: Apply to affiliates
- Week 1: First approval + affiliate link live
- Week 2-4: First user clicks affiliate link
- Week 4-8: First user passes eval + gets funded
- Week 8-12: First commission paid

---

## Blockers / Issues

| Issue | Status | Resolution |
|-------|--------|------------|
| | | |

---

**Last Updated:** December 30, 2025
