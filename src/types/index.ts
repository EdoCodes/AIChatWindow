export interface AIService {
  id: string;
  name: string;
  displayName: string;
  embedUrl: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

export interface ChatSession {
  id?: string;
  visitorId: string;
  aiService: string;
  createdAt?: string;
  sessionDuration?: number;
  messageCount: number;
}

export interface VisitorFeedback {
  id?: string;
  visitorId: string;
  aiService: string;
  rating: number;
  comment?: string;
  createdAt?: string;
}

export interface AnalyticsData {
  totalSessions: number;
  averageSessionDuration: number;
  popularServices: Array<{service: string, count: number}>;
  feedbackSummary: Array<{service: string, averageRating: number}>;
}