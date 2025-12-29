/**
 * Futures Prop Firm Quiz Scoring Logic
 * 
 * This file contains the complete scoring algorithm for matching
 * quiz takers to their ideal futures prop firm.
 * 
 * Scoring approach:
 * - Each answer adds/subtracts points to relevant firms
 * - Dealbreakers eliminate firms entirely (score becomes irrelevant)
 * - Top 3 non-eliminated firms become recommendations
 * - Eliminated firms shown with reasons in "Firms to Avoid" section
 * 
 * TODO: Tune scoring weights after 50-100 quiz completions based on:
 * - Which firms get recommended most (check for over/under-representation)
 * - Recommended firms vs. clicked firms (are recommendations converting?)
 * - User feedback on match quality
 * 
 * TODO: Move promoCode/promoDiscount to database (Supabase) - these change weekly
 * TODO: Replace affiliate link placeholders with real IDs once approved
 */

// ============================================
// FIRM DATA
// ============================================

// TODO: Move to environment variables once affiliate partnerships are set up
const AFFILIATE_IDS = {
  apex: process.env.NEXT_PUBLIC_APEX_AFFILIATE_ID || "PENDING",
  topstep: process.env.NEXT_PUBLIC_TOPSTEP_AFFILIATE_ID || "PENDING",
  mffu: process.env.NEXT_PUBLIC_MFFU_AFFILIATE_ID || "PENDING",
  tradeday: process.env.NEXT_PUBLIC_TRADEDAY_AFFILIATE_ID || "PENDING",
  blusky: process.env.NEXT_PUBLIC_BLUSKY_AFFILIATE_ID || "PENDING",
  tpt: process.env.NEXT_PUBLIC_TPT_AFFILIATE_ID || "PENDING",
  earn2trade: process.env.NEXT_PUBLIC_EARN2TRADE_AFFILIATE_ID || "PENDING",
  elite: process.env.NEXT_PUBLIC_ELITE_AFFILIATE_ID || "PENDING",
  bulenox: process.env.NEXT_PUBLIC_BULENOX_AFFILIATE_ID || "PENDING",
  alpha: process.env.NEXT_PUBLIC_ALPHA_AFFILIATE_ID || "PENDING",
  tradeify: process.env.NEXT_PUBLIC_TRADEIFY_AFFILIATE_ID || "PENDING",
  goat: process.env.NEXT_PUBLIC_GOAT_AFFILIATE_ID || "PENDING",
};

