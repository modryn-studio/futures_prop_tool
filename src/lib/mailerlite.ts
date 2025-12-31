const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

interface MailerliteSubscriberData {
  email: string
  fields?: Record<string, string | number>
}

export async function addSubscriber(data: MailerliteSubscriberData) {
  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    console.error('Mailerlite API credentials not configured')
    throw new Error('Email service not configured')
  }

  // First, create or update the subscriber
  const subscriberResponse = await fetch(
    'https://connect.mailerlite.com/api/subscribers',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
      },
      body: JSON.stringify({
        email: data.email,
        fields: data.fields,
      }),
    }
  )

  if (!subscriberResponse.ok) {
    const error = await subscriberResponse.json()
    console.error('Mailerlite subscriber API error:', error)
    throw new Error('Failed to create subscriber')
  }

  const subscriberData = await subscriberResponse.json()
  const subscriberId = subscriberData.data?.id

  // Add subscriber to the group
  if (subscriberId) {
    const groupResponse = await fetch(
      `https://connect.mailerlite.com/api/subscribers/${subscriberId}/groups/${MAILERLITE_GROUP_ID}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        },
      }
    )

    if (!groupResponse.ok) {
      const error = await groupResponse.json()
      console.error('Mailerlite group API error:', error)
      // Don't throw - subscriber was created successfully
    }
  }

  return subscriberData
}
