'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions, totalQuestions } from '@/lib/quiz-data'
import { QuizAnswers } from '@/lib/scoring'
import { ProgressBar, QuizOption, Button } from '@/components/ui'
import { ChevronLeft, HelpCircle } from 'lucide-react'

interface QuizProps {
  onComplete: (answers: QuizAnswers) => void
}

export function Quiz({ onComplete }: QuizProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [showWhyWeAsk, setShowWhyWeAsk] = useState(false)
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = back

  const currentQuestion = quizQuestions[currentStep]
  const isLastQuestion = currentStep === totalQuestions - 1
  const isFirstQuestion = currentStep === 0

  const handleSelect = useCallback(
    (value: string) => {
      if (currentQuestion.multiSelect) {
        const currentSelection = (answers[currentQuestion.id] as string[]) || []
        
        // Handle "none" selection
        if (value === 'none') {
          setAnswers((prev) => ({ ...prev, [currentQuestion.id]: ['none'] }))
          return
        }
        
        // If selecting something else, remove "none"
        const filtered = currentSelection.filter((v) => v !== 'none')
        
        if (currentSelection.includes(value)) {
          setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: filtered.filter((v) => v !== value),
          }))
        } else {
          setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: [...filtered, value],
          }))
        }
      } else {
        setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
        
        // Auto-advance for single select
        if (!isLastQuestion) {
          setTimeout(() => {
            setDirection(1)
            setCurrentStep((prev) => prev + 1)
          }, 300)
        }
      }
    },
    [currentQuestion, answers, isLastQuestion]
  )

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      onComplete(answers as unknown as QuizAnswers)
    } else {
      setDirection(1)
      setCurrentStep((prev) => prev + 1)
    }
  }, [isLastQuestion, answers, onComplete])

  const handleBack = useCallback(() => {
    if (!isFirstQuestion) {
      setDirection(-1)
      setCurrentStep((prev) => prev - 1)
    }
  }, [isFirstQuestion])

  const isCurrentAnswered = currentQuestion.multiSelect
    ? ((answers[currentQuestion.id] as string[]) || []).length > 0
    : !!answers[currentQuestion.id]

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 100 : -100, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 100 : -100, opacity: 0 }),
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <ProgressBar current={currentStep + 1} total={totalQuestions} />
        </div>
      </header>

      {/* Question Area */}
      <main className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full px-4 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="space-y-6"
          >
            {/* Question Text */}
            <div className="space-y-2">
              <h2 className="text-headline text-text-primary">{currentQuestion.question}</h2>
              {currentQuestion.subtext && (
                <p className="text-body text-text-secondary">{currentQuestion.subtext}</p>
              )}
              
              {/* Why We Ask Toggle */}
              {currentQuestion.whyWeAsk && (
                <button
                  type="button"
                  onClick={() => setShowWhyWeAsk(!showWhyWeAsk)}
                  className="flex items-center gap-2 text-small text-accent hover:text-accent-hover transition-colors mt-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  {showWhyWeAsk ? 'Hide' : 'Why we ask'}
                </button>
              )}
              
              <AnimatePresence>
                {showWhyWeAsk && currentQuestion.whyWeAsk && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-small text-text-muted bg-background-elevated p-3 rounded-lg mt-2">
                      {currentQuestion.whyWeAsk}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = currentQuestion.multiSelect
                  ? ((answers[currentQuestion.id] as string[]) || []).includes(option.value)
                  : answers[currentQuestion.id] === option.value

                return (
                  <QuizOption
                    key={option.value}
                    label={option.label}
                    description={option.description}
                    selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    multiSelect={currentQuestion.multiSelect}
                  />
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Navigation */}
      <footer className="border-t border-border bg-background-card/50 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isFirstQuestion}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          {currentQuestion.multiSelect && (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isCurrentAnswered}
            >
              {isLastQuestion ? 'See My Results' : 'Continue'}
            </Button>
          )}

          {!currentQuestion.multiSelect && isCurrentAnswered && isLastQuestion && (
            <Button variant="primary" onClick={handleNext}>
              See My Results
            </Button>
          )}
        </div>
      </footer>
    </div>
  )
}