const createFirmData = () => ({
  apex: {
    name: "Apex Trader Funding",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "SAVE80", // TODO: Fetch from DB - changes frequently
    promoDiscount: "80% off", // Often 80-90% off
    monthlyFee: "$147-$657/mo (often 80-90% off)",
    profitSplit: "100% first $25K, then 90/10",
    trustpilot: 4.8,
    keyStrength: "Best first payout bonus, up to 20 accounts",
    affiliateLink: `https://apextraderfunding.com/?ref=${AFFILIATE_IDS.apex}`
  },
  topstep: {
    name: "Topstep",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "SAVE50", // TODO: Fetch from DB
    promoDiscount: "50% off",
    monthlyFee: "$49-$149/mo",
    profitSplit: "100% first $10K, then 90/10",
    trustpilot: 4.6,
    platforms: "TopstepX (proprietary), NinjaTrader, TradingView",
    keyStrength: "Most established (2012), best education/coaching",
    affiliateLink: `https://topstep.com/?ref=${AFFILIATE_IDS.topstep}`
  },
  mffu: {
    name: "MyFundedFutures",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "MATCH50", // TODO: Fetch from DB
    promoDiscount: "50% off",
    monthlyFee: "$77-$247/mo",
    profitSplit: "100% first $10K, then 90/10",
    trustpilot: 4.9,
    activationFee: "None", // Confirmed: No activation fee
    keyStrength: "Fastest payouts (32 min avg), no activation fee",
    affiliateLink: `https://myfundedfutures.com/?ref=${AFFILIATE_IDS.mffu}`
  },
  tradeday: {
    name: "TradeDay",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "NOFEE40", // TODO: Fetch from DB
    promoDiscount: "40% off",
    monthlyFee: "$99-$199/mo",
    profitSplit: "80-95%",
    trustpilot: 4.7,
    keyStrength: "1-day minimum, path to live capital",
    affiliateLink: `https://tradeday.com/?ref=${AFFILIATE_IDS.tradeday}`
  },
  blusky: {
    name: "BluSky Trading",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "TRADINGPLUS", // TODO: Fetch from DB
    promoDiscount: "30% off",
    monthlyFee: "$49-$199/mo",
    profitSplit: "90/10 (scales higher)",
    trustpilot: 4.7,
    drawdownType: "Trailing or Static (choice)",
    keyStrength: "Daily payouts, same-day processing, free coaching",
    affiliateLink: `https://blusky.pro/?ref=${AFFILIATE_IDS.blusky}`
  },
  tpt: {
    name: "Take Profit Trader",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "NOFEE100", // TODO: Fetch from DB
    promoDiscount: "30% off + no activation fee",
    monthlyFee: "$150-$360/mo",
    profitSplit: "80/20 (PRO), 90/10 (PRO+)",
    trustpilot: 4.4,
    consistencyRule: "50% (eval only) - No consistency rule in funded account",
    drawdownType: "EOD (eval), Intraday (PRO funded)",
    keyStrength: "Day-one withdrawals, no consistency rule in funded",
    affiliateLink: `https://takeprofittrader.com/?ref=${AFFILIATE_IDS.tpt}`
  },
  earn2trade: {
    name: "Earn2Trade",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "SAVE60", // TODO: Fetch from DB - often 50% off
    promoDiscount: "60% off",
    monthlyFee: "$150-$350/mo (often 50% off)",
    profitSplit: "80/20",
    trustpilot: 4.7,
    activationFee: "$139 (deducted from first payout)",
    consistencyRule: "None",
    keyStrength: "Best education, Career Path scaling to $400K",
    affiliateLink: `https://earn2trade.com/?ref=${AFFILIATE_IDS.earn2trade}`
  },
  elite: {
    name: "Elite Trader Funding",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "MATCH", // TODO: Fetch from DB
    promoDiscount: "Various discounts",
    monthlyFee: "$75-$365 + $80/mo funded",
    profitSplit: "100% first $12.5K, then 90/10",
    trustpilot: 4.1,
    platforms: "NinjaTrader, Tradovate, TradingView, 31+ total",
    overnightHolding: "Diamond Hands plan ONLY - other plans do not allow",
    keyStrength: "5 evaluation types, Diamond Hands allows overnight/weekend holding",
    affiliateLink: `https://elitetraderfunding.com/?ref=${AFFILIATE_IDS.elite}`
  },
  bulenox: {
    name: "Bulenox",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "SAVE", // TODO: Fetch from DB
    promoDiscount: "Various",
    monthlyFee: "$85-$535 one-time",
    profitSplit: "90%",
    trustpilot: 4.6,
    consistencyRule: "40%",
    keyStrength: "One-time fee, no monthly recurring",
    affiliateLink: `https://bulenox.com/?ref=${AFFILIATE_IDS.bulenox}`
  },
  alpha: {
    name: "Alpha Futures",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "ALPHA40", // TODO: Fetch from DB
    promoDiscount: "40% off",
    monthlyFee: "$79-$179/mo",
    profitSplit: "90%",
    trustpilot: 4.5,
    founded: 2024,
    consistencyRule: "50%",
    keyStrength: "Newest major player, competitive pricing",
    affiliateLink: `https://alphafutures.com/?ref=${AFFILIATE_IDS.alpha}`
  },
  tradeify: {
    name: "Tradeify",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "TRADEIFY35", // TODO: Fetch from DB
    promoDiscount: "35% off",
    monthlyFee: "$65-$185/mo",
    profitSplit: "80-90%",
    trustpilot: 4.6,
    consistencyRule: "30%",
    keyStrength: "Low monthly cost, straightforward rules",
    affiliateLink: `https://tradeify.com/?ref=${AFFILIATE_IDS.tradeify}`
  },
  goat: {
    name: "Goat Funded Futures",
    score: 0,
    eliminated: false,
    eliminationReason: "",
    promoCode: "GOAT", // TODO: Fetch from DB
    promoDiscount: "Various",
    monthlyFee: "$97-$277 one-time",
    profitSplit: "80%",
    trustpilot: 4.3,
    activationFee: "$150-$350",
    consistencyRule: "None",
    keyStrength: "Instant funding - no evaluation required",
    affiliateLink: `https://goatfundedfutures.com/?ref=${AFFILIATE_IDS.goat}`
  }
});


