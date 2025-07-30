import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('Chat API called');
    
    let requestData;
    try {
      requestData = await request.json();
    } catch (jsonError) {
      if (jsonError instanceof SyntaxError) {
        console.error('JSON parse error:', jsonError);
        return new Response(JSON.stringify({ error: 'Invalid JSON in request body' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      throw jsonError;
    }
    
    // Validate that requestData is an object and has required properties
    if (!requestData || typeof requestData !== 'object') {
      console.error('Invalid request data:', requestData);
      return new Response(JSON.stringify({ error: 'Request body must be a valid JSON object' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const { message, model = 'microsoft/DialoGPT-medium' } = requestData;
    console.log('Processing message:', message);
    
    if (!message || typeof message !== 'string' || message.trim() === '') {
      console.error('Invalid message:', message);
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simple AI responses for immediate functionality
    const responses = {
      greeting: [
        "Hello! I'm your AI assistant. How can I help you today?",
        "Hi there! What would you like to know about AI chatbots?",
        "Welcome! I'm here to help you with any questions about AI tools."
      ],
      question: [
        "That's a great question! Based on what I know about AI chatbots, I'd say...",
        "Interesting! Let me help you with that.",
        "I'd be happy to help you understand that better."
      ],
      default: [
        "That's fascinating! Tell me more about what you're looking for.",
        "I understand. What specific aspect would you like to explore?",
        "Thanks for sharing that. How can I assist you further?",
        "That's a good point. What would you like to know more about?",
        "I see what you mean. Let me help you with that."
      ]
    };

    let aiResponse = '';
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      const greetings = responses.greeting;
      aiResponse = greetings[Math.floor(Math.random() * greetings.length)];
    } else if (lowerMessage.includes('?') || lowerMessage.includes('what') || lowerMessage.includes('how') || lowerMessage.includes('why')) {
      const questions = responses.question;
      aiResponse = questions[Math.floor(Math.random() * questions.length)];
    } else {
      const defaults = responses.default;
      aiResponse = defaults[Math.floor(Math.random() * defaults.length)];
    }

    console.log('Sending response:', aiResponse);

    return new Response(JSON.stringify({ response: aiResponse }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    return new Response(JSON.stringify({ 
      response: "I'm sorry, I'm having trouble right now. Please try again in a moment.",
      error: true 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
};