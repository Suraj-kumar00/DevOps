import { NextResponse } from 'next/server';

const PLUNK_API_KEY = process.env.PLUNK_API_KEY;
const PLUNK_API_URL = 'https://api.useplunk.com/v1';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Subscribe to Plunk
    const response = await fetch(`${PLUNK_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PLUNK_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        subscribed: true,
        metadata: {
          source: 'website',
          timestamp: new Date().toISOString(),
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Plunk API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to subscribe to newsletter' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
} 