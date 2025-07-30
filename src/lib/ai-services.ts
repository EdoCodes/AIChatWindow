export interface AIService {
  id: string;
  name: string;
  displayName: string;
  embedUrl: string;
  description: string;
  isActive: boolean;
  sortOrder: number;
}

export const defaultServices: AIService[] = [
  {
    id: 'huggingface-dialo',
    name: 'huggingface-dialo',
    displayName: 'DialoGPT Chat',
    embedUrl: 'https://huggingface.co/spaces/microsoft/DialoGPT-medium',
    description: 'Conversational AI by Microsoft',
    isActive: true,
    sortOrder: 1
  },
  {
    id: 'huggingface-blender',
    name: 'huggingface-blender',
    displayName: 'BlenderBot',
    embedUrl: 'https://huggingface.co/spaces/facebook/BlenderBot-3B',
    description: 'Facebook\'s conversational AI',
    isActive: true,
    sortOrder: 2
  },
  {
    id: 'transformers-js',
    name: 'transformers-js',
    displayName: 'Browser AI',
    embedUrl: 'https://huggingface.co/spaces/Xenova/transformers.js-chat',
    description: 'AI running in your browser',
    isActive: true,
    sortOrder: 3
  }
];

export async function getActiveServices(): Promise<AIService[]> {
  // In a real implementation, this would fetch from Supabase
  // For now, return the default services
  return defaultServices.filter(service => service.isActive);
}