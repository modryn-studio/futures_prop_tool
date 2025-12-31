/**
 * Futures Prop Firm Quiz Scoring Logic
 * TypeScript port of scoring.js
 */

// ============================================
// TYPES
// ============================================

export interface QuizAnswers {
  q1_experience: 'less_than_6mo' | '6_to_12mo' | '1_to_3yr' | '3yr_plus'
  q2_situation: 'first_time' | 'attempted_not_passed' | 'passed_didnt_work' | 'currently_funded'
  q3_budget: 'under_100' | '100_to_200' | '200_to_400' | '400_plus'
  q3a_payment_preference: 'monthly' | 'one_time' | 'no_preference'
  q4_account_size: '25k_to_50k' | '50k_to_100k' | '100k_to_150k' | '150k_plus'
  q5_timeframe: 'scalping' | 'day_trading' | 'swing_trading' | 'mixed'
  q6_concern: 'drawdown_limits' | 'consistency_rules' | 'overnight_restrictions' | 'time_pressure' | 'payout_restrictions' | 'not_sure'
  q7_risk: 'conservative' | 'moderate' | 'aggressive' | 'depends'
  q8_payout_priority: 'critical' | 'important' | 'flexible' | 'other_factors'
  q9_support: 'none' | 'minimal' | 'moderate' | 'significant'
  q10_dealbreakers: string[]
}

export interface Firm {
  name: string
  score: number
  eliminated: boolean
  eliminationReason: string
  promoCode: string
  promoDiscount: string
  monthlyFee: string
  profitSplit: string
  trustpilot: number
  keyStrength: string
  affiliateLink: string
  platforms?: string
  activationFee?: string
  consistencyRule?: string
  drawdownType?: string
  overnightHolding?: string
  founded?: number
}

export interface FirmWithKey extends Firm {
  key: string
}

export interface QuizResults {
  recommended: FirmWithKey[]
  eliminated: FirmWithKey[]
  allFirms: FirmWithKey[]
  matchStrength: number
  totalFirmsEvaluated: number
  firmsEliminated: number
}

type FirmKey = 'apex' | 'topstep' | 'mffu' | 'tradeday' | 'blusky' | 'tpt' | 'earn2trade' | 'elite' | 'bulenox' | 'alpha' | 'tradeify' | 'goat' | 'lucid'
type FirmData = Record<FirmKey, Firm>

// ============================================
// AFFILIATE IDS
// ============================================

const AFFILIATE_IDS: Record<FirmKey, string> = {
  apex: process.env.NEXT_PUBLIC_APEX_AFFILIATE_ID || '',
  topstep: process.env.NEXT_PUBLIC_TOPSTEP_AFFILIATE_ID || '',
  mffu: process.env.NEXT_PUBLIC_MFFU_AFFILIATE_ID || '',
  tradeday: process.env.NEXT_PUBLIC_TRADEDAY_AFFILIATE_ID || '',
  blusky: process.env.NEXT_PUBLIC_BLUSKY_AFFILIATE_ID || '',
  tpt: process.env.NEXT_PUBLIC_TPT_AFFILIATE_ID || '',
  earn2trade: process.env.NEXT_PUBLIC_EARN2TRADE_AFFILIATE_ID || '',
  elite: process.env.NEXT_PUBLIC_ELITE_AFFILIATE_ID || '',
  bulenox: process.env.NEXT_PUBLIC_BULENOX_AFFILIATE_ID || '',
  alpha: process.env.NEXT_PUBLIC_ALPHA_AFFILIATE_ID || '',
  tradeify: process.env.NEXT_PUBLIC_TRADEIFY_AFFILIATE_ID || '',
  goat: process.env.NEXT_PUBLIC_GOAT_AFFILIATE_ID || '',
  lucid: process.env.NEXT_PUBLIC_LUCID_AFFILIATE_ID || '',
}

// Helper to build affiliate link - only adds ref param if ID exists
const buildAffiliateLink = (baseUrl: string, firmKey: FirmKey): string => {
  const affiliateId = AFFILIATE_IDS[firmKey]
  return affiliateId ? `${baseUrl}?ref=${affiliateId}` : baseUrl
}

// ============================================
// FIRM DATA
// ============================================

