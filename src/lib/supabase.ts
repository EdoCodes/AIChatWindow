import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate anonymous visitor ID
export function generateVisitorId(): string {
  return 'visitor_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Get or create visitor ID from localStorage
export function getVisitorId(): string {
  if (typeof window === 'undefined') return generateVisitorId();
  
  let visitorId = localStorage.getItem('ai_chat_visitor_id');
  if (!visitorId) {
    visitorId = generateVisitorId();
    localStorage.setItem('ai_chat_visitor_id', visitorId);
  }
  return visitorId;
}