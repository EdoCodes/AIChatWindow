import type { APIRoute } from 'astro';
import { analytics } from '../../lib/analytics';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { visitorId, aiService, rating, comment } = await request.json();
    
    if (!visitorId || !aiService || !rating) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    if (rating < 1 || rating > 5) {
      return new Response(JSON.stringify({ error: 'Rating must be between 1 and 5' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const feedback = await analytics.submitFeedback(aiService, rating, comment);
    
    return new Response(JSON.stringify({ success: true, feedback }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};