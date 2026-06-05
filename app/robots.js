import { siteMetadata } from '@/lib/constants';

// Major AI / LLM crawlers — explicitly welcomed so they index and can cite the site.
const aiCrawlers = [
  'GPTBot', // OpenAI
  'OAI-SearchBot', // OpenAI search
  'ChatGPT-User', // ChatGPT browsing
  'ClaudeBot', // Anthropic
  'Claude-Web', // Anthropic
  'anthropic-ai', // Anthropic
  'PerplexityBot', // Perplexity
  'Google-Extended', // Google Gemini / AI
  'Applebot-Extended', // Apple Intelligence
];

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteMetadata.url}/sitemap.xml`,
    host: siteMetadata.url,
  };
}
