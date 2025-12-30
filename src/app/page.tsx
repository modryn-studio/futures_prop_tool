'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button, Marquee } from '@/components/ui'
import { 
  ArrowRight, 
  CheckCircle,
  Star,
  TrendingUp,
  Zap
} from 'lucide-react'

const trustPoints = [
  '12 futures prop firms compared',
  'Updated December 2025',
  '11 questions, real recommendation',
]

const painPoints = [
  "Wasted money on firms with rules that don't match your style",
  'Failed evaluations because of hidden consistency rules',
  'Slow payouts and complex withdrawal processes',
  'Limited platform options for your trading setup',
]

const firmLogosRow1 = [
  'Apex Trader Funding', 'Topstep', 'MyFundedFutures', 'TradeDay', 'Bulenox', 'Earn2Trade'
]

const firmLogosRow2 = [
  'BluSky Trading', 'Take Profit Trader', 'Elite Trader Funding', 'Alpha Futures', 'Tradeify', 'Goat Funded Futures'
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent-muted text-accent px-4 py-2 rounded-full text-small font-medium mb-6">
              <Zap className="w-4 h-4" />
              Free Quiz — No Sign-Up Required to Start
            </div>

            {/* Headline */}
            <h1 className="text-display md:text-[4rem] text-text-primary mb-6 max-w-4xl mx-auto leading-tight">
              Tired of Paying{' '}
              <span className="text-accent">Reset Fees?</span>
            </h1>

            {/* Subhead */}
            <p className="text-body md:text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              This quiz matches you with a prop firm that fits your style — 
              so you stop failing evaluations and wasting money on resets.
            </p>

            {/* CTA */}
            <Link href="/quiz">
              <Button variant="primary" size="lg" className="shadow-glow group">
                Take the Quiz
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <p className="text-micro text-text-muted mt-4">
              Takes 2 minutes • 100% free • Personalized results
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-border bg-background-card/50">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {trustPoints.map((point, index) => (
              <motion.div
                key={point}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-accent" />
                <span className="text-text-secondary">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-headline text-text-primary mb-4">
              Picking the wrong prop firm is expensive
            </h2>
            <p className="text-body text-text-secondary">
              Most traders fail because they chose a firm with rules that don't match their style
            </p>
          </motion.div>

          <div className="space-y-4">
            {painPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3 bg-background-card border border-border rounded-card p-4"
              >
                <div className="w-6 h-6 rounded-full bg-status-error/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-status-error text-small">✕</span>
                </div>
                <p className="text-text-primary">{point}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-6 bg-accent-muted border border-accent/20 rounded-card"
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-accent flex-shrink-0" />
              <div>
                <p className="text-text-primary font-medium">
                  Our quiz eliminates the guesswork
                </p>
                <p className="text-small text-text-secondary mt-1">
                  We ask about your trading style, budget, dealbreakers, and preferences — 
                  then match you with firms that actually fit.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Firms We Analyze */}
      <section className="py-20 bg-background-card/30 border-y border-border">
        <div className="max-w-full mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-headline text-text-primary mb-4">
              We analyze every major futures prop firm
            </h2>
            <p className="text-body text-text-secondary">
              12 firms compared across rules, fees, payouts, and platforms
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* First row - scrolling left */}
            <Marquee speed={40} pauseOnHover className="py-2">
              {firmLogosRow1.map((firm) => (
                <div
                  key={firm}
                  className="bg-background-card border border-border rounded-lg px-8 py-4 text-text-secondary font-medium text-lg whitespace-nowrap"
                >
                  {firm}
                </div>
              ))}
            </Marquee>

            {/* Second row - scrolling right */}
            <Marquee speed={40} pauseOnHover reverse className="py-2">
              {firmLogosRow2.map((firm) => (
                <div
                  key={firm}
                  className="bg-background-card border border-border rounded-lg px-8 py-4 text-text-secondary font-medium text-lg whitespace-nowrap"
                >
                  {firm}
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      {/* <section className="py-20">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-headline text-text-primary mb-4">
              What traders are saying
            </h2>
          </motion.div>

          <div className="grid gap-6">
            {[
              {
                quote: "Finally understood why I kept failing at Topstep — the consistency rule was killing me. Quiz matched me with MFFU and passed in 2 weeks.",
                author: "Mike R.",
                role: "ES Scalper",
              },
              {
                quote: "Saved me from signing up for a firm that didn't allow overnight holding. The quiz caught that before I wasted $200.",
                author: "Sarah T.",
                role: "NQ Swing Trader",
              },
              {
                quote: "The promo codes alone saved me $100 on my Apex account. Plus I actually got matched with the right firm this time.",
                author: "James K.",
                role: "CL Day Trader",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background-card border border-border rounded-card p-6"
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-status-warning fill-current" />
                  ))}
                </div>
                <p className="text-text-primary mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="text-text-primary font-medium">{testimonial.author}</p>
                  <p className="text-small text-text-muted">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-accent/5 via-transparent to-transparent">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <TrendingUp className="w-12 h-12 text-accent mx-auto mb-6" />
            
            <h2 className="text-headline text-text-primary mb-4">
              Ready to find your perfect prop firm?
            </h2>
            
            <p className="text-body text-text-secondary mb-8">
              11 questions. 2 minutes. Your personalized recommendations are waiting.
            </p>

            <Link href="/quiz">
              <Button variant="primary" size="lg" className="shadow-glow animate-pulse-glow">
                Start the Quiz Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-small text-text-muted">
              © 2025 Futures Prop Tool. All rights reserved.
            </p>
            <p className="text-micro text-text-muted">
              Affiliate disclosure: We may earn a commission from partner firms at no extra cost to you.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
