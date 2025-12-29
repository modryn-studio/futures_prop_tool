import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber } from '@/lib/kit'
import { saveQuizSubmission, QuizSubmission } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, answers, recommendedFirms, utmParams } = body

    if (!email || !answers) {
      return NextResponse.json(
        { error: 'Email and answers are required' },
        { status: 400 }
      )
    }

    // Save to Supabase (non-blocking for email capture)
    const submission: QuizSubmission = {
      email,
      answers,
      recommended_firms: recommendedFirms || [],
      utm_source: utmParams?.utm_source,
      utm_medium: utmParams?.utm_medium,
      utm_campaign: utmParams?.utm_campaign,
    }

    // Try to save to Supabase, but don't fail if it's not configured
    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await saveQuizSubmission(submission)
      }
    } catch (dbError) {
      console.error('Supabase save failed:', dbError)
      // Continue - email is more important
    }

    // Add to Kit (ConvertKit)
    try {
      if (process.env.KIT_API_SECRET && process.env.NEXT_PUBLIC_KIT_FORM_ID) {
        await addSubscriber({
          email,
          fields: {
            top_firm: recommendedFirms?.[0] || '',
            experience_level: answers.q1_experience || '',
            budget: answers.q3_budget || '',
            trading_style: answers.q5_timeframe || '',
          },
        })
      }
    } catch (kitError) {
      console.error('Kit subscription failed:', kitError)
      // Continue - we still have the email
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit quiz error:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
