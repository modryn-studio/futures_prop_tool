'use client'

import { motion } from 'framer-motion'
import { FirmWithKey, QuizAnswers, generateMatchReason, generateWarning } from '@/lib/scoring'
import { Button } from '@/components/ui'
import { 
  Star, 
  ExternalLink, 
  AlertTriangle, 
  CheckCircle, 
  Trophy, 
  Clock,
  Percent,
  Zap,
  Copy,
  Check,
  Mail,
  Shield
} from 'lucide-react'
import { useState, useEffect } from 'react'

interface FirmCardProps {
  firm: FirmWithKey
  rank: number
  answers: QuizAnswers
  isTopPick?: boolean
}

function FirmCard({ firm, rank, answers, isTopPick = false }: FirmCardProps) {
  const [copied, setCopied] = useState(false)
  const matchReasons = generateMatchReason(firm.key, answers)
  const warning = generateWarning(firm.key)

  const handleCopyPromo = () => {
    navigator.clipboard.writeText(firm.promoCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: rank * 0.15 }}
      className={`firm-card ${isTopPick ? 'ring-2 ring-accent shadow-glow' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {isTopPick && (
            <div className="bg-accent text-background px-3 py-1 rounded-full text-micro font-bold flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              #1 MATCH
            </div>
          )}
          {!isTopPick && (
            <div className="bg-background-elevated text-text-secondary px-3 py-1 rounded-full text-micro font-semibold">
              #{rank + 1}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 text-status-warning">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-small font-semibold">{firm.trustpilot}</span>
        </div>
      </div>

      {/* Firm Name */}
      <h3 className="text-title text-text-primary mb-2">{firm.name}</h3>
      
      {/* Key Strength */}
      <p className="text-body text-accent mb-4 flex items-center gap-2">
        <Zap className="w-4 h-4" />
        {firm.keyStrength}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-background-elevated rounded-lg p-3">
          <div className="flex items-center gap-2 text-text-muted text-micro mb-1">
            <Clock className="w-3 h-3" />
            Monthly Fee
          </div>
          <p className="text-small text-text-primary font-medium">{firm.monthlyFee}</p>
        </div>
        <div className="bg-background-elevated rounded-lg p-3">
          <div className="flex items-center gap-2 text-text-muted text-micro mb-1">
            <Percent className="w-3 h-3" />
            Profit Split
          </div>
          <p className="text-small text-text-primary font-medium">{firm.profitSplit}</p>
        </div>
      </div>

      {/* Why It Matches */}
      <div className="mb-4">
        <h4 className="text-small font-semibold text-text-secondary mb-2">Why this matches you:</h4>
        <ul className="space-y-1">
          {matchReasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-small text-text-primary">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Warning */}
      <div className="bg-status-warning/10 border border-status-warning/20 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 text-status-warning flex-shrink-0 mt-0.5" />
          <p className="text-small text-text-secondary">{warning}</p>
        </div>
      </div>

      {/* Promo Code */}
      <div className="bg-accent-muted rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-micro text-accent mb-1">Promo Code</p>
            <p className="text-title font-mono text-accent">{firm.promoCode}</p>
            <p className="text-micro text-text-secondary mt-1">{firm.promoDiscount}</p>
          </div>
          <button
            onClick={handleCopyPromo}
            className="p-2 bg-accent/20 rounded-lg hover:bg-accent/30 transition-colors"
          >
            {copied ? (
              <Check className="w-5 h-5 text-accent" />
            ) : (
              <Copy className="w-5 h-5 text-accent" />
            )}
          </button>
        </div>
      </div>

      {/* CTA */}
      <a
        href={firm.affiliateLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button variant="primary" className="w-full flex items-center justify-center gap-2">
          Start with {firm.name.split(' ')[0]}
          <ExternalLink className="w-4 h-4" />
        </Button>
      </a>
    </motion.div>
  )
}

interface ResultsProps {
  recommended: FirmWithKey[]
  eliminated: FirmWithKey[]
  matchStrength: number
  answers: QuizAnswers
}

// Count-up animation hook
function useCountUp(target: number, duration: number = 1500) {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])
  
  return count
}

export function Results({ recommended, eliminated, matchStrength, answers }: ResultsProps) {
  const animatedMatchStrength = useCountUp(matchStrength, 1200)
  
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-accent-muted text-accent px-4 py-2 rounded-full text-small font-medium mb-4">
            <CheckCircle className="w-4 h-4" />
            Analysis Complete
          </div>
          
          <h1 className="text-display text-text-primary mb-4">
            Your Top Prop Firm Matches
          </h1>
          
          <p className="text-body text-text-secondary max-w-xl mx-auto">
            Based on your answers, we've identified {recommended.length} firms that align with your 
            trading style, budget, and preferences.
          </p>

          {/* Match Strength with count-up animation */}
          <div className="mt-6 inline-flex items-center gap-3 bg-background-card border border-border rounded-full px-6 py-3">
            <span className="text-small text-text-secondary">Match Strength</span>
            <span className="text-title font-mono text-accent">{animatedMatchStrength}%</span>
          </div>
        </motion.div>

        {/* Recommended Firms */}
        <div className="space-y-6 mb-12">
          {recommended.map((firm, index) => (
            <FirmCard
              key={firm.key}
              firm={firm}
              rank={index}
              answers={answers}
              isTopPick={index === 0}
            />
          ))}
        </div>

        {/* Eliminated Firms Section */}
        {eliminated.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-title text-text-primary mb-4">
              Firms We Filtered Out ({eliminated.length})
            </h2>
            <p className="text-body text-text-secondary mb-6">
              These firms don't match your dealbreakers or preferences.
            </p>
            
            <div className="bg-background-card border border-border rounded-card p-4">
              <div className="space-y-3">
                {eliminated.map((firm) => (
                  <div
                    key={firm.key}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <span className="text-text-secondary">{firm.name}</span>
                    <span className="text-small text-status-error">
                      {firm.eliminationReason}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Trust Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-background-card border border-border rounded-card p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-accent" />
            <h3 className="text-subtitle text-text-primary">Why This Recommendation?</h3>
          </div>
          <p className="text-body text-text-secondary mb-4">
            Unlike other "best prop firm" sites, we don't rank based on who pays us the highest commission. 
            Our algorithm analyzed your specific trading style, budget, risk tolerance, and dealbreakers 
            to find the firms where you're most likely to succeed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-small text-text-muted">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>11 factors analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>12 firms compared</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span>Dealbreakers respected</span>
            </div>
          </div>
        </motion.div>

        {/* Check Your Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-8 bg-accent/5 border border-accent/20 rounded-card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="text-subtitle text-text-primary">Check Your Email</h3>
              <p className="text-small text-text-muted">We just sent you the good stuff</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-body text-text-secondary">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Detailed breakdown of your matches</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Week 1 strategy guide</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Promo code alerts when they drop</span>
            </div>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-16 text-center"
        >
          <p className="text-small text-text-muted mb-4">
            Not sure which to pick? Start with your #1 match — it's the best fit based on everything you told us.
          </p>
          <a
            href={recommended[0]?.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg" className="shadow-glow animate-pulse-glow">
              Get Started with {recommended[0]?.name}
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  )
}
