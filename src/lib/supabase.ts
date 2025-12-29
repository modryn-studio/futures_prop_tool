import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Lazy initialize to avoid build-time errors when env vars aren't set
let _supabase: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey)
  }
  return _supabase
}

export interface QuizSubmission {
  id?: string
  email: string
  answers: QuizAnswers
  recommended_firms: string[]
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  created_at?: string
}

export interface QuizAnswers {
  q1_experience: string
  q2_situation: string
  q3_budget: string
  q3a_payment_preference: string
  q4_account_size: string
  q5_timeframe: string
  q6_concern: string
  q7_risk: string
  q8_payout_priority: string
  q9_support: string
  q10_dealbreakers: string[]
}

export async function saveQuizSubmission(submission: QuizSubmission) {
  const supabase = getSupabase()
  if (!supabase) {
    console.warn('Supabase not configured, skipping save')
    return null
  }

  const { data, error } = await supabase
    .from('quiz_submissions')
    .insert([submission])
    .select()

  if (error) {
    console.error('Error saving quiz submission:', error)
    throw error
  }

  return data
}
