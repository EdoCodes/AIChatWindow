export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export class SimpleChatBot {
  private responses = {
    greetings: [
      "Hello! I'm your AI assistant. How can I help you today?",
      "Hi there! What would you like to know about AI chatbots?",
      "Welcome! I'm here to help you with any questions about AI tools.",
      "Greetings! How can I assist you with AI-related questions?"
    ],
    
    questions: [
      "That's a great question! Based on what I know about AI chatbots, I'd recommend exploring our free AI tools section.",
      "Interesting question! Let me help you with that. Have you checked out our comparison of different AI models?",
      "I'd be happy to help you understand that better. Our blog has detailed guides on AI chatbot selection.",
      "Great question! AI technology is evolving rapidly. What specific aspect interests you most?"
    ],
    
    aiTopics: [
      "AI chatbots are fascinating! We have a comprehensive guide to the best free AI tools available in 2025.",
      "There are many great AI chatbots available. Would you like to know about free options like Google Bard or Character.AI?",
      "AI technology is advancing rapidly. Our platform helps you compare different AI assistants to find the perfect one for your needs.",
      "The AI landscape is exciting! From ChatGPT to Claude to Bard, each has unique strengths."
    ],
    
    help: [
      "I'm here to help! You can ask me about AI chatbots, compare different tools, or learn about implementation.",
      "Need assistance? I can help you understand AI chatbots, their features, and how to choose the right one.",
      "How can I assist you? I specialize in AI chatbot information and recommendations.",
      "I'm your AI guide! Ask me anything about chatbots, AI tools, or getting started with AI assistants."
    ],
    
    thanks: [
      "You're welcome! Is there anything else you'd like to know about AI chatbots?",
      "Happy to help! Feel free to ask more questions about AI tools.",
      "Glad I could assist! What else would you like to explore about AI technology?",
      "You're very welcome! Any other AI-related questions I can help with?"
    ],
    
    defaults: [
      "That's interesting! Tell me more about what you're looking for in an AI assistant.",
      "I understand. What specific aspect of AI chatbots would you like to explore?",
      "Thanks for sharing that. How can I assist you further with AI tools?",
      "That's a good point. Have you tried any of the free AI chatbots we recommend?",
      "I see what you mean. Our platform offers comparisons of over 50 different AI tools.",
      "Interesting perspective! What would you like to know about AI chatbot capabilities?",
      "I appreciate your input. How can I help you find the right AI solution?",
      "That makes sense. Would you like recommendations for specific AI tools?"
    ]
  };

  generateResponse(message: string): string {
    const lowerMessage = message.toLowerCase().trim();
    
    // Greetings
    if (this.matchesPatterns(lowerMessage, ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon'])) {
      return this.getRandomResponse('greetings');
    }
    
    // Thanks
    if (this.matchesPatterns(lowerMessage, ['thank', 'thanks', 'appreciate', 'grateful'])) {
      return this.getRandomResponse('thanks');
    }
    
    // Help requests
    if (this.matchesPatterns(lowerMessage, ['help', 'assist', 'support', 'guide', 'how to'])) {
      return this.getRandomResponse('help');
    }
    
    // Questions
    if (lowerMessage.includes('?') || this.matchesPatterns(lowerMessage, ['what', 'how', 'why', 'when', 'where', 'which', 'can you', 'do you'])) {
      return this.getRandomResponse('questions');
    }
    
    // AI-related topics
    if (this.matchesPatterns(lowerMessage, ['ai', 'chatbot', 'chat', 'artificial intelligence', 'machine learning', 'gpt', 'claude', 'bard'])) {
      return this.getRandomResponse('aiTopics');
    }
    
    // Default responses
    return this.getRandomResponse('defaults');
  }

  private matchesPatterns(message: string, patterns: string[]): boolean {
    return patterns.some(pattern => message.includes(pattern));
  }

  private getRandomResponse(category: keyof typeof this.responses): string {
    const responses = this.responses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  createMessage(content: string, role: 'user' | 'assistant'): ChatMessage {
    return {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      role,
      timestamp: new Date()
    };
  }
}