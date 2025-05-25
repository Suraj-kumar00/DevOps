import { NextResponse } from 'next/server';

const PLUNK_API_KEY = process.env.PLUNK_API_KEY;
const PLUNK_API_URL = 'https://api.useplunk.com/v1';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Token and email are required' },
        { status: 400 }
      );
    }

    // Verify subscription with Plunk
    const response = await fetch(`${PLUNK_API_URL}/subscribers/${email}/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PLUNK_API_KEY}`,
      },
      body: JSON.stringify({
        token,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Plunk API error:', data);
      return NextResponse.json(
        { error: data.message || 'Failed to confirm subscription' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: 'Successfully confirmed subscription' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm subscription' },
      { status: 500 }
    );
  }
} 