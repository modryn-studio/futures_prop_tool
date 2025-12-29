'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface QuizOptionProps {
  label: string
  description?: string
  selected: boolean
  onClick: () => void
  multiSelect?: boolean
  disabled?: boolean
}

export function QuizOption({
  label,
  description,
  selected,
  onClick,
  multiSelect = false,
  disabled = false,
}: QuizOptionProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'quiz-option w-full text-left flex items-center gap-4',
        selected && 'quiz-option-selected',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all',
          multiSelect ? 'rounded-md' : 'rounded-full',
          selected ? 'border-accent bg-accent' : 'border-border bg-background'
        )}
      >
        {selected && <Check className="w-4 h-4 text-background" strokeWidth={3} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-text-primary font-medium">{label}</p>
        {description && <p className="text-small text-text-secondary mt-0.5">{description}</p>}
      </div>
    </motion.button>
  )
}
