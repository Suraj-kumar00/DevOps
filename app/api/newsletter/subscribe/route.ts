import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import crypto from 'crypto';

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

// Function to generate confirmation token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Generate confirmation token
    const confirmationToken = generateToken();

    // Store subscriber in database (implement your database logic here)
    // For now, we'll just simulate it
    const subscriber = {
      email,
      confirmationToken,
      confirmed: false,
      createdAt: new Date(),
    };

    // Create confirmation link
    const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/confirm?token=${confirmationToken}`;

    // Send confirmation email
    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL || 'your-verified-sender@example.com',
      subject: 'Confirm your newsletter subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2a4b8c;">Welcome to Our Newsletter!</h2>
          <p>Thank you for subscribing to our Cloud & DevOps newsletter. To complete your subscription, please click the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationLink}" 
               style="background: linear-gradient(to right, #446ca9, #2a4b8c);
                      color: white;
                      padding: 12px 24px;
                      text-decoration: none;
                      border-radius: 5px;
                      display: inline-block;">
              Confirm Subscription
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">If you didn't request this subscription, you can safely ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json(
      { message: 'Confirmation email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process subscription' },
      { status: 500 }
    );
  }
} 