export const createFirmData = (): FirmData => ({
  apex: {
    name: 'Apex Trader Funding',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'SAVE80',
    promoDiscount: '80% off',
    monthlyFee: '$147-$657/mo (often 80-90% off)',
    profitSplit: '100% first $25K, then 90/10',
    trustpilot: 4.8,
    keyStrength: 'Best first payout bonus, up to 20 accounts',
    affiliateLink: buildAffiliateLink('https://apextraderfunding.com', 'apex'),
  },
  topstep: {
    name: 'Topstep',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'SAVE50',
    promoDiscount: '50% off',
    monthlyFee: '$49-$149/mo',
    profitSplit: '100% first $10K, then 90/10',
    trustpilot: 4.6,
    platforms: 'TopstepX (proprietary), NinjaTrader, TradingView',
    keyStrength: 'Most established (2012), best education/coaching',
    affiliateLink: buildAffiliateLink('https://topstep.com', 'topstep'),
  },
  mffu: {
    name: 'MyFundedFutures',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'MATCH50',
    promoDiscount: '50% off',
    monthlyFee: '$77-$247/mo',
    profitSplit: '100% first $10K, then 90/10',
    trustpilot: 4.9,
    activationFee: 'None',
    keyStrength: 'Fastest payouts (32 min avg), no activation fee',
    affiliateLink: buildAffiliateLink('https://myfundedfutures.com', 'mffu'),
  },
  tradeday: {
    name: 'TradeDay',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'NOFEE40',
    promoDiscount: '40% off',
    monthlyFee: '$99-$199/mo',
    profitSplit: '80-95%',
    trustpilot: 4.7,
    keyStrength: '1-day minimum, path to live capital',
    affiliateLink: buildAffiliateLink('https://tradeday.com', 'tradeday'),
  },
  blusky: {
    name: 'BluSky Trading',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'TRADINGPLUS',
    promoDiscount: '30% off',
    monthlyFee: '$49-$199/mo',
    profitSplit: '90/10 (scales higher)',
    trustpilot: 4.7,
    drawdownType: 'Trailing or Static (choice)',
    keyStrength: 'Daily payouts, same-day processing, free coaching',
    affiliateLink: buildAffiliateLink('https://blusky.pro', 'blusky'),
  },
  tpt: {
    name: 'Take Profit Trader',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'NOFEE100',
    promoDiscount: '30% off + no activation fee',
    monthlyFee: '$150-$360/mo',
    profitSplit: '80/20 (PRO), 90/10 (PRO+)',
    trustpilot: 4.4,
    consistencyRule: '50% (eval only) - No consistency rule in funded account',
    drawdownType: 'EOD (eval), Intraday (PRO funded)',
    keyStrength: 'Day-one withdrawals, no consistency rule in funded',
    affiliateLink: buildAffiliateLink('https://takeprofittrader.com', 'tpt'),
  },
  earn2trade: {
    name: 'Earn2Trade',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'SAVE60',
    promoDiscount: '60% off',
    monthlyFee: '$150-$350/mo (often 50% off)',
    profitSplit: '80/20',
    trustpilot: 4.7,
    activationFee: '$139 (deducted from first payout)',
    consistencyRule: 'None',
    keyStrength: 'Best education, Career Path scaling to $400K',
    affiliateLink: buildAffiliateLink('https://earn2trade.com', 'earn2trade'),
  },
  elite: {
    name: 'Elite Trader Funding',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'MATCH',
    promoDiscount: 'Various discounts',
    monthlyFee: '$75-$365 + $80/mo funded',
    profitSplit: '100% first $12.5K, then 90/10',
    trustpilot: 4.1,
    platforms: 'NinjaTrader, Tradovate, TradingView, 31+ total',
    overnightHolding: 'Diamond Hands plan ONLY',
    keyStrength: '5 evaluation types, Diamond Hands allows overnight/weekend',
    affiliateLink: buildAffiliateLink('https://elitetraderfunding.com', 'elite'),
  },
  bulenox: {
    name: 'Bulenox',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'SAVE',
    promoDiscount: 'Various',
    monthlyFee: '$85-$535 one-time',
    profitSplit: '90%',
    trustpilot: 4.6,
    consistencyRule: '40%',
    keyStrength: 'One-time fee, no monthly recurring',
    affiliateLink: buildAffiliateLink('https://bulenox.com', 'bulenox'),
  },
  alpha: {
    name: 'Alpha Futures',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'ALPHA40',
    promoDiscount: '40% off',
    monthlyFee: '$79-$179/mo',
    profitSplit: '90%',
    trustpilot: 4.5,
    founded: 2024,
    consistencyRule: '50%',
    keyStrength: 'Newest major player, competitive pricing',
    affiliateLink: buildAffiliateLink('https://alphafutures.com', 'alpha'),
  },
  tradeify: {
    name: 'Tradeify',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'TRADEIFY35',
    promoDiscount: '35% off',
    monthlyFee: '$65-$185/mo',
    profitSplit: '80-90%',
    trustpilot: 4.6,
    consistencyRule: '30%',
    keyStrength: 'Low monthly cost, straightforward rules',
    affiliateLink: buildAffiliateLink('https://tradeify.com', 'tradeify'),
  },
  goat: {
    name: 'Goat Funded Futures',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'GOAT',
    promoDiscount: 'Various',
    monthlyFee: '$97-$277 one-time',
    profitSplit: '80%',
    trustpilot: 4.3,
    activationFee: '$150-$350',
    consistencyRule: 'None',
    keyStrength: 'Instant funding - no evaluation required',
    affiliateLink: buildAffiliateLink('https://goatfundedfutures.com', 'goat'),
  },
  lucid: {
    name: 'Lucid Trading',
    score: 0,
    eliminated: false,
    eliminationReason: '',
    promoCode: 'LUCID50',
    promoDiscount: '50% off',
    monthlyFee: '$60-$221 one-time',
    profitSplit: '90/10',
    trustpilot: 4.8,
    activationFee: 'None',
    consistencyRule: '40% (eval only) - None in LucidFlex funded',
    platforms: 'Rithmic, Tradovate, NinjaTrader, Quantower',
    drawdownType: 'Trailing (EOD)',
    founded: 2025,
    keyStrength: '~15 min payouts, one-time fee, no activation fee',
    affiliateLink: buildAffiliateLink('https://lucidtrading.com', 'lucid'),
  },
})

