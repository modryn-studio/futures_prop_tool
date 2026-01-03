import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { feedback, email } = await request.json()

    if (!feedback || typeof feedback !== 'string') {
      return NextResponse.json(
        { error: 'Feedback is required' },
        { status: 400 }
      )
    }

    const apiKey = process.env.MAILERLITE_API_KEY
    
    if (!apiKey) {
      console.error('MAILERLITE_API_KEY not configured')
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const feedbackGroupId = process.env.MAILERLITE_FEEDBACK_GROUP_ID
    
    // Create subscriber data
    const subscriberData: any = {
      email: email || `feedback-${Date.now()}@futuresproptool.com`,
      fields: {
        // Store under both spellings to match existing Mailerlite field typo
        feedback_message: feedback,
        feeback_message: feedback,
        feedback_date: new Date().toISOString(),
        has_email: email ? 'yes' : 'no',
      },
      groups: feedbackGroupId ? [feedbackGroupId] : [],
    }

    // Add email to fields if provided
    if (email) {
      subscriberData.fields.contact_email = email
    }

    // Send to Mailerlite
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(subscriberData),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Mailerlite error:', errorData)
      return NextResponse.json(
        { error: 'Failed to submit feedback' },
        { status: response.status }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Feedback submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
