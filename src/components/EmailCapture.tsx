'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button, Input } from '@/components/ui'
import { Lock, Mail, ArrowRight, CheckCircle, Gift, Zap } from 'lucide-react'

interface EmailCaptureProps {
  onSubmit: (email: string) => void
  loading?: boolean
}

export function EmailCapture({ onSubmit, loading = false }: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setError('Email is required')
      return
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email')
      return
    }
    
    setError('')
    onSubmit(email)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        {/* Blurred Preview */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="bg-background-card/95 backdrop-blur-sm border border-border rounded-card p-6 text-center max-w-sm">
              <Lock className="w-8 h-8 text-accent mx-auto mb-4" />
              <h3 className="text-title text-text-primary mb-2">Your results are ready</h3>
              <p className="text-small text-text-secondary mb-4">
                We found <span className="text-accent font-semibold">3 firms</span> that match your trading style
              </p>
              
              {/* What you'll get */}
              <div className="text-left space-y-2 mb-4">
                <div className="flex items-center gap-2 text-small text-text-secondary">
                  <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Your top 3 prop firm matches</span>
                </div>
                <div className="flex items-center gap-2 text-small text-text-secondary">
                  <Gift className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Exclusive promo codes (up to 80% off)</span>
                </div>
                <div className="flex items-center gap-2 text-small text-text-secondary">
                  <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Personalized "why this fits" breakdown</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blurred fake results */}
          <div className="blur-sm opacity-40 pointer-events-none">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background-card border border-border rounded-card p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-background-elevated rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-background-elevated rounded w-32 mb-2" />
                      <div className="h-3 bg-background-elevated rounded w-48" />
                    </div>
                    <div className="h-8 bg-accent/20 rounded w-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12"
                disabled={loading}
              />
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-small text-status-error mt-2"
              >
                {error}
              </motion.p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Processing...
              </span>
            ) : (
              <>
                Unlock My Results
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-micro text-text-muted">
            <Lock className="w-3 h-3" />
            <span>Your data stays private. Unsubscribe anytime.</span>
          </div>
          <p className="text-micro text-text-muted">
            We'll also send you prop firm deal alerts (optional).
          </p>
        </div>
      </motion.div>
    </div>
  )
}
