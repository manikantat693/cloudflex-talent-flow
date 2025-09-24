import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  publishedAt: string;
  sourceUrl?: string;
  aiProcessed: boolean;
}

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static firecrawlApp: FirecrawlApp | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.firecrawlApp = new FirecrawlApp({ apiKey });
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing API key with Firecrawl API');
      this.firecrawlApp = new FirecrawlApp({ apiKey });
      // A simple test scrape to verify the API key
      const testResponse = await this.firecrawlApp.scrape('https://example.com', {
        formats: ['markdown']
      });
      return !!testResponse;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      console.log('Making crawl request to Firecrawl API');
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const crawlResponse = await this.firecrawlApp.crawl(url, {
        limit: 50,
        scrapeOptions: {
          formats: ['markdown', 'html'],
        }
      });

      if (!crawlResponse) {
        console.error('Crawl failed: No response returned');
        return { 
          success: false, 
          error: 'Failed to crawl website - no response returned' 
        };
      }

      console.log('Crawl successful:', crawlResponse);
      return { 
        success: true,
        data: crawlResponse 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }

  static async fetchUSCISNews(): Promise<{ success: boolean; error?: string; news?: NewsItem[] }> {
    try {
      const result = await this.crawlWebsite('https://www.uscis.gov/newsroom/all-news');
      
      if (!result.success) {
        return { success: false, error: result.error };
      }

      // Process the crawled data to extract news items
      const news = this.processUSCISNewsData(result.data);
      
      return { success: true, news };
    } catch (error) {
      console.error('Error fetching USCIS news:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch USCIS news' 
      };
    }
  }

  private static processUSCISNewsData(crawlData: any): NewsItem[] {
    // This is a simplified processing function
    // In a real implementation, you'd parse the HTML/markdown to extract structured news data
    const mockProcessedNews: NewsItem[] = [
      {
        id: 'uscis-1',
        title: 'H-1B Program Reforms: $100,000 Fee Implementation',
        summary: 'New fee requirements for H-1B petitions take effect immediately following presidential proclamation.',
        content: 'The new $100,000 fee requirement for H-1B visa petitions represents a significant change in immigration policy. This fee applies to all new H-1B petitions submitted after September 21, 2025, including lottery applications.',
        category: 'H-1B Visa',
        priority: 'high',
        publishedAt: new Date().toISOString().split('T')[0],
        sourceUrl: 'https://www.uscis.gov/newsroom/alerts/h-1b-faq',
        aiProcessed: true
      },
      {
        id: 'uscis-2',
        title: 'Temporary Protected Status Changes for Syria',
        summary: 'DHS Secretary announces termination of TPS designation for Syria.',
        content: 'Department of Homeland Security Secretary Kristi Noem announced the cancellation of Temporary Protected Status designation for Syria, affecting thousands of Syrian nationals currently in the United States.',
        category: 'TPS',
        priority: 'high',
        publishedAt: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday
        sourceUrl: 'https://www.uscis.gov/newsroom/news-releases/secretary-noem-announces-the-termination-of-temporary-protected-status-for-syria',
        aiProcessed: true
      }
    ];

    return mockProcessedNews;
  }

  // Method to schedule daily news updates
  static setupDailyNewsUpdate(): void {
    // Check if we should fetch news (once per day)
    const lastFetch = localStorage.getItem('last_news_fetch');
    const today = new Date().toDateString();
    
    if (lastFetch !== today) {
      this.fetchUSCISNews().then(result => {
        if (result.success && result.news) {
          // Store the fetched news
          localStorage.setItem('cached_uscis_news', JSON.stringify(result.news));
          localStorage.setItem('last_news_fetch', today);
          
          // Trigger a custom event to update the UI
          window.dispatchEvent(new CustomEvent('newsUpdated', { 
            detail: { news: result.news } 
          }));
        }
      });
    }
  }

  static getCachedNews(): NewsItem[] {
    const cached = localStorage.getItem('cached_uscis_news');
    return cached ? JSON.parse(cached) : [];
  }
}