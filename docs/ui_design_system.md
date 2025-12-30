# Futures Prop Firm Funnel: UI/UX Design System

---

## DESIGN PHILOSOPHY

**Aesthetic Direction: "Terminal Luxe"**

The intersection of Bloomberg Terminal utility and luxury fintech. Dark, data-dense, but buttery smooth. This isn't a cute startup quiz — it's a tool for serious traders making serious decisions.

**Core Principles:**
1. **Trust through precision** — Every pixel intentional, every animation purposeful
2. **Data as design** — Numbers, percentages, comparisons ARE the visual interest
3. **Controlled tension** — Dark backgrounds, neon accents, subtle gradients create focus
4. **Speed signals competence** — Fast loads, instant feedback, zero jank

**What we're NOT:**
- Generic SaaS (no purple gradients, no Inter font, no rounded-everything)
- Playful/gamified (not Duolingo for trading)
- Cluttered dashboard (not trying to show everything)

---

## COLOR SYSTEM

### Primary Palette

```css
:root {
  /* Backgrounds - Layered depth */
  --bg-primary: #0A0A0F;      /* Deepest - page background */
  --bg-secondary: #12121A;    /* Cards, containers */
  --bg-tertiary: #1A1A24;     /* Elevated elements, hover states */
  --bg-quaternary: #24242F;   /* Input fields, subtle highlights */
  
  /* Text - High contrast hierarchy */
  --text-primary: #FAFAFA;    /* Headlines, key numbers */
  --text-secondary: #A0A0B0;  /* Body text, descriptions */
  --text-tertiary: #606070;   /* Captions, disabled states */
  
  /* Accent - Electric green (money, success, go) */
  --accent-primary: #00FF88;  /* CTAs, highlights, success */
  --accent-primary-dim: #00CC6A; /* Hover states */
  --accent-glow: rgba(0, 255, 136, 0.15); /* Glow effects */
  
  /* Secondary Accent - Electric blue (trust, data) */
  --accent-secondary: #00D4FF; /* Links, secondary actions */
  --accent-secondary-dim: #00A8CC;
  
  /* Warning/Alert */
  --warning: #FFB800;         /* Caution, dealbreakers */
  --danger: #FF4757;          /* Errors, eliminated firms */
  
  /* Gradients */
  --gradient-card: linear-gradient(135deg, #12121A 0%, #1A1A24 100%);
  --gradient-glow: radial-gradient(ellipse at center, rgba(0, 255, 136, 0.1) 0%, transparent 70%);
  --gradient-hero: linear-gradient(180deg, #0A0A0F 0%, #12121A 50%, #0A0A0F 100%);
}
```

### Color Usage Rules

| Element | Color | Why |
|---------|-------|-----|
| Page background | `--bg-primary` | Deepest layer, recedes |
| Cards/containers | `--bg-secondary` | Slight elevation |
| Input fields | `--bg-quaternary` | Clearly interactive |
| Primary CTA | `--accent-primary` on `--bg-primary` | Maximum contrast, impossible to miss |
| Secondary CTA | `--accent-secondary` outline | Visible but not competing |
| Success states | `--accent-primary` | Money = green |
| Warnings | `--warning` | Attention without panic |
| Eliminated firms | `--danger` | Clear negative signal |

---

## TYPOGRAPHY

### Font Stack

```css
:root {
  /* Display - For headlines, hero text, numbers */
  --font-display: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
  
  /* Body - For readable content */
  --font-body: 'Geist', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Alternative display option (more premium feel) */
  /* --font-display: 'Space Grotesk', 'DM Sans', sans-serif; */
}
```

**Why these fonts:**
- **JetBrains Mono**: Terminal aesthetic, numbers are beautiful, traders recognize it
- **Geist**: Vercel's font, modern, highly legible, pairs perfectly with mono
- Both are FREE and performant

### Type Scale

```css
/* Headlines */
.h1 { font-size: 3.5rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; }
.h2 { font-size: 2.5rem; font-weight: 600; letter-spacing: -0.01em; line-height: 1.2; }
.h3 { font-size: 1.75rem; font-weight: 600; letter-spacing: 0; line-height: 1.3; }
.h4 { font-size: 1.25rem; font-weight: 600; letter-spacing: 0; line-height: 1.4; }

/* Body */
.body-lg { font-size: 1.125rem; line-height: 1.6; }
.body { font-size: 1rem; line-height: 1.6; }
.body-sm { font-size: 0.875rem; line-height: 1.5; }
.caption { font-size: 0.75rem; line-height: 1.4; letter-spacing: 0.02em; }

/* Special - Numbers, data, stats */
.stat-lg { font-family: var(--font-display); font-size: 4rem; font-weight: 700; }
.stat { font-family: var(--font-display); font-size: 2rem; font-weight: 600; }
.stat-sm { font-family: var(--font-display); font-size: 1.25rem; font-weight: 500; }
```

