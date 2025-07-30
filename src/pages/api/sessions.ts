import type { APIRoute } from 'astro';
import { analytics } from '../../lib/analytics';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { visitorId, aiService } = await request.json();
    
    if (!visitorId || !aiService) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const sessionId = await analytics.createSession(aiService);
    
    return new Response(JSON.stringify({ sessionId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error creating session:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};