// ============================================
// SCORING FUNCTION
// ============================================

function scoreQuiz(answers) {
  // Initialize fresh firm data
  const firms = createFirmData();
  
  // ----------------------------------------
  // Q1: Experience Level
  // "How long have you been actively trading futures?"
  // ----------------------------------------
  switch (answers.q1_experience) {
    case "less_than_6mo":
      // Beginners need education and support
      firms.topstep.score += 4;
      firms.earn2trade.score += 4;
      firms.mffu.score += 2;
      firms.blusky.score += 2;
      // Discourage complex or aggressive firms
      firms.elite.score -= 1;
      firms.goat.score -= 2; // Instant funding not great for beginners
      break;
      
    case "6_to_12mo":
      // Getting consistent, need reasonable rules
      firms.mffu.score += 3;
      firms.topstep.score += 3;
      firms.tradeday.score += 2;
      firms.apex.score += 2;
      firms.blusky.score += 2;
      break;
      
    case "1_to_3yr":
      // Experienced, can handle stricter rules for better payouts
      firms.apex.score += 3;
      firms.mffu.score += 3;
      firms.tpt.score += 3;
      firms.tradeday.score += 2;
      firms.elite.score += 2;
      break;
      
    case "3yr_plus":
      // Veterans want max capital and best splits
      firms.apex.score += 4;
      firms.elite.score += 3;
      firms.tpt.score += 3;
      firms.goat.score += 2; // Can handle instant funding
      firms.bulenox.score += 2;
      break;
  }

  // ----------------------------------------
  // Q2: Current Situation
  // "Have you attempted a prop firm evaluation before?"
  // ----------------------------------------
  switch (answers.q2_situation) {
    case "first_time":
      // First timers need supportive firms
      firms.topstep.score += 3;
      firms.earn2trade.score += 3;
      firms.mffu.score += 2;
      firms.blusky.score += 2;
      break;
      
    case "attempted_not_passed":
      // Failed before - need easier rules or better fit
      firms.mffu.score += 3; // High pass rate (25%)
      firms.tpt.score += 2; // No daily loss limit
      firms.tradeday.score += 2; // Simple rules
      firms.goat.score += 2; // Skip evaluation entirely
      break;
      
    case "passed_didnt_work":
      // Passed but firm wasn't right fit - needs better matching
      firms.mffu.score += 2;
      firms.apex.score += 2;
      firms.tpt.score += 2;
      firms.blusky.score += 2;
      break;
      
    case "currently_funded":
      // Looking to add accounts - wants scale
      firms.apex.score += 4; // Up to 20 accounts
      firms.elite.score += 2;
      firms.mffu.score += 2; // Up to 10 accounts
      break;
  }

  // ----------------------------------------
  // Q3: Budget
  // "What's your monthly budget for prop firm challenge fees?"
  // ----------------------------------------
  switch (answers.q3_budget) {
    case "under_100":
      // Tight budget - need cheapest options
      firms.topstep.score += 4; // $49/mo
      firms.blusky.score += 4; // $49/mo
      firms.tradeify.score += 3; // $65/mo
      firms.elite.score += 2; // $75 Fast Track
      // Expensive firms deprioritized
      firms.apex.score -= 2;
      firms.tpt.score -= 2;
      firms.earn2trade.score -= 1;
      break;
      
    case "100_to_200":
      // Moderate budget - most firms available
      firms.mffu.score += 3; // $77-$167
      firms.topstep.score += 3; // $49-$149
      firms.tradeday.score += 3; // $99-$199
      firms.alpha.score += 2; // $79-$179
      firms.tradeify.score += 2;
      break;
      
    case "200_to_400":
      // Good budget - can access premium options
      firms.apex.score += 3;
      firms.earn2trade.score += 3;
      firms.tpt.score += 3;
      firms.mffu.score += 2;
      firms.elite.score += 2;
      break;
      
    case "400_plus":
      // High budget - can access any firm
      firms.apex.score += 3;
      firms.elite.score += 3;
      firms.earn2trade.score += 2;
      firms.tpt.score += 2;
      break;
  }

  // ----------------------------------------
  // Q3a: Payment Preference
  // "Would you rather pay monthly or a one-time fee?"
  // ----------------------------------------
  switch (answers.q3a_payment_preference) {
    case "monthly":
      // Prefers monthly subscription - most firms work
      firms.topstep.score += 2;
      firms.mffu.score += 2;
      firms.apex.score += 1;
      // One-time fee firms are less ideal for this preference
      firms.bulenox.score -= 1;
      firms.goat.score -= 1;
      break;
      
    case "one_time":
      // Prefers one-time payment - strongly boost one-time fee firms
      firms.bulenox.score += 5; // $85-$535 one-time
      firms.goat.score += 5; // $97-$277 one-time
      // Monthly firms still valid but less ideal
      firms.topstep.score -= 1;
      firms.mffu.score -= 1;
      break;
      
    case "no_preference":
      // No preference - no adjustment needed
      break;
  }

  // ----------------------------------------
  // Q4: Account Size Goal
  // "What funded account size are you targeting?"
  // ----------------------------------------
  switch (answers.q4_account_size) {
    case "25k_to_50k":
      // Starting small - most firms work
      firms.topstep.score += 2;
      firms.mffu.score += 2;
      firms.blusky.score += 2;
      firms.earn2trade.score += 2;
      break;
      
    case "50k_to_100k":
      // Standard range - all firms available
      firms.apex.score += 2;
      firms.mffu.score += 2;
      firms.topstep.score += 2;
      firms.tradeday.score += 2;
      firms.tpt.score += 2;
      break;
      
    case "100k_to_150k":
      // Larger accounts
      firms.apex.score += 3;
      firms.mffu.score += 3;
      firms.topstep.score += 2;
      firms.elite.score += 2;
      firms.tpt.score += 2;
      break;
      
    case "150k_plus":
      // Maximum capital or multiple accounts
      firms.apex.score += 4; // $300K accounts, 20 accounts
      firms.elite.score += 3; // $300K accounts
      firms.bulenox.score += 3; // $250K
      firms.earn2trade.score += 3; // Scales to $400K
      // Firms with lower caps deprioritized
      firms.tpt.score -= 1; // Caps at $150K
      break;
  }

  // ----------------------------------------
  // Q5: Trading Style - Timeframe
  // "How would you describe your typical trade duration?"
  // ----------------------------------------
  switch (answers.q5_timeframe) {
    case "scalping":
      // Scalpers need no daily loss limits, fast execution
      firms.apex.score += 3; // No daily loss limit
      firms.tpt.score += 3; // No daily loss limit
      firms.mffu.score += 2;
      firms.tradeday.score += 2;
      break;
      
    case "day_trading":
      // Day traders - most firms work, close by end of day
      firms.apex.score += 2;
      firms.topstep.score += 2;
      firms.mffu.score += 2;
      firms.tpt.score += 2;
      firms.tradeday.score += 2;
      firms.blusky.score += 2;
      break;
      
    case "swing_trading":
      // Swing traders need overnight holding - Elite Diamond Hands is the only option
      // NOTE: We strongly boost Elite but don't auto-eliminate others here.
      // If overnight is truly a dealbreaker, user should select it in Q10.
      // This allows flexibility for swing traders who are willing to adapt.
      firms.elite.score += 5; // Strong boost - only firm allowing overnight
      
      // Deprioritize but don't eliminate - user might be flexible
      Object.keys(firms).forEach(key => {
        if (key !== "elite") {
          firms[key].score -= 2;
        }
      });
      break;
      
    case "mixed":
      // Mixed style - need flexible rules
      firms.apex.score += 2;
      firms.mffu.score += 2;
      firms.tpt.score += 2;
      firms.elite.score += 2; // Has Diamond Hands option
      break;
  }

  // ----------------------------------------
  // Q6: Biggest Concern About Rules
  // "What's your biggest concern about prop firm rules?"
  // ----------------------------------------
  switch (answers.q6_concern) {
    case "drawdown_limits":
      // Need room to breathe - prefer EOD trailing or static
      firms.mffu.score += 4; // EOD trailing
      firms.earn2trade.score += 4; // EOD trailing
      firms.blusky.score += 3; // Static option available
      firms.topstep.score += 2; // EOD in eval
      // Firms with tight intraday rules deprioritized
      firms.tpt.score -= 2; // Intraday in funded
      break;
      
    case "consistency_rules":
      // Big win days followed by smaller days - hate consistency rules
      firms.tpt.score += 4; // No consistency in funded
      firms.mffu.score += 3; // Removed in funded (Expert)
      firms.elite.score += 3;
      firms.earn2trade.score += 2; // No consistency rule
      firms.bulenox.score += 2;
      // Firms with strict consistency rules deprioritized
      firms.apex.score -= 3; // 30% rule
      firms.topstep.score -= 3; // 50% rule
      firms.blusky.score -= 2; // 30% rule
      firms.tradeday.score -= 2; // 30% rule
      break;
      
    case "overnight_restrictions":
      // DEALBREAKER - needs overnight holding
      Object.keys(firms).forEach(key => {
        if (key !== "elite") {
          firms[key].eliminated = true;
          firms[key].eliminationReason = "Does not allow overnight holding";
        }
      });
      firms.elite.score += 5;
      break;
      
    case "time_pressure":
      // Needs unlimited time to pass
      // Good news: Most firms have unlimited time now
      firms.topstep.score += 2;
      firms.mffu.score += 2;
      firms.apex.score += 2;
      firms.earn2trade.score += 2;
      // Goat has no eval so time isn't relevant
      firms.goat.score += 1;
      break;
      
    case "payout_restrictions":
      // Wants money fast, no hoops
      firms.mffu.score += 4; // 32-min avg payout
      firms.blusky.score += 4; // Same-day processing
      firms.tpt.score += 4; // Day-one withdrawals
      // Firms with slower/complex payouts deprioritized
      firms.earn2trade.score -= 2; // Weekly Wednesdays only
      firms.elite.score -= 2; // Complex payout rules
      break;
      
    case "not_sure":
      // No specific concern - no adjustments
      break;
  }

  // ----------------------------------------
  // Q7: Risk Tolerance
  // "How would you describe your drawdown tolerance during a trading day?"
  // ----------------------------------------
  switch (answers.q7_risk) {
    case "conservative":
      // Cuts losses quickly, rarely down more than 1-2%
      // All firms work, but those with tighter rules are fine
      firms.topstep.score += 2;
      firms.earn2trade.score += 2;
      firms.tradeday.score += 2;
      firms.mffu.score += 2;
      break;
      
    case "moderate":
      // Sometimes down 3-4% before recovering - needs EOD drawdown
      firms.mffu.score += 3; // EOD trailing
      firms.earn2trade.score += 3; // EOD trailing
      firms.topstep.score += 2; // EOD in eval
      firms.apex.score += 2;
      // Intraday drawdown firms less ideal
      firms.tpt.score -= 1;
      break;
      
    case "aggressive":
      // Comfortable with larger swings - needs room
      firms.apex.score += 3; // No daily loss limit
      firms.tpt.score += 3; // No daily loss limit
      firms.elite.score += 2;
      firms.blusky.score += 2; // Static drawdown option
      // Conservative firms less ideal
      firms.earn2trade.score -= 1;
      break;
      
    case "depends":
      // Situational - flexible firms preferred
      firms.apex.score += 2;
      firms.mffu.score += 2;
      firms.blusky.score += 2; // Can choose drawdown type
      break;
  }

  // ----------------------------------------
  // Q8: Payout Priority
  // "How important is fast access to your profits?"
  // ----------------------------------------
  switch (answers.q8_payout_priority) {
    case "critical":
      // Needs money out ASAP
      firms.mffu.score += 4; // 32-min avg
      firms.blusky.score += 4; // Same-day
      firms.tpt.score += 4; // Daily
      firms.topstep.score += 2; // Daily after 30 days
      // Slower firms deprioritized
      firms.earn2trade.score -= 2;
      firms.elite.score -= 1;
      break;
      
    case "important":
      // Weekly or bi-weekly is fine
      firms.apex.score += 2;
      firms.mffu.score += 2;
      firms.blusky.score += 2;
      firms.tradeday.score += 2;
      break;
      
    case "flexible":
      // Monthly acceptable
      // All firms work, no adjustment needed
      break;
      
    case "other_factors":
      // Cares more about other things
      // No adjustment
      break;
  }

  // ----------------------------------------
  // Q9: Support & Education
  // "How much hand-holding do you want from your prop firm?"
  // ----------------------------------------
  switch (answers.q9_support) {
    case "none":
      // Just give capital, get out of the way
      firms.apex.score += 3;
      firms.tpt.score += 3;
      firms.bulenox.score += 2;
      firms.goat.score += 2;
      break;
      
    case "minimal":
      // Discord community, basic resources
      firms.mffu.score += 2;
      firms.apex.score += 2;
      firms.blusky.score += 2;
      firms.tradeday.score += 2;
      break;
      
    case "moderate":
      // Coaching, webinars, structured support
      firms.topstep.score += 4; // TopstepTV, coaching
      firms.earn2trade.score += 3; // Education focus
      firms.blusky.score += 3; // Free 1-on-1 coaching
      break;
      
    case "significant":
      // Wants mentorship and active help
      firms.topstep.score += 5;
      firms.earn2trade.score += 5;
      firms.blusky.score += 3;
      // Hands-off firms deprioritized
      firms.apex.score -= 1;
      firms.tpt.score -= 1;
      firms.bulenox.score -= 1;
      break;
  }

  // ----------------------------------------
  // Q10: Dealbreakers (Multi-Select)
  // "Which of these would be an absolute dealbreaker for you?"
  // ----------------------------------------
  const dealbreakers = answers.q10_dealbreakers || [];
  
  if (dealbreakers.includes("monthly_fees")) {
    // Prefers one-time payment
    firms.bulenox.score += 4;
    firms.goat.score += 4;
    // Eliminate monthly fee firms
    firms.topstep.eliminated = true;
    firms.topstep.eliminationReason = "Has monthly recurring fees ($49-$149/mo)";
    firms.mffu.eliminated = true;
    firms.mffu.eliminationReason = "Has monthly recurring fees ($77-$247/mo)";
    firms.apex.eliminated = true;
    firms.apex.eliminationReason = "Has monthly recurring fees ($147-$657/mo)";
    firms.tradeday.eliminated = true;
    firms.tradeday.eliminationReason = "Has monthly recurring fees ($99-$199/mo)";
    firms.tpt.eliminated = true;
    firms.tpt.eliminationReason = "Has monthly recurring fees ($150-$360/mo)";
    firms.earn2trade.eliminated = true;
    firms.earn2trade.eliminationReason = "Has monthly recurring fees ($150-$350/mo)";
    firms.blusky.eliminated = true;
    firms.blusky.eliminationReason = "Has monthly recurring fees ($49-$199/mo)";
    firms.alpha.eliminated = true;
    firms.alpha.eliminationReason = "Has monthly recurring fees ($79-$179/mo)";
    firms.tradeify.eliminated = true;
    firms.tradeify.eliminationReason = "Has monthly recurring fees ($65-$185/mo)";
  }
  
  if (dealbreakers.includes("consistency_rules")) {
    // Can't stand consistency rules
    firms.apex.eliminated = true;
    firms.apex.eliminationReason = "Has 30% consistency rule";
    firms.topstep.eliminated = true;
    firms.topstep.eliminationReason = "Has 50% consistency rule";
    firms.blusky.eliminated = true;
    firms.blusky.eliminationReason = "Has 30% consistency rule";
    firms.tradeday.eliminated = true;
    firms.tradeday.eliminationReason = "Has 30% consistency rule";
    firms.alpha.eliminated = true;
    firms.alpha.eliminationReason = "Has 50% consistency rule";
    firms.tradeify.eliminated = true;
    firms.tradeify.eliminationReason = "Has 30% consistency rule";
    // Boost firms without consistency rules in funded
    firms.tpt.score += 3;
    firms.mffu.score += 2;
    firms.earn2trade.score += 2;
  }
  
  if (dealbreakers.includes("overnight_restrictions")) {
    // Must be able to hold overnight
    Object.keys(firms).forEach(key => {
      if (key !== "elite") {
        firms[key].eliminated = true;
        firms[key].eliminationReason = "Does not allow overnight/weekend holding";
      }
    });
    firms.elite.score += 5;
  }
  
  if (dealbreakers.includes("intraday_drawdown")) {
    // Can't handle intraday trailing drawdown
    firms.tpt.eliminated = true;
    firms.tpt.eliminationReason = "Uses intraday trailing drawdown in funded account";
    // Boost EOD firms
    firms.mffu.score += 3;
    firms.earn2trade.score += 3;
    firms.topstep.score += 2;
    firms.blusky.score += 2;
  }
  
  if (dealbreakers.includes("activation_fees")) {
    // Hates activation fees after passing
    firms.topstep.eliminated = true;
    firms.topstep.eliminationReason = "Has $149 activation fee after passing";
    firms.tpt.eliminated = true;
    firms.tpt.eliminationReason = "Has $130 activation fee after passing";
    firms.elite.eliminated = true;
    firms.elite.eliminationReason = "Has $150-$300 activation fee + $80/mo ongoing";
    firms.goat.eliminated = true;
    firms.goat.eliminationReason = "Has $150-$350 activation fee";
    firms.earn2trade.eliminated = true;
    firms.earn2trade.eliminationReason = "Has $139 activation fee (deducted from first payout)";
    // Boost no-activation-fee firms
    firms.mffu.score += 4;
    firms.blusky.score += 3;
    firms.apex.score += 2;
    firms.tradeday.score += 2;
  }
  
  if (dealbreakers.includes("limited_platforms")) {
    // Needs specific platform support
    // Most firms support major platforms, but Topstep is now TopstepX only
    firms.topstep.score -= 2; // Limited to TopstepX
    // Boost firms with wide platform support
    firms.elite.score += 2; // 31+ platforms
    firms.tpt.score += 2; // 15+ platforms
    firms.apex.score += 1;
    firms.mffu.score += 1;
  }

  // ----------------------------------------
  // CALCULATE FINAL RESULTS
  // ----------------------------------------
  
  // Separate eliminated and valid firms
  const validFirms = Object.entries(firms)
    .map(([key, firm]) => ({ key, ...firm }))
    .filter(firm => !firm.eliminated)
    .sort((a, b) => {
      // Sort by score, then by Trustpilot rating as tiebreaker
      if (b.score !== a.score) return b.score - a.score;
      return b.trustpilot - a.trustpilot;
    });

  const eliminatedFirms = Object.entries(firms)
    .map(([key, firm]) => ({ key, ...firm }))
    .filter(firm => firm.eliminated);

  // Get top 3 recommendations
  const recommended = validFirms.slice(0, 3);
  
  // Calculate match strength for top pick
  // Max realistic score: Q1(4) + Q2(4) + Q3(4) + Q4(4) + Q5(3) + Q6(4) + Q7(3) + Q8(4) + Q9(5) + Q10 bonuses(5) = ~40
  const maxPossibleScore = 40;
  const matchStrength = recommended.length > 0 
    ? Math.min(Math.round((recommended[0].score / maxPossibleScore) * 100), 95)
    : 0;

  return {
    recommended,
    eliminated: eliminatedFirms,
    allFirms: validFirms,
    matchStrength,
    totalFirmsEvaluated: 12,
    firmsEliminated: eliminatedFirms.length,
  };
}


// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Generate personalized "why this fits" text based on answers
 */
function generateMatchReason(firmKey, answers) {
  const reasons = [];
  
  // Budget match
  if (answers.q3_budget === "under_100" && ["topstep", "blusky", "tradeify"].includes(firmKey)) {
    reasons.push("Fits your budget at under $100/month");
  }
  
  // Experience match
  if (answers.q1_experience === "less_than_6mo" && ["topstep", "earn2trade"].includes(firmKey)) {
    reasons.push("Strong education and coaching for newer traders");
  }
  
  // Payout priority match
  if (answers.q8_payout_priority === "critical") {
    if (firmKey === "mffu") reasons.push("Fastest payouts in the industry (32-min average)");
    if (firmKey === "blusky") reasons.push("Same-day payout processing");
    if (firmKey === "tpt") reasons.push("Day-one withdrawal capability");
  }
  
  // Consistency rule concern
  if (answers.q6_concern === "consistency_rules") {
    if (firmKey === "tpt") reasons.push("No consistency rule in funded account");
    if (firmKey === "mffu") reasons.push("Consistency rule removed after evaluation");
  }
  
  // Drawdown concern
  if (answers.q6_concern === "drawdown_limits") {
    if (["mffu", "earn2trade", "topstep"].includes(firmKey)) {
      reasons.push("End-of-day drawdown calculation gives you room to recover");
    }
  }
  
  // Support preference
  if (answers.q9_support === "significant" && ["topstep", "earn2trade"].includes(firmKey)) {
    reasons.push("Extensive coaching and educational resources");
  }
  
  // Multiple accounts
  if (answers.q2_situation === "currently_funded" && firmKey === "apex") {
    reasons.push("Run up to 20 accounts simultaneously");
  }
  
  // Scale preference
  if (answers.q4_account_size === "150k_plus") {
    if (firmKey === "apex") reasons.push("Accounts up to $300K with scaling to 20 accounts");
    if (firmKey === "earn2trade") reasons.push("Career path scales up to $400K");
  }
  
  return reasons.length > 0 ? reasons : ["Strong overall match based on your trading profile"];
}