---

## COMPONENT LIBRARY

### 1. Buttons

```css
/* Primary CTA - The money button */
.btn-primary {
  background: var(--accent-primary);
  color: var(--bg-primary);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 1rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0 20px var(--accent-glow);
}

.btn-primary:hover {
  background: var(--accent-primary-dim);
  transform: translateY(-2px);
  box-shadow: 0 0 30px var(--accent-glow), 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Secondary CTA */
.btn-secondary {
  background: transparent;
  color: var(--accent-secondary);
  border: 1px solid var(--accent-secondary);
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 1rem;
  padding: 0.875rem 1.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: var(--accent-secondary);
}

/* Ghost button - minimal */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-ghost:hover {
  color: var(--text-primary);
}
```

### 2. Cards

```css
/* Standard card */
.card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.card:hover {
  border-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Featured card - for #1 recommendation */
.card-featured {
  background: var(--gradient-card);
  border: 1px solid var(--accent-primary);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.card-featured::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--accent-primary);
}

/* Eliminated card - for "firms to avoid" */
.card-eliminated {
  background: var(--bg-secondary);
  border: 1px solid var(--danger);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  opacity: 0.7;
}
```

### 3. Quiz Option Buttons

```css
/* Quiz answer option */
.quiz-option {
  background: var(--bg-tertiary);
  border: 2px solid transparent;
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  text-align: left;
}

.quiz-option:hover {
  background: var(--bg-quaternary);
  border-color: rgba(255, 255, 255, 0.1);
}

.quiz-option.selected {
  background: rgba(0, 255, 136, 0.1);
  border-color: var(--accent-primary);
}

.quiz-option .option-indicator {
  width: 24px;
  height: 24px;
  border: 2px solid var(--text-tertiary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.quiz-option.selected .option-indicator {
  border-color: var(--accent-primary);
  background: var(--accent-primary);
}

.quiz-option.selected .option-indicator::after {
  content: '✓';
  color: var(--bg-primary);
  font-size: 14px;
  font-weight: bold;
}
```

### 4. Progress Bar

```css
/* Quiz progress bar */
.progress-container {
  width: 100%;
  height: 4px;
  background: var(--bg-tertiary);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%);
  border-radius: 2px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-text {
  font-family: var(--font-display);
  font-size: 0.875rem;
  color: var(--text-tertiary);
  margin-top: 0.5rem;
}
```

### 5. Input Fields

```css
/* Email input */
.input-field {
  width: 100%;
  background: var(--bg-quaternary);
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 1rem 1.25rem;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.input-field::placeholder {
  color: var(--text-tertiary);
}

.input-field:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 4px var(--accent-glow);
}

.input-field:invalid:not(:placeholder-shown) {
  border-color: var(--danger);
}
```

### 6. Badges/Tags

```css
/* Firm attribute badges */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  font-family: var(--font-display);
}

.badge-success {
  background: rgba(0, 255, 136, 0.15);
  color: var(--accent-primary);
}

.badge-warning {
  background: rgba(255, 184, 0, 0.15);
  color: var(--warning);
}

.badge-info {
  background: rgba(0, 212, 255, 0.15);
  color: var(--accent-secondary);
}

.badge-danger {
  background: rgba(255, 71, 87, 0.15);
  color: var(--danger);
}

/* Promo code badge */
.badge-promo {
  background: var(--accent-primary);
  color: var(--bg-primary);
  font-weight: 600;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}
```

---

## PAGE LAYOUTS

### 1. Landing Page

