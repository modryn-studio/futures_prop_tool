'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send } from 'lucide-react'
import { Button, Input } from '@/components/ui'

interface FeedbackButtonProps {
  hideOnMobile?: boolean
}

export default function FeedbackButton({ hideOnMobile = false }: FeedbackButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!feedback.trim()) {
      setError('Please enter your feedback')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback, email: email || undefined }),
      })

      if (!response.ok) throw new Error('Failed to submit feedback')

      setSubmitted(true)
      setFeedback('')
      setEmail('')
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
      }, 3000)
    } catch (err) {
      setError('Failed to send. Try again?')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      {/* Side Tab - Desktop Only */}
      <motion.button
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
        onClick={() => setIsOpen(true)}
        className="hidden md:block fixed top-1/2 -translate-y-1/2 right-0 z-40 bg-background-elevated/80 backdrop-blur-sm border-l border-t border-b border-border text-text-secondary hover:text-text-primary hover:bg-background-elevated px-3 py-6 rounded-l-lg shadow-lg hover:px-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background group"
        aria-label="Send feedback"
        style={{ writingMode: 'vertical-rl' }}
      >
        <span className="text-small font-semibold tracking-wider flex items-center gap-2">
          <MessageSquare className="w-4 h-4 inline-block" style={{ writingMode: 'horizontal-tb' }} />
          FEEDBACK
        </span>
      </motion.button>

      {/* FAB - Mobile Only */}
      {!hideOnMobile && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed bottom-6 right-6 z-40 bg-background-elevated/90 backdrop-blur-sm border border-border text-text-secondary hover:text-text-primary hover:bg-background-elevated rounded-full p-4 shadow-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
          aria-label="Send feedback"
        >
          <MessageSquare className="w-5 h-5" />
        </motion.button>
      )}

      {/* Feedback Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-background-card border-l border-border shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-title text-text-primary">Send Feedback</h3>
                    <p className="text-small text-text-muted">Help improve this tool</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-text-muted hover:text-text-primary transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Success State */}
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-10 h-10 text-accent" />
                      </div>
                      <p className="text-body text-text-primary font-medium">Thanks for the feedback!</p>
                      <p className="text-small text-text-muted mt-2">Every bit helps.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-6">
                    {/* Feedback Textarea */}
                    <div className="flex-1">
                      <label htmlFor="feedback" className="text-small text-text-secondary block mb-2">
                        What's on your mind?
                      </label>
                      <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Bug? Feature idea? General thoughts?"
                        className="w-full h-48 bg-background-elevated border border-border rounded-lg px-4 py-3 text-body text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        disabled={isSubmitting}
                        autoFocus
                      />
                    </div>

                    {/* Email (Optional) */}
                    <div>
                      <label htmlFor="email" className="text-small text-text-secondary block mb-2">
                        Email (optional)
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                      <p className="text-micro text-text-muted mt-1">
                        Only if you want a reply
                      </p>
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="text-small text-status-error">{error}</p>
                    )}

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Feedback'}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
