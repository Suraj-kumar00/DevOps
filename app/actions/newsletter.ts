'use server'

export async function subscribeToNewsletter(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const email = formData.get('email')
  const publicationId = process.env.NEXT_PUBLIC_HASHNODE_PUBLICATION_ID

  if (!email || !publicationId) {
    return { success: false, error: 'Email and publication ID are required' }
  }

  try {
    const response = await fetch('https://gql.hashnode.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation SubscribeToNewsletter($input: SubscribeToNewsletterInput!) {
            subscribeToNewsletter(input: $input) {
              status
            }
          }
        `,
        variables: {
          input: {
            publicationId,
            email: email.toString(),
          },
        },
      }),
    })

    const data = await response.json()

    if (data.errors) {
      return { success: false, error: data.errors[0].message }
    }

    return { success: true }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to subscribe to newsletter' 
    }
  }
} 