```
┌─────────────────────────────────────────────────────────┐
│                      [Logo]                              │
├─────────────────────────────────────────────────────────┤
│                                                          │
│           Tired of Paying Reset Fees?                   │
│                                                          │
│    This quiz matches you with a prop firm that fits     │
│    your style — so you stop failing evaluations.        │
│                                                          │
│              [ See Which Firm Fits You → ]              │
│                                                          │
│         ✓ 13 firms   ✓ Updated today   ✓ 2 min         │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│    📝 Answer 10 → 🎯 Get match → 🚀 Start funded        │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Key Details:**
- Hero takes full viewport height (100vh)
- Subtle animated gradient background
- Single CTA dominates the page
- Trust elements small but visible
- No navigation — one action only

### 2. Quiz Page

```
┌─────────────────────────────────────────────────────────┐
│  [←]                  3 of 10                    [Logo] │
├─────────────────────────────────────────────────────────┤
│  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  30%         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│                                                          │
│         What's your monthly budget for                  │
│         prop firm challenge fees?                        │
│                                                          │
│         ┌─────────────────────────────────┐             │
│         │  ○  Under $100/month            │             │
│         └─────────────────────────────────┘             │
│         ┌─────────────────────────────────┐             │
│         │  ●  $100-200/month         ✓    │  ← selected │
│         └─────────────────────────────────┘             │
│         ┌─────────────────────────────────┐             │
│         │  ○  $200-400/month              │             │
│         └─────────────────────────────────┘             │
│         ┌─────────────────────────────────┐             │
│         │  ○  $400+/month                 │             │
│         └─────────────────────────────────┘             │
│                                                          │
│         Why we ask: Challenge fees vary from            │
│         $49 to $600+/month.                             │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                    [ Continue → ]        │
└─────────────────────────────────────────────────────────┘
```

**Key Details:**
- Clean, focused, one question at a time
- Progress bar always visible
- "Why we ask" builds trust
- Auto-advance on selection (optional) or manual Continue
- Back button subtle but available
- Question counter in mono font

### 3. Email Capture

```
┌─────────────────────────────────────────────────────────┐
│                                                          │
│                         🎯                               │
│                                                          │
│           Your results are ready.                        │
│                                                          │
│    ┌─────────────────────────────────────────────┐      │
│    │  Your #1 match:                             │      │
│    │                                             │      │
│    │  ███████████████████░░░░░░░░  87% match    │      │
│    │                                             │      │
│    │  [    Blurred firm name/logo    ]          │      │
│    └─────────────────────────────────────────────┘      │
│                                                          │
│    Enter your email to see your personalized             │
│    recommendation with current promo codes.              │
│                                                          │
│    ┌─────────────────────────────────────────────┐      │
│    │  you@email.com                              │      │
│    └─────────────────────────────────────────────┘      │
│                                                          │
│              [ Show My Results → ]                       │
│                                                          │
│    ✓ No spam  ✓ Weekly deals  ✓ Unsubscribe anytime     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**Key Details:**
- Tease the result (match percentage, blurred logo)
- Creates urgency to complete
- Trust signals below CTA
- Single input field, no friction

### 4. Results Page

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]                                    [Share] [←]   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Based on your answers, here's your match:               │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐│
│  │  #1 MATCH                              87% FIT      ││
│  │  ═══════════════════════════════════════════════════││
│  │                                                      ││
│  │  [LOGO]  MyFundedFutures                            ││
│  │                                                      ││
│  │  ✓ Fastest payouts (32 min avg)                     ││
│  │  ✓ No activation fee                                ││
│  │  ✓ EOD drawdown matches your style                  ││
│  │                                                      ││
│  │  ⚠️ Watch out: Monthly fees continue until pass     ││
│  │                                                      ││
│  │  ┌────────────────────────────────────────────────┐ ││
│  │  │  🏷️ MATCH50 — 50% off                         │ ││
│  │  └────────────────────────────────────────────────┘ ││
│  │                                                      ││
│  │          [ Get Started with MFFU → ]                ││
│  │                                                      ││
│  └─────────────────────────────────────────────────────┘│
│                                                          │
│  Also consider:                                          │
│                                                          │
│  ┌────────────────────┐  ┌────────────────────┐         │
│  │ #2 Apex Trader     │  │ #3 Topstep         │         │
│  │ 100% first $25K    │  │ Best education     │         │
│  │ [View →]           │  │ [View →]           │         │
│  └────────────────────┘  └────────────────────┘         │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Firms eliminated based on your answers:                 │
│                                                          │
│  ✗ Elite Trader — Has activation fees you wanted avoid  │
│  ✗ BluSky — Has 30% consistency rule                    │
│                                                          │
│  This saved you ~$500 in wrong challenge fees.           │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  📧 Check your email for:                                │
│  • Detailed breakdown of your match                      │
│  • Week 1 strategy guide                                 │
│  • Promo code alerts when deals drop                     │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## ANIMATIONS & MICRO-INTERACTIONS

### Page Load Sequence

```css
/* Staggered fade-in on page load */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  opacity: 0;
}

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
```

### Quiz Transitions

```css
/* Question slide transition */
@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-30px);
  }
}

.question-enter {
  animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.question-exit {
  animation: slideOutLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

### Selection Feedback

```css
/* Option selection pulse */
@keyframes selectPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.quiz-option.just-selected {
  animation: selectPulse 0.3s ease;
}

/* Checkmark draw animation */
@keyframes drawCheck {
  from { stroke-dashoffset: 20; }
  to { stroke-dashoffset: 0; }
}

