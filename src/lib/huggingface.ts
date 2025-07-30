import { HfInference } from '@huggingface/inference';

// Free Hugging Face Inference API - no API key required for public models
const hf = new HfInference();

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export class HuggingFaceChat {
  private messages: ChatMessage[] = [];

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Add user message to history
      this.messages.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      });

      // Use a free conversational model
      const response = await hf.textGeneration({
        model: 'microsoft/DialoGPT-medium',
        inputs: userMessage,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false
        }
      });

      const aiResponse = response.generated_text.trim();

      // Add AI response to history
      this.messages.push({
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      });

      return aiResponse;
    } catch (error) {
      console.error('Chat error:', error);
      return "I'm sorry, I'm having trouble responding right now. Please try again.";
    }
  }

  getMessages(): ChatMessage[] {
    return this.messages;
  }

  clearHistory(): void {
    this.messages = [];
  }
}

// Alternative free models you can use:
export const FREE_AI_MODELS = {
  'microsoft/DialoGPT-medium': 'Conversational AI by Microsoft',
  'facebook/blenderbot-400M-distill': 'Facebook BlenderBot',
  'microsoft/DialoGPT-small': 'Lightweight conversational AI',
  'EleutherAI/gpt-neo-125M': 'GPT-style text generation'
};