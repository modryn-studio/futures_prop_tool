import { NextRequest, NextResponse } from 'next/server'
import { addSubscriber } from '@/lib/mailerlite'

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

    // Add to Mailerlite with custom fields
    if (!process.env.MAILERLITE_API_KEY || !process.env.MAILERLITE_GROUP_ID) {
      console.error('Mailerlite API credentials not configured')
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
    const topFirmLink = topFirm?.affiliateLink || ''

    // Extract runner-ups for Email 1 and Email 5
    const firm2 = recommendedFirms?.[1]
    const firm2Name = firm2?.name || ''
    const firm2Link = firm2?.affiliateLink || ''
    const firm2Promo = firm2?.promoCode || ''

    const firm3 = recommendedFirms?.[2]
    const firm3Name = firm3?.name || ''
    const firm3Link = firm3?.affiliateLink || ''
    const firm3Promo = firm3?.promoCode || ''

    await addSubscriber({
      email,
      fields: {
        top_firm: topFirmName,
        top_firm_link: topFirmLink,
        promo_code: promoCode,
        discount: promoDiscount,
        firm_2: firm2Name,
        firm_2_link: firm2Link,
        firm_2_promo: firm2Promo,
        firm_3: firm3Name,
        firm_3_link: firm3Link,
        firm_3_promo: firm3Promo,
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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to process submission', details: errorMessage },
      { status: 500 }
    )
  }
}
