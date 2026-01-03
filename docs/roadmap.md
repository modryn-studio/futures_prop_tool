# Futures Prop Firm Quiz - Roadmap

**Domain:** futuresproptool.com  
**Stack:** Next.js + Tailwind + Vercel + Kit (ConvertKit) + Supabase/Vercel Postgres  
**Goal:** Funnel-first affiliate site for futures prop firm recommendations

---

## PHASE 1: MVP LAUNCH (Days 1-2)
**Objective:** Live quiz capturing emails and driving affiliate clicks

### Day 1 (8-10 hours)
- [ ] **Next.js project scaffold** — App router, Tailwind, Vercel deploy
- [ ] **Landing page** — Single page with headline, CTA, trust elements
- [ ] **Quiz component** — 11 questions with state management
- [ ] **Email capture gate** — Kit integration before showing results
- [ ] **Results page** — Top 3 firms with personalized reasons + affiliate CTAs
- [ ] **Scoring engine** — Port `scoring.js` to Next.js, test all paths
- [ ] **Database** — Supabase or Vercel Postgres for quiz responses
- [ ] **Analytics** — Vercel Analytics + GA4 conversion tracking

### Day 2 (4-6 hours)
- [ ] **Kit email sequence** — 5 emails set up with automation triggers
- [ ] **UTM tracking** — All affiliate links tagged
- [ ] **Mobile optimization** — Test on real devices
- [ ] **First deploy** — Live on futuresproptool.com
- [ ] **Distribution Round 1:**
  - [ ] Reddit: 5-10 genuine answers in r/FuturesTrading, r/Forex
  - [ ] Twitter/X: Thread on prop firm comparison
  - [ ] Join 3 trading Discords

---

## PHASE 2: VALIDATION (Days 3-7)
**Objective:** 100+ quiz completions, identify what converts

### Metrics to Track
- Quiz completion rate (target: >70%)
- Email capture rate (target: >50% of completers)
- Click-through to affiliate (target: >20% of email captures)
- Which firms get clicked most
- Drop-off points in quiz

### Day 3-4: Analyze & Iterate
- [ ] Review quiz response data in database
- [ ] Fix any UX issues causing drop-off
- [ ] Tune scoring if recommendations feel wrong
- [ ] A/B headline if conversion is low

### Day 5-7: Expand What Works
- [ ] **If clicks concentrate on 2-3 firms:** Build those firm detail pages
- [ ] **If users compare specific matchups:** Build those VS pages
- [ ] **If calculator interest:** Add profit calculator tool
- [ ] **If email engagement high:** Expand to weekly newsletter

---

## PHASE 3: CONTENT EXPANSION (Week 2-3)
**Objective:** SEO foundation + more conversion paths

### Priority Pages (Based on Data)
1. Top 3 firm detail pages (from quiz click data)
2. Top 2 VS comparison pages (from user questions)
3. Homepage with comparison table
4. Browse/comparison page (all 13 firms) — Link from quiz results
5. Deals page (current promo codes)
6. Calculator tool

### SEO Foundation
- [ ] Proper metadata for all pages
- [ ] Schema markup (FAQ, Review, Product)
- [ ] Submit to Google Search Console
- [ ] Internal linking structure

---

## PHASE 4: SCALE (Month 2-3)
**Objective:** Full content coverage + traffic growth

### Content
- [ ] All 12 firm pages
- [ ] 10+ VS comparison pages
- [ ] "Best" category pages (beginners, cheapest, fastest payout)
- [ ] Blog posts for long-tail SEO

### Monetization
- [ ] All affiliate partnerships active
- [ ] Negotiate higher commissions with top performers
- [ ] Test paid ads ($100-200) on discount code keywords
- [ ] Email list >1K subscribers

### Features
- [ ] User review submissions
- [ ] Payout proof gallery
- [ ] Rule change alerts

---

## PHASE 5: MOAT BUILDING (Month 3+)
**Objective:** Defensibility through data and community

### Data Moat
- [ ] Weekly rule/price scraping
- [ ] User-submitted payout proofs
- [ ] Pass/fail rate tracking

### Community Moat
- [ ] Discord community
- [ ] Verified trader reviews
- [ ] Alert system for rule changes

### Revenue Targets
| Month | Traffic | Revenue |
|-------|---------|---------|
| 1 | 100-500 | $0-200 |
| 2 | 500-2K | $200-500 |
| 3 | 2K-5K | $500-1.5K |
| 6 | 10K-20K | $2K-5K |
| 12 | 30K-50K | $5K-15K |

---

## SUCCESS CRITERIA

### Week 1 (Validation)
- [ ] Quiz live and functional
- [ ] 100+ quiz completions
- [ ] 50+ email captures
- [ ] 10+ affiliate clicks
- [ ] 1+ conversion (ideal, not required)

### Month 1 (Traction)
- [ ] 500+ email subscribers
- [ ] At least 3 affiliate conversions
- [ ] Clear data on which firms convert best
- [ ] Firm pages for top 3 clicked firms

### Month 3 (Sustainable)
- [ ] $1K+ monthly revenue
- [ ] 5K+ monthly traffic
- [ ] SEO rankings for 10+ keywords
- [ ] Affiliate relationships with Big 3 (Apex, Topstep, MFFU)

---

## KILL CRITERIA

Stop and pivot if:
- Week 1: <20 quiz completions despite distribution effort
- Week 2: <5% email capture rate after UX fixes
- Month 1: 0 affiliate conversions despite 50+ clicks
- Month 2: <$200 revenue with >5K traffic (conversion issue)

---

## PARKING LOT (Later Ideas)

Not building until validated need:
- [ ] Blog/content hub
- [ ] Course or coaching referrals
- [ ] Paid newsletter tier
- [ ] Prop firm news aggregator
- [ ] Mobile app
- [ ] YouTube channel integration
