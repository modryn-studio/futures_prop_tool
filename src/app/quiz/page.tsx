'use client'

import { useState } from 'react'
import { Quiz } from '@/components/Quiz'
import { EmailCapture } from '@/components/EmailCapture'
import { Results } from '@/components/Results'
import { scoreQuiz, QuizAnswers, QuizResults } from '@/lib/scoring'

type QuizStep = 'quiz' | 'email' | 'results'

export default function QuizPage() {
  const [step, setStep] = useState<QuizStep>('quiz')
  const [answers, setAnswers] = useState<QuizAnswers | null>(null)
  const [results, setResults] = useState<QuizResults | null>(null)
  const [loading, setLoading] = useState(false)

  const handleQuizComplete = (quizAnswers: QuizAnswers) => {
    setAnswers(quizAnswers)
    
    // Calculate results
    const quizResults = scoreQuiz(quizAnswers)
    setResults(quizResults)
    
    // Move to email capture
    setStep('email')
  }

  const handleEmailSubmit = async (email: string) => {
    if (!answers || !results) return

    setLoading(true)

    try {
      // Get UTM params from URL if present
      const urlParams = new URLSearchParams(window.location.search)
      const utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
      }

      // Submit to API
      await fetch('/api/submit-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          answers,
          recommendedFirms: results.recommended.map((f) => f.name),
          utmParams,
        }),
      })
    } catch (error) {
      console.error('Failed to submit:', error)
      // Still show results even if submission failed
    }

    setLoading(false)
    setStep('results')
  }

  if (step === 'quiz') {
    return <Quiz onComplete={handleQuizComplete} />
  }

  if (step === 'email') {
    return <EmailCapture onSubmit={handleEmailSubmit} loading={loading} />
  }

  if (step === 'results' && results && answers) {
    return (
      <Results
        recommended={results.recommended}
        eliminated={results.eliminated}
        matchStrength={results.matchStrength}
        answers={answers}
      />
    )
  }

  return null
}
