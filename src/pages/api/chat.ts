import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    let requestData;
    try {
      requestData = await request.json();
    } catch (jsonError) {
      if (jsonError instanceof SyntaxError) {
        return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      throw jsonError;
    }
    
    // Validate that requestData is an object and has required properties
    if (!requestData || typeof requestData !== 'object') {
      return new Response(JSON.stringify({ error: 'Request body must be a valid JSON object' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { message, model = 'microsoft/DialoGPT-medium' } = requestData;
    
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Use Hugging Face Inference API (free tier)
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: message,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      // Fallback responses for when the API is unavailable
      const fallbackResponses = [
        "That's interesting! Tell me more about that.",
        "I understand. What would you like to know?",
        "Thanks for sharing that with me. How can I help you further?",
        "That's a great question! Let me think about that.",
        "I appreciate you asking. What else would you like to discuss?"
      ];
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      
      return new Response(JSON.stringify({ 
        response: randomResponse,
        fallback: true 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    
    // Handle different response formats
    let aiResponse = '';
    if (Array.isArray(data) && data[0]?.generated_text) {
      aiResponse = data[0].generated_text.trim();
    } else if (data.generated_text) {
      aiResponse = data.generated_text.trim();
    } else {
      aiResponse = "I'm here to help! What would you like to talk about?";
    }

    // Clean up the response
    if (aiResponse.startsWith(message)) {
      aiResponse = aiResponse.substring(message.length).trim();
    }

    if (!aiResponse) {
      aiResponse = "I'm processing your message. Could you rephrase that?";
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return new Response(JSON.stringify({ 
      response: "I'm sorry, I'm having trouble right now. Please try again in a moment.",
      error: true 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};