.checkmark {
  stroke-dasharray: 20;
  animation: drawCheck 0.3s ease forwards;
}
```

### Results Reveal

```css
/* Match percentage counter */
@keyframes countUp {
  from { --num: 0; }
  to { --num: var(--target); }
}

.match-percentage {
  counter-reset: num var(--num);
  animation: countUp 1s ease-out forwards;
}

.match-percentage::after {
  content: counter(num) '%';
}

/* Results card entrance */
@keyframes revealCard {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.result-card {
  animation: revealCard 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
```

### Glow Effects

```css
/* Ambient glow behind primary CTA */
.cta-container {
  position: relative;
}

.cta-container::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 70%);
  filter: blur(20px);
  z-index: -1;
  opacity: 0.6;
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
```

---

## MOBILE RESPONSIVENESS

### Breakpoints

```css
/* Mobile first approach */
:root {
  --container-width: 100%;
  --container-padding: 1.25rem;
}

/* Tablet */
@media (min-width: 640px) {
  :root {
    --container-width: 600px;
    --container-padding: 2rem;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --container-width: 800px;
    --container-padding: 2.5rem;
  }
}

/* Large desktop */
@media (min-width: 1280px) {
  :root {
    --container-width: 900px;
  }
}
```

### Mobile-Specific Adjustments

```css
@media (max-width: 639px) {
  /* Larger touch targets */
  .quiz-option {
    padding: 1rem;
    min-height: 64px;
  }
  
  .btn-primary {
    width: 100%;
    padding: 1.125rem 1.5rem;
    font-size: 1.125rem;
  }
  
  /* Stack runner-up cards */
  .runner-up-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  /* Reduce headline sizes */
  .h1 { font-size: 2.25rem; }
  .h2 { font-size: 1.75rem; }
  
  /* Fixed bottom CTA on quiz */
  .quiz-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, var(--bg-primary) 80%, transparent);
  }
}
```

---

## TECH STACK RECOMMENDATION

### Framework & Styling

| Tool | Choice | Why |
|------|--------|-----|
| Framework | **Next.js 14** (App Router) | SSR for SEO, fast, Vercel integration |
| Styling | **Tailwind CSS** | Rapid development, consistent design tokens |
| Animations | **Framer Motion** | Best React animation library, handles complex sequences |
| Icons | **Lucide React** | Clean, consistent, tree-shakable |
| Fonts | **next/font** | Self-hosted, no layout shift |

### Component Structure

```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── ProgressBar.tsx
│   └── index.ts
├── quiz/
│   ├── QuizContainer.tsx
│   ├── QuizQuestion.tsx
│   ├── QuizOption.tsx
│   ├── QuizProgress.tsx
│   └── EmailCapture.tsx
├── results/
│   ├── ResultsContainer.tsx
│   ├── TopMatch.tsx
│   ├── RunnerUp.tsx
│   ├── EliminatedFirms.tsx
│   └── PromoCode.tsx
└── layout/
    ├── Header.tsx
    ├── Footer.tsx
    └── Container.tsx
```

### Tailwind Config

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0F',
          secondary: '#12121A',
          tertiary: '#1A1A24',
          quaternary: '#24242F',
        },
        accent: {
          primary: '#00FF88',
          'primary-dim': '#00CC6A',
          secondary: '#00D4FF',
          'secondary-dim': '#00A8CC',
        },
        warning: '#FFB800',
        danger: '#FF4757',
      },
      fontFamily: {
        display: ['var(--font-jetbrains)', 'monospace'],
        body: ['var(--font-geist)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
    },
  },
};
```

---

## IMPLEMENTATION PRIORITY

| Day | Build | Time |
|-----|-------|------|
| 1 | Design tokens in Tailwind config, base components (Button, Card, Input) | 2 hrs |
| 1 | Landing page with animations | 2 hrs |
| 1 | Quiz component with transitions | 3 hrs |
| 1 | Email capture screen | 1 hr |
| 2 | Results page layout | 2 hrs |
| 2 | Mobile optimization pass | 1 hr |
| 2 | Polish animations, test flow | 1 hr |

**Total: ~12 hours for production-quality UI**

---

## FINAL NOTES

### Do's
- Use the glow effects sparingly — they're powerful
- Let the dark background breathe
- Make numbers and stats the hero
- Trust whitespace
- Test on mobile FIRST

### Don'ts
- Don't add gradients to everything
- Don't over-animate (one hero moment per screen)
- Don't use pure black (#000) — always use the deep navy (#0A0A0F)
- Don't skimp on touch targets
- Don't add unnecessary elements "for visual interest"

---

**This design system is built to convert. Ship it.**
