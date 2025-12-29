const KIT_API_SECRET = process.env.KIT_API_SECRET
const KIT_FORM_ID = process.env.NEXT_PUBLIC_KIT_FORM_ID

interface KitSubscriberData {
  email: string
  firstName?: string
  tags?: string[]
  fields?: Record<string, string>
}

export async function addSubscriber(data: KitSubscriberData) {
  if (!KIT_API_SECRET || !KIT_FORM_ID) {
    console.error('Kit API credentials not configured')
    throw new Error('Email service not configured')
  }

  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: KIT_API_SECRET,
        email: data.email,
        first_name: data.firstName,
        tags: data.tags,
        fields: data.fields,
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json()
    console.error('Kit API error:', error)
    throw new Error('Failed to subscribe')
  }

  return response.json()
}

export async function tagSubscriber(email: string, tagId: string) {
  if (!KIT_API_SECRET) {
    throw new Error('Kit API not configured')
  }

  const response = await fetch(
    `https://api.convertkit.com/v3/tags/${tagId}/subscribe`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: KIT_API_SECRET,
        email,
      }),
    }
  )

  return response.json()
}
