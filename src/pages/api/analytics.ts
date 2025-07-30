import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  try {
    // In a real implementation, this would query Supabase for analytics data
    const analytics = {
      totalSessions: 0,
      averageSessionDuration: 0,
      popularServices: [
        { service: 'DialoGPT', count: 0 },
        { service: 'BlenderBot', count: 0 },
        { service: 'Browser AI', count: 0 }
      ],
      feedbackSummary: [
        { service: 'DialoGPT', averageRating: 0 },
        { service: 'BlenderBot', averageRating: 0 },
        { service: 'Browser AI', averageRating: 0 }
      ]
    };
    
    return new Response(JSON.stringify(analytics), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};