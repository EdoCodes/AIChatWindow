export async function GET() {
  const baseUrl = 'https://aichatwindow.com';
  
  // Define all your pages with their priorities and change frequencies
  const pages = [
    {
      url: '',
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: '/free-ai-tools',
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: '/corporate-ai-tools',
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: '/paid-ai-tools',
      changefreq: 'weekly',
      priority: '0.9',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: '/chat',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: new Date().toISOString().split('T')[0]
    },
    {
      url: '/blog',
      changefreq: 'daily',
      priority: '0.9',
      lastmod: new Date().toISOString().split('T')[0]
    },
    // Blog posts
    {
      url: '/blog/best-free-ai-chatbots-2025',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2025-01-15'
    },
    {
      url: '/blog/chatgpt-vs-claude-vs-bard-comparison',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2025-01-12'
    },
    {
      url: '/blog/enterprise-ai-chatbot-implementation-guide',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2025-01-10'
    },
    {
      url: '/blog/ai-chatbot-privacy-security-guide',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2025-01-08'
    },
    {
      url: '/blog/future-of-ai-chatbots-2025-predictions',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2025-01-05'
    },
    {
      url: '/blog/how-to-choose-right-ai-chatbot',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: '2025-01-03'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}