/**
 * Generate warning for a firm based on answers
 */
function generateWarning(firmKey, answers) {
  const warnings = {
    apex: "Has a 30% consistency rule — your biggest day can't exceed 30% of total profits",
    topstep: "50% consistency rule and now requires TopstepX platform",
    mffu: "Monthly recurring fees continue until you pass",
    tpt: "Intraday trailing drawdown in funded account is strict",
    earn2trade: "Payouts only processed on Wednesdays",
    elite: "Complex payout rules and $80/month fee after funding",
    blusky: "30% consistency rule applies in evaluation and BluLive",
    bulenox: "40% consistency rule",
    goat: "No evaluation means no practice period — you're live immediately",
    tradeday: "30% consistency rule",
    alpha: "50% consistency rule, newer firm with less track record",
    tradeify: "30% consistency rule",
  };
  
  return warnings[firmKey] || "Review all rules carefully before starting";
}


// ============================================
// EXPORTS
// ============================================

export { 
  scoreQuiz, 
  generateMatchReason, 
  generateWarning,
  createFirmData 
};


// ============================================
// USAGE EXAMPLE
// ============================================

/*
import { scoreQuiz, generateMatchReason, generateWarning } from './scoring';

const userAnswers = {
  q1_experience: "1_to_3yr",
  q2_situation: "attempted_not_passed",
  q3_budget: "100_to_200",
  q3a_payment_preference: "no_preference", // NEW: "monthly", "one_time", or "no_preference"
  q4_account_size: "50k_to_100k",
  q5_timeframe: "day_trading",
  q6_concern: "consistency_rules",
  q7_risk: "moderate",
  q8_payout_priority: "important",
  q9_support: "minimal",
  q10_dealbreakers: ["activation_fees"],
};

const results = scoreQuiz(userAnswers);

console.log("Top 3 Recommendations:");
results.recommended.forEach((firm, index) => {
  console.log(`${index + 1}. ${firm.name} (Score: ${firm.score})`);
  console.log(`   Why: ${generateMatchReason(firm.key, userAnswers).join(", ")}`);
  console.log(`   Warning: ${generateWarning(firm.key, userAnswers)}`);
  console.log(`   Promo: ${firm.promoCode} - ${firm.promoDiscount}`);
});

console.log("\nFirms Eliminated:");
results.eliminated.forEach(firm => {
  console.log(`- ${firm.name}: ${firm.eliminationReason}`);
});
*/
