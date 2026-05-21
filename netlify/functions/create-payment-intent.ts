import Stripe from 'stripe';
import { Handler, HandlerEvent } from '@netlify/functions';

export const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Stripe secret key not configured in Netlify environment variables.' })
      };
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    let body: { amount?: number };
    try {
      body = JSON.parse(event.body ?? '{}');
    } catch (e) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid request body.' })
      };
    }

    const amount = body.amount;

    if (!amount || amount < 50) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Amount too low. Minimum charge is $0.50.' })
      };
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
    };

  } catch (err) {
    const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: message })
    };
  }
};