// ============================================
// SCORING FUNCTION
// ============================================

export function scoreQuiz(answers: QuizAnswers): QuizResults {
  const firms = createFirmData()

  // Q1: Experience Level
  switch (answers.q1_experience) {
    case 'less_than_6mo':
      firms.topstep.score += 4
      firms.earn2trade.score += 4
      firms.mffu.score += 2
      firms.blusky.score += 2
      firms.lucid.score += 2
      firms.elite.score -= 1
      firms.goat.score -= 2
      break
    case '6_to_12mo':
      firms.mffu.score += 3
      firms.topstep.score += 3
      firms.tradeday.score += 2
      firms.apex.score += 2
      firms.blusky.score += 2
      firms.lucid.score += 3
      break
    case '1_to_3yr':
      firms.apex.score += 3
      firms.mffu.score += 3
      firms.tpt.score += 3
      firms.tradeday.score += 2
      firms.elite.score += 2
      firms.lucid.score += 2
      break
    case '3yr_plus':
      firms.apex.score += 4
      firms.elite.score += 3
      firms.tpt.score += 3
      firms.goat.score += 2
      firms.bulenox.score += 2
      firms.lucid.score += 2
      break
  }

  // Q2: Current Situation
  switch (answers.q2_situation) {
    case 'first_time':
      firms.topstep.score += 3
      firms.earn2trade.score += 3
      firms.mffu.score += 2
      firms.blusky.score += 2
      firms.lucid.score += 2
      break
    case 'attempted_not_passed':
      firms.mffu.score += 3
      firms.tpt.score += 2
      firms.tradeday.score += 2
      firms.goat.score += 2
      firms.lucid.score += 3
      break
    case 'passed_didnt_work':
      firms.mffu.score += 2
      firms.apex.score += 2
      firms.tpt.score += 2
      firms.blusky.score += 2
      firms.lucid.score += 2
      break
    case 'currently_funded':
      firms.apex.score += 4
      firms.elite.score += 2
      firms.mffu.score += 2
      firms.lucid.score += 2
      break
  }

  // Q3: Budget
  switch (answers.q3_budget) {
    case 'under_100':
      firms.topstep.score += 4
      firms.blusky.score += 4
      firms.tradeify.score += 3
      firms.lucid.score += 4
      firms.elite.score += 2
      firms.apex.score -= 2
      firms.tpt.score -= 2
      firms.earn2trade.score -= 1
      break
    case '100_to_200':
      firms.mffu.score += 3
      firms.topstep.score += 3
      firms.tradeday.score += 3
      firms.alpha.score += 2
      firms.tradeify.score += 2
      firms.lucid.score += 3
      break
    case '200_to_400':
      firms.apex.score += 3
      firms.earn2trade.score += 3
      firms.tpt.score += 3
      firms.mffu.score += 2
      firms.elite.score += 2
      firms.lucid.score += 2
      break
    case '400_plus':
      firms.apex.score += 3
      firms.elite.score += 3
      firms.earn2trade.score += 2
      firms.tpt.score += 2
      break
  }

  // Q3a: Payment Preference
  switch (answers.q3a_payment_preference) {
    case 'monthly':
      firms.topstep.score += 2
      firms.mffu.score += 2
      firms.apex.score += 1
      firms.bulenox.score -= 1
      firms.goat.score -= 1
      firms.lucid.score -= 1
      break
    case 'one_time':
      firms.bulenox.score += 5
      firms.goat.score += 5
      firms.lucid.score += 5
      firms.topstep.score -= 1
      firms.mffu.score -= 1
      break
    case 'no_preference':
      break
  }

  // Q4: Account Size Goal
  switch (answers.q4_account_size) {
    case '25k_to_50k':
      firms.topstep.score += 2
      firms.mffu.score += 2
      firms.blusky.score += 2
      firms.earn2trade.score += 2
      firms.lucid.score += 3
      break
    case '50k_to_100k':
      firms.apex.score += 2
      firms.mffu.score += 2
      firms.topstep.score += 2
      firms.tradeday.score += 2
      firms.tpt.score += 2
      firms.lucid.score += 2
      break
    case '100k_to_150k':
      firms.apex.score += 3
      firms.mffu.score += 3
      firms.topstep.score += 2
      firms.elite.score += 2
      firms.tpt.score += 2
      firms.lucid.score += 2
      break
    case '150k_plus':
      firms.apex.score += 4
      firms.elite.score += 3
      firms.bulenox.score += 3
      firms.earn2trade.score += 3
      firms.tpt.score -= 1
      firms.lucid.score -= 1
      break
  }

  // Q5: Trading Style
  switch (answers.q5_timeframe) {
    case 'scalping':
      firms.apex.score += 3
      firms.tpt.score += 3
      firms.mffu.score += 2
      firms.tradeday.score += 2
      firms.lucid.score += 2
      break
    case 'day_trading':
      firms.apex.score += 2
      firms.topstep.score += 2
      firms.mffu.score += 2
      firms.tpt.score += 2
      firms.tradeday.score += 2
      firms.blusky.score += 2
      firms.lucid.score += 2
      break
    case 'swing_trading':
      firms.elite.score += 5
      Object.keys(firms).forEach((key) => {
        if (key !== 'elite') {
          firms[key as FirmKey].score -= 2
        }
      })
      break
    case 'mixed':
      firms.apex.score += 2
      firms.mffu.score += 2
      firms.tpt.score += 2
      firms.elite.score += 2
      firms.lucid.score += 2
      break
  }

  // Q6: Biggest Concern
  switch (answers.q6_concern) {
    case 'drawdown_limits':
      firms.mffu.score += 4
      firms.earn2trade.score += 4
      firms.blusky.score += 3
      firms.topstep.score += 2
      firms.lucid.score += 3
      firms.tpt.score -= 2
      break
    case 'consistency_rules':
      firms.tpt.score += 4
      firms.mffu.score += 3
      firms.elite.score += 3
      firms.earn2trade.score += 2
      firms.bulenox.score += 2
      firms.lucid.score += 3
      firms.apex.score -= 3
      firms.topstep.score -= 3
      firms.blusky.score -= 2
      firms.tradeday.score -= 2
      break
    case 'overnight_restrictions':
      Object.keys(firms).forEach((key) => {
        if (key !== 'elite') {
          firms[key as FirmKey].eliminated = true
          firms[key as FirmKey].eliminationReason = 'Does not allow overnight holding'
        }
      })
      firms.elite.score += 5
      break
    case 'time_pressure':
      firms.topstep.score += 2
      firms.mffu.score += 2
      firms.apex.score += 2
      firms.earn2trade.score += 2
      firms.lucid.score += 2
      firms.goat.score += 1
      break
    case 'payout_restrictions':
      firms.mffu.score += 4
      firms.blusky.score += 4
      firms.tpt.score += 4
      firms.lucid.score += 5
      firms.earn2trade.score -= 2
      firms.elite.score -= 2
      break
    case 'not_sure':
      break
  }

  // Q7: Risk Tolerance
  switch (answers.q7_risk) {
    case 'conservative':
      firms.topstep.score += 2
      firms.earn2trade.score += 2
      firms.tradeday.score += 2
      firms.mffu.score += 2
      firms.lucid.score += 2
      break
    case 'moderate':
      firms.mffu.score += 3
      firms.earn2trade.score += 3
      firms.topstep.score += 2
      firms.apex.score += 2
      firms.lucid.score += 2
      firms.tpt.score -= 1
      break
    case 'aggressive':
      firms.apex.score += 3
      firms.tpt.score += 3
      firms.elite.score += 2
      firms.blusky.score += 2
      firms.earn2trade.score -= 1
      break
    case 'depends':
      firms.apex.score += 2
      firms.mffu.score += 2
      firms.blusky.score += 2
      firms.lucid.score += 2
      break
  }

  // Q8: Payout Priority
  switch (answers.q8_payout_priority) {
    case 'critical':
      firms.mffu.score += 4
      firms.blusky.score += 4
      firms.tpt.score += 4
      firms.lucid.score += 5
      firms.topstep.score += 2
      firms.earn2trade.score -= 2
      firms.elite.score -= 1
      break
    case 'important':
      firms.apex.score += 2
      firms.mffu.score += 2
      firms.blusky.score += 2
      firms.tradeday.score += 2
      firms.lucid.score += 3
      break
    case 'flexible':
    case 'other_factors':
      break
  }

  // Q9: Support & Education
  switch (answers.q9_support) {
    case 'none':
      firms.apex.score += 3
      firms.tpt.score += 3
      firms.bulenox.score += 2
      firms.goat.score += 2
      firms.lucid.score += 2
      break
    case 'minimal':
      firms.mffu.score += 2
      firms.apex.score += 2
      firms.blusky.score += 2
      firms.tradeday.score += 2
      firms.lucid.score += 2
      break
    case 'moderate':
      firms.topstep.score += 4
      firms.earn2trade.score += 3
      firms.blusky.score += 3
      break
    case 'significant':
      firms.topstep.score += 5
      firms.earn2trade.score += 5
      firms.blusky.score += 3
      firms.apex.score -= 1
      firms.tpt.score -= 1
      firms.bulenox.score -= 1
      firms.lucid.score -= 1
      break
  }

  // Q10: Dealbreakers
  const dealbreakers = answers.q10_dealbreakers || []

  if (dealbreakers.includes('monthly_fees')) {
    firms.bulenox.score += 4
    firms.goat.score += 4
    firms.lucid.score += 4
    const monthlyFirms: FirmKey[] = ['topstep', 'mffu', 'apex', 'tradeday', 'tpt', 'earn2trade', 'blusky', 'alpha', 'tradeify']
    monthlyFirms.forEach((key) => {
      firms[key].eliminated = true
      firms[key].eliminationReason = 'Has monthly recurring fees'
    })
  }

  if (dealbreakers.includes('consistency_rules')) {
    const consistencyFirms: Array<{ key: FirmKey; rule: string }> = [
      { key: 'apex', rule: '30%' },
      { key: 'topstep', rule: '50%' },
      { key: 'blusky', rule: '30%' },
      { key: 'tradeday', rule: '30%' },
      { key: 'alpha', rule: '50%' },
      { key: 'tradeify', rule: '30%' },
    ]
    consistencyFirms.forEach(({ key, rule }) => {
      firms[key].eliminated = true
      firms[key].eliminationReason = `Has ${rule} consistency rule`
    })
    firms.tpt.score += 3
    firms.mffu.score += 2
    firms.earn2trade.score += 2
    firms.lucid.score += 3
  }

  if (dealbreakers.includes('overnight_restrictions')) {
    Object.keys(firms).forEach((key) => {
      if (key !== 'elite') {
        firms[key as FirmKey].eliminated = true
        firms[key as FirmKey].eliminationReason = 'Does not allow overnight/weekend holding'
      }
    })
    firms.elite.score += 5
  }

  if (dealbreakers.includes('intraday_drawdown')) {
    firms.tpt.eliminated = true
    firms.tpt.eliminationReason = 'Uses intraday trailing drawdown in funded account'
    firms.mffu.score += 3
    firms.earn2trade.score += 3
    firms.topstep.score += 2
    firms.blusky.score += 2
    firms.lucid.score += 3
  }

  if (dealbreakers.includes('activation_fees')) {
    const activationFirms: FirmKey[] = ['topstep', 'tpt', 'elite', 'goat', 'earn2trade']
    activationFirms.forEach((key) => {
      firms[key].eliminated = true
      firms[key].eliminationReason = 'Has activation fee after passing'
    })
    firms.mffu.score += 4
    firms.blusky.score += 3
    firms.apex.score += 2
    firms.tradeday.score += 2
    firms.lucid.score += 4
  }

  if (dealbreakers.includes('limited_platforms')) {
    firms.topstep.score -= 2
    firms.elite.score += 2
    firms.tpt.score += 2
    firms.apex.score += 1
    firms.mffu.score += 1
    firms.lucid.score += 1
  }

  // Calculate final results
  const validFirms = Object.entries(firms)
    .map(([key, firm]) => ({ key, ...firm }))
    .filter((firm) => !firm.eliminated)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return b.trustpilot - a.trustpilot
    })

  const eliminatedFirms = Object.entries(firms)
    .map(([key, firm]) => ({ key, ...firm }))
    .filter((firm) => firm.eliminated)

  const recommended = validFirms.slice(0, 3)

  const maxPossibleScore = 40
  const matchStrength =
    recommended.length > 0 ? Math.min(Math.round((recommended[0].score / maxPossibleScore) * 100), 95) : 0

  return {
    recommended,
    eliminated: eliminatedFirms,
    allFirms: validFirms,
    matchStrength,
    totalFirmsEvaluated: 13,
    firmsEliminated: eliminatedFirms.length,
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export function generateMatchReason(firmKey: string, answers: QuizAnswers): string[] {
  const reasons: string[] = []

  if (answers.q3_budget === 'under_100' && ['topstep', 'blusky', 'tradeify', 'lucid'].includes(firmKey)) {
    reasons.push('Fits your budget at under $100/month')
  }

  if (answers.q1_experience === 'less_than_6mo' && ['topstep', 'earn2trade'].includes(firmKey)) {
    reasons.push('Strong education and coaching for newer traders')
  }

  if (answers.q8_payout_priority === 'critical') {
    if (firmKey === 'mffu') reasons.push('Fastest payouts in the industry (32-min average)')
    if (firmKey === 'lucid') reasons.push('Ultra-fast payouts (~15 min average)')
    if (firmKey === 'blusky') reasons.push('Same-day payout processing')
    if (firmKey === 'tpt') reasons.push('Day-one withdrawal capability')
  }

  if (answers.q6_concern === 'consistency_rules') {
    if (firmKey === 'tpt') reasons.push('No consistency rule in funded account')
    if (firmKey === 'mffu') reasons.push('Consistency rule removed after evaluation')
    if (firmKey === 'lucid') reasons.push('LucidFlex removes consistency rule in funded account')
  }

  if (answers.q6_concern === 'drawdown_limits') {
    if (['mffu', 'earn2trade', 'topstep', 'lucid'].includes(firmKey)) {
      reasons.push('End-of-day drawdown calculation gives you room to recover')
    }
  }

  if (answers.q9_support === 'significant' && ['topstep', 'earn2trade'].includes(firmKey)) {
    reasons.push('Extensive coaching and educational resources')
  }

  if (answers.q2_situation === 'currently_funded' && firmKey === 'apex') {
    reasons.push('Run up to 20 accounts simultaneously')
  }

  if (answers.q4_account_size === '150k_plus') {
    if (firmKey === 'apex') reasons.push('Accounts up to $300K with scaling to 20 accounts')
    if (firmKey === 'earn2trade') reasons.push('Career path scales up to $400K')
  }

  return reasons.length > 0 ? reasons : ['Strong overall match based on your trading profile']
}

export function generateWarning(firmKey: string): string {
  const warnings: Record<string, string> = {
    apex: "Has a 30% consistency rule — your biggest day can't exceed 30% of total profits",
    topstep: '50% consistency rule and now requires TopstepX platform',
    mffu: 'Monthly recurring fees continue until you pass',
    tpt: 'Intraday trailing drawdown in funded account is strict',
    earn2trade: 'Payouts only processed on Wednesdays',
    elite: 'Complex payout rules and $80/month fee after funding',
    blusky: '30% consistency rule applies in evaluation and BluLive',
    bulenox: '40% consistency rule',
    goat: "No evaluation means no practice period — you're live immediately",
    tradeday: '30% consistency rule',
    alpha: '50% consistency rule, newer firm with less track record',
    tradeify: '30% consistency rule',
    lucid: '40% consistency rule during evaluation, founded 2025 (new firm)',
  }

  return warnings[firmKey] || 'Review all rules carefully before starting'
}
