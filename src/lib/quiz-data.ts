export interface QuizQuestion {
  id: string
  question: string
  subtext?: string
  whyWeAsk?: string
  options: QuizOption[]
  multiSelect?: boolean
}

export interface QuizOption {
  value: string
  label: string
  description?: string
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1_experience',
    question: 'How long have you been actively trading futures?',
    subtext: 'Be honest — this helps us match rule complexity to your skill level.',
    options: [
      { value: 'less_than_6mo', label: 'Less than 6 months', description: 'Still learning the ropes' },
      { value: '6_to_12mo', label: '6-12 months', description: 'Getting consistent' },
      { value: '1_to_3yr', label: '1-3 years', description: 'Experienced trader' },
      { value: '3yr_plus', label: '3+ years', description: 'Trading veteran' },
    ],
  },
  {
    id: 'q2_situation',
    question: 'Have you attempted a prop firm evaluation before?',
    subtext: 'No judgment — most funded traders failed their first attempt.',
    options: [
      { value: 'first_time', label: "First time — let's go", description: 'Never tried before' },
      { value: 'attempted_not_passed', label: "Attempted, haven't passed yet", description: 'Still working on it' },
      { value: 'passed_didnt_work', label: "Passed, but it didn't work out", description: 'Looking for better fit' },
      { value: 'currently_funded', label: 'Currently funded, want more accounts', description: 'Scaling up' },
    ],
  },
  {
    id: 'q3_budget',
    question: "What's your monthly budget for prop firm challenge fees?",
    subtext: 'Most evaluations run $50-$350/month depending on account size.',
    options: [
      { value: 'under_100', label: 'Under $100/month', description: 'Keep it lean' },
      { value: '100_to_200', label: '$100-$200/month', description: 'Standard range' },
      { value: '200_to_400', label: '$200-$400/month', description: 'Investing in this' },
      { value: '400_plus', label: '$400+/month', description: 'All in' },
    ],
  },
  {
    id: 'q3a_payment_preference',
    question: 'Would you rather pay monthly or a one-time fee?',
    subtext: 'Some firms offer one-time payment options.',
    whyWeAsk: 'Firms like Bulenox and Lucid offer one-time evaluation fees instead of monthly subscriptions.',
    options: [
      { value: 'monthly', label: 'Monthly subscription', description: 'Spread out the cost' },
      { value: 'one_time', label: 'One-time payment', description: 'Pay once and done' },
      { value: 'no_preference', label: 'No preference', description: 'Either works for me' },
    ],
  },
  {
    id: 'q5_timeframe',
    question: 'How would you describe your typical trade duration?',
    subtext: 'This affects which rules you can work with.',
    options: [
      { value: 'scalping', label: 'Scalping', description: 'Seconds to minutes' },
      { value: 'day_trading', label: 'Day Trading', description: 'In and out same day' },
      { value: 'swing_trading', label: 'Swing Trading', description: 'Hold overnight/multi-day' },
      { value: 'mixed', label: 'Mixed', description: 'Depends on setup' },
    ],
  },
  {
    id: 'q6_concern',
    question: "What's your biggest concern about prop firm rules?",
    subtext: 'Every firm has rules. Which one would most likely cause you to fail?',
    whyWeAsk: "We'll prioritize firms that are lenient on your specific concern.",
    options: [
      { value: 'drawdown_limits', label: 'Drawdown limits', description: 'Need room to breathe during trades' },
      { value: 'consistency_rules', label: 'Consistency rules', description: 'Hate limits on winning days' },
      { value: 'overnight_restrictions', label: "Can't hold overnight", description: 'Need to swing trade' },
      { value: 'time_pressure', label: 'Time pressure', description: 'Want unlimited time to pass' },
      { value: 'payout_restrictions', label: 'Payout hoops', description: 'Want my money fast' },
      { value: 'not_sure', label: 'Not sure yet', description: 'Show me options' },
    ],
  },
  {
    id: 'q8_payout_priority',
    question: 'How important is fast access to your profits?',
    subtext: 'Payout speed varies from same-day to monthly across firms.',
    options: [
      { value: 'critical', label: 'Critical', description: 'Need money out ASAP' },
      { value: 'important', label: 'Important', description: 'Weekly is fine' },
      { value: 'flexible', label: 'Flexible', description: 'Monthly is acceptable' },
      { value: 'other_factors', label: 'Other factors matter more', description: 'Not my priority' },
    ],
  },
  {
    id: 'q9_support',
    question: 'How much hand-holding do you want from your prop firm?',
    subtext: 'Some firms offer extensive education, others just give you capital.',
    options: [
      { value: 'none', label: 'None', description: 'Just give me capital' },
      { value: 'minimal', label: 'Minimal', description: 'Discord community is enough' },
      { value: 'moderate', label: 'Moderate', description: 'Some coaching/webinars' },
      { value: 'significant', label: 'Significant', description: 'Want real mentorship' },
    ],
  },
  {
    id: 'q10_dealbreakers',
    question: 'Which of these would be an absolute dealbreaker for you?',
    subtext: 'Select all that apply — we\'ll eliminate firms that have these.',
    multiSelect: true,
    options: [
      { value: 'monthly_fees', label: 'Monthly recurring fees', description: 'Want one-time payment only' },
      { value: 'consistency_rules', label: 'Consistency rules', description: "Can't limit my best days" },
      { value: 'overnight_restrictions', label: 'No overnight holding', description: 'Need to swing trade' },
      { value: 'intraday_drawdown', label: 'Intraday trailing drawdown', description: 'Need EOD calculation' },
      { value: 'activation_fees', label: 'Activation fees after passing', description: 'Already paid enough' },
      { value: 'limited_platforms', label: 'Limited platform options', description: 'Need my preferred platform' },
      { value: 'none', label: 'None of the above', description: "I'm flexible" },
    ],
  },
]

export const totalQuestions = quizQuestions.length
