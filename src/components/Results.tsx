'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
  Shield,
  Bell
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
  onEmailSubmit?: (email: string) => Promise<boolean>
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

export function Results({ recommended, eliminated, matchStrength, answers, onEmailSubmit }: ResultsProps) {
  const animatedMatchStrength = useCountUp(matchStrength, 1200)
  const [email, setEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [showModal, setShowModal] = useState(true)
  const topFirmName = recommended[0]?.name || 'your top match'

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !onEmailSubmit) return
    
    setEmailStatus('loading')
    const success = await onEmailSubmit(email)
    setEmailStatus(success ? 'success' : 'error')
    if (success) {
      setTimeout(() => setShowModal(false), 1500)
    }
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }
  
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      {/* Email Capture Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-background-card border border-border rounded-card p-8 max-w-md w-full shadow-2xl"
            >
              {/* Close button - small and subtle */}
              <button
                onClick={handleCloseModal}
                className="absolute top-3 right-3 p-1 text-text-muted hover:text-text-secondary transition-colors"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {emailStatus === 'success' ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-title text-text-primary mb-2">You're in!</h3>
                  <p className="text-body text-text-secondary">Loading your results...</p>
                </div>
              ) : (
                <>
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-7 h-7 text-accent" />
                  </div>

                  {/* Heading */}
                  <h2 className="text-title text-text-primary text-center mb-2">
                    Your results are ready!
                  </h2>
                  
                  <p className="text-body text-text-secondary text-center mb-6">
                    We found <span className="text-accent font-semibold">{recommended.length} firms</span> that match your trading style
                  </p>

                  {/* Benefits */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-small text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Email copy of your results + promo codes</span>
                    </div>
                    <div className="flex items-center gap-3 text-small text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>5-email guide: How to pass evaluations</span>
                    </div>
                    <div className="flex items-center gap-3 text-small text-text-secondary">
                      <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Follow-ups if you get stuck</span>
                    </div>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      variant="primary"
                      className="w-full"
                      disabled={emailStatus === 'loading'}
                    >
                      {emailStatus === 'loading' ? 'Sending...' : 'Send My Results'}
                    </Button>
                  </form>

                  {emailStatus === 'error' && (
                    <p className="text-small text-status-error text-center mt-2">Something went wrong. Try again?</p>
                  )}

                  <p className="text-micro text-text-muted text-center mt-4">
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
              <span>9 factors analyzed</span>
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

        {/* Optional Email - Deal Alerts (only if modal closed without submitting) */}
        {!showModal && emailStatus !== 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-8 bg-accent/5 border border-accent/20 rounded-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Bell className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="text-subtitle text-text-primary">Want these results emailed to you?</h3>
                <p className="text-small text-text-muted">Plus a 5-email guide to pass your evaluation</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-body text-text-secondary mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Email copy with promo codes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span>5-day evaluation guide</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                <span>Tips to pass your challenge</span>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent"
                required
              />
              <Button 
                type="submit" 
                variant="primary"
                disabled={emailStatus === 'loading'}
                className="whitespace-nowrap"
              >
                {emailStatus === 'loading' ? 'Sending...' : 'Send My Results'}
              </Button>
            </form>
            
            {emailStatus === 'error' && (
              <p className="text-small text-status-error mt-2">Something went wrong. Try again?</p>
            )}
            
            <p className="text-micro text-text-muted mt-3">No spam. Unsubscribe anytime.</p>
          </motion.div>
        )}

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
