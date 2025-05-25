import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Verify token and update subscriber status in database
    // For now, we'll just simulate it
    const subscriber = {
      // This would be fetched from your database
      confirmed: true,
      confirmedAt: new Date(),
    };

    // Redirect to a success page
    return NextResponse.redirect(new URL('/newsletter/success', request.url));
  } catch (error) {
    console.error('Newsletter confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to confirm subscription' },
      { status: 500 }
    );
  }
} 