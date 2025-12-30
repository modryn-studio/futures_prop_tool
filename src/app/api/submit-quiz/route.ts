import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber } from '@/lib/kit'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, answers, recommendedFirms, utmParams, submissionType } = body

    if (!email || !answers) {
      return NextResponse.json(
        { error: 'Email and answers are required' },
        { status: 400 }
      )
    }

    // Add to Kit (ConvertKit) with custom fields
    if (!process.env.KIT_API_SECRET || !process.env.NEXT_PUBLIC_KIT_FORM_ID) {
      console.error('Kit API credentials not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Extract top firm details for personalization
    const topFirm = recommendedFirms?.[0]
    const topFirmName = topFirm?.name || ''
    const promoCode = topFirm?.promoCode || ''
    const promoDiscount = topFirm?.promoDiscount || ''

    await addSubscriber({
      email,
      fields: {
        top_firm: topFirmName,
        promo_code: promoCode,
        discount: promoDiscount,
        experience_level: answers.q1_experience || '',
        budget: answers.q3_budget || '',
        trading_style: answers.q5_timeframe || '',
        submission_type: submissionType || 'unknown',
        utm_source: utmParams?.utm_source || '',
        utm_medium: utmParams?.utm_medium || '',
        utm_campaign: utmParams?.utm_campaign || '',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Submit quiz error:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}
