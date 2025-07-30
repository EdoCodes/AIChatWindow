# AI Chat Demo Platform

A modern web application built with Astro.js that allows users to compare multiple AI chat models side-by-side in real-time.

## Features

- **Multiple AI Models**: Chat with DialoGPT, BlenderBot, and browser-based AI simultaneously
- **Real-Time Comparison**: See how different AI models respond to the same prompts
- **Responsive Design**: Optimized for desktop (3 columns), tablet (2 columns), and mobile (tabbed interface)
- **Privacy Focused**: Anonymous usage tracking with no personal data storage
- **Community Feedback**: Rate and review AI models to help others
- **Performance Analytics**: Track usage patterns and user preferences

## Tech Stack

- **Framework**: Astro.js with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Analytics**: Custom analytics system
- **Deployment**: Ready for Netlify/Vercel

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-chat-demo-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your Supabase credentials in the `.env` file.

4. **Set up Supabase Database**
   
   Create the following tables in your Supabase project:

   ```sql
   -- Chat sessions table
   CREATE TABLE chat_sessions (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     visitor_id TEXT NOT NULL,
     ai_service TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     session_duration INTEGER,
     message_count INTEGER DEFAULT 0
   );

   -- Chat messages table
   CREATE TABLE chat_messages (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     session_id UUID REFERENCES chat_sessions(id),
     message_type TEXT NOT NULL CHECK (message_type IN ('user', 'ai')),
     content TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     ai_service TEXT NOT NULL
   );

   -- AI services table
   CREATE TABLE ai_services (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     name TEXT NOT NULL,
     display_name TEXT NOT NULL,
     embed_url TEXT NOT NULL,
     description TEXT,
     is_active BOOLEAN DEFAULT true,
     sort_order INTEGER DEFAULT 0,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Visitor feedback table
   CREATE TABLE visitor_feedback (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     visitor_id TEXT NOT NULL,
     ai_service TEXT NOT NULL,
     rating INTEGER CHECK (rating >= 1 AND rating <= 5),
     comment TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser** and navigate to `http://localhost:4321`

## Project Structure

```
src/
├── components/
│   ├── ChatWindow.astro      # Individual chat window component
│   ├── ChatGrid.astro        # Grid layout for chat windows
│   ├── Header.astro          # Site header with navigation
│   ├── Footer.astro          # Site footer
│   ├── HeroSection.astro     # Landing page hero section
│   ├── FeaturesSection.astro # Features showcase
│   └── LoadingSpinner.astro  # Loading component
├── layouts/
│   └── Layout.astro          # Base layout component
├── lib/
│   ├── supabase.ts          # Supabase client configuration
│   ├── analytics.ts         # Analytics tracking system
│   └── ai-services.ts       # AI service configurations
├── pages/
│   ├── index.astro          # Landing page
│   └── api/
│       ├── sessions.ts      # Session management API
│       ├── feedback.ts      # Feedback submission API
│       └── analytics.ts     # Analytics API
└── types/
    └── index.ts             # TypeScript type definitions
```

## AI Services Configuration

The platform currently supports these AI services:

1. **DialoGPT** - Microsoft's conversational AI
2. **BlenderBot** - Facebook's conversational AI
3. **Browser AI** - Transformers.js running in the browser

To add more services, update the `defaultServices` array in `src/lib/ai-services.ts`.

## Deployment

### Netlify/Vercel

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - The `dist/` folder contains the built static site
   - Set environment variables in your deployment platform
   - Configure domain and SSL as needed

### Environment Variables for Production

```
PUBLIC_SUPABASE_URL=your-production-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_KEY=your-production-service-key
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Security Considerations

- All chat interactions are embedded via iframes for security
- Anonymous visitor tracking with no personal data storage
- Rate limiting on API endpoints (to be implemented)
- Content Security Policy headers configured

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or issues, please open an issue on the GitHub repository.