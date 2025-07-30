import { supabase, getVisitorId } from './supabase';

export interface ChatSession {
  id?: string;
  visitorId: string;
  aiService: string;
  createdAt?: string;
  sessionDuration?: number;
  messageCount: number;
}

export interface ChatMessage {
  id?: string;
  sessionId: string;
  messageType: 'user' | 'ai';
  content: string;
  aiService: string;
  createdAt?: string;
}

export interface VisitorFeedback {
  id?: string;
  visitorId: string;
  aiService: string;
  rating: number;
  comment?: string;
  createdAt?: string;
}

export class AnalyticsTracker {
  private sessions: Map<string, ChatSession> = new Map();

  async createSession(aiService: string): Promise<string> {
    const visitorId = getVisitorId();
    const session: ChatSession = {
      visitorId,
      aiService,
      messageCount: 0
    };

    // In a real implementation, this would save to Supabase
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.sessions.set(sessionId, session);
    
    console.log('Session created:', { sessionId, aiService });
    return sessionId;
  }

  async logMessage(sessionId: string, messageType: 'user' | 'ai', content: string, aiService: string) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messageCount += 1;
      this.sessions.set(sessionId, session);
    }

    console.log('Message logged:', { sessionId, messageType, aiService });
  }

  async submitFeedback(aiService: string, rating: number, comment?: string) {
    const visitorId = getVisitorId();
    const feedback: VisitorFeedback = {
      visitorId,
      aiService,
      rating,
      comment
    };

    console.log('Feedback submitted:', feedback);
    return feedback;
  }

  async endSession(sessionId: string, duration: number) {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.sessionDuration = duration;
      this.sessions.set(sessionId, session);
    }

    console.log('Session ended:', { sessionId, duration });
  }
}

export const analytics = new AnalyticsTracker();