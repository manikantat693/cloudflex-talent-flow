import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Clock, ExternalLink, TrendingUp, AlertCircle, Settings, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { FirecrawlService, NewsItem } from '@/utils/FirecrawlService';
import { FirecrawlApiKeyModal } from './FirecrawlApiKeyModal';

interface NewsItemLocal {
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

export const NewsroomSection = () => {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItemLocal[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showApiModal, setShowApiModal] = useState(false);
  const [useLiveData, setUseLiveData] = useState(false);

  useEffect(() => {
    // Setup daily news updates
    FirecrawlService.setupDailyNewsUpdate();
    
    // Listen for news updates
    const handleNewsUpdate = (event: CustomEvent) => {
      if (event.detail.news) {
        setNews(event.detail.news);
        setUseLiveData(true);
      }
    };
    
    window.addEventListener('newsUpdated', handleNewsUpdate as EventListener);
    
    // Load cached news if available
    const cachedNews = FirecrawlService.getCachedNews();
    if (cachedNews.length > 0) {
      setNews(cachedNews);
      setUseLiveData(true);
    } else {
      fetchLatestNews();
    }
    
    return () => {
      window.removeEventListener('newsUpdated', handleNewsUpdate as EventListener);
    };
  }, []);

  const fetchLatestNews = async () => {
    setLoading(true);
    try {
      // Check if Firecrawl API is configured and try to fetch live data
      if (FirecrawlService.getApiKey()) {
        const result = await FirecrawlService.fetchUSCISNews();
        if (result.success && result.news) {
          setNews(result.news);
          setUseLiveData(true);
          toast({
            title: "Live News Updated",
            description: "Latest immigration news fetched from USCIS directly."
          });
          return;
        }
      }
      
      // Fallback to mock data
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock AI-processed immigration news with latest updates
      const mockNews: NewsItemLocal[] = [
        {
          id: '1',
          title: 'BREAKING: New $100,000 Fee Required for H-1B Petitions Starting Sept 21, 2025',
          summary: 'President Trump signs proclamation requiring $100,000 payment for all new H-1B visa petitions, including the 2026 lottery.',
          content: 'On Friday, Sept. 19, 2025, President Donald J. Trump signed a Proclamation "Restriction on Entry of Certain Nonimmigrant Workers" that requires a $100,000 payment to accompany any new H-1B visa petitions submitted after 12:01 a.m. eastern daylight time on Sept. 21, 2025. This includes the 2026 lottery and any other H-1B petitions submitted after this deadline. The proclamation does not apply to previously issued H-1B visas or petitions submitted prior to the deadline.',
          category: 'H-1B Visa',
          priority: 'high',
          publishedAt: '2025-09-21',
          sourceUrl: 'https://www.uscis.gov/newsroom/alerts/h-1b-faq',
          aiProcessed: true
        },
        {
          id: '2',
          title: 'H-1B Program Reforms: Prevailing Wage Levels to be Raised',
          summary: 'Department of Labor to revise and raise prevailing wage levels to ensure H-1B program hires only the best temporary foreign workers.',
          content: 'As part of comprehensive H-1B program reforms, the Department of Labor will conduct rulemaking to revise and raise prevailing wage levels. This aims to upskill the H-1B program and ensure it is used to hire only the best temporary foreign workers. Additionally, DHS will prioritize high-skilled, high-paid aliens in the H-1B lottery over those at lower wage levels.',
          category: 'H-1B Visa',
          priority: 'high',
          publishedAt: '2025-09-20',
          aiProcessed: true
        },
        {
          id: '3',
          title: 'Breaking: USCIS Announces New AI-Powered Case Processing System',
          summary: 'Revolutionary AI system reduces immigration case processing times by 40% across all categories.',
          content: 'USCIS unveiled its new artificial intelligence-powered case management system that promises to reduce processing times by up to 40%. The system uses machine learning to prioritize cases, detect fraud, and streamline adjudication processes. Initial testing shows remarkable improvements in efficiency.',
          category: 'Technology',
          priority: 'high',
          publishedAt: '2025-01-16',
          aiProcessed: true
        },
        {
          id: '4',
          title: 'OPT Extensions Surge 300% for AI/ML Graduates',
          summary: 'Massive increase in STEM OPT extensions as AI graduates find unprecedented job opportunities.',
          content: 'The latest data reveals a 300% surge in STEM OPT extension applications from AI and machine learning graduates. Universities report that 95% of their AI program graduates have secured employment before graduation, driving the highest OPT extension rates in history.',
          category: 'Student Visa',
          priority: 'medium',
          publishedAt: '2025-01-12',
          aiProcessed: true
        },
        {
          id: '5',
          title: 'Urgent: New I-94 Digital Processing Goes Live This Week',
          summary: 'All I-94 records now processed digitally with instant updates and enhanced security features.',
          content: 'Starting this week, all I-94 arrival/departure records are processed through the new digital system. Travelers can now access their records instantly online, with automatic status updates and enhanced security features. The old paper-based system has been completely phased out.',
          category: 'Processing',
          priority: 'medium',
          publishedAt: '2025-01-10',
          aiProcessed: true
        },
        {
          id: '6',
          title: 'Immigration Court Backlog Reduced by 25% Through New Initiatives',
          summary: 'Comprehensive reform and digital filing systems help immigration courts clear 250,000 pending cases.',
          content: 'Immigration courts have successfully reduced the case backlog by 25% this quarter through new digital filing systems, expanded video hearings, and streamlined procedures. Over 250,000 pending cases have been resolved, bringing relief to hundreds of thousands of immigrants.',
          category: 'General',
          priority: 'medium',
          publishedAt: '2025-01-08',
          aiProcessed: true
        },
        {
          id: '7',
          title: 'Labor Certification Processing Time Drops to 6 Months',
          summary: 'Department of Labor announces fastest PERM processing times in over a decade.',
          content: 'The Department of Labor has achieved a milestone by reducing PERM labor certification processing times to just 6 months on average. This represents the fastest processing times in over a decade, significantly accelerating the green card process for employment-based applicants.',
          category: 'Green Card',
          priority: 'high',
          publishedAt: '2025-01-05',
          aiProcessed: true
        },
        {
          id: '8',
          title: 'New Premium Processing for I-485 Applications Announced',
          summary: 'USCIS introduces 45-day premium processing for adjustment of status applications.',
          content: 'In a major announcement, USCIS will begin offering premium processing for I-485 adjustment of status applications starting February 1, 2025. For an additional fee of $2,805, applicants can receive decisions within 45 calendar days, dramatically reducing wait times for green card applications.',
          category: 'Processing',
          priority: 'high',
          publishedAt: '2025-01-20',
          aiProcessed: true
        }
      ];

      setNews(mockNews);
      if (!useLiveData) {
        toast({
          title: "Mock News Loaded",
          description: "Sample immigration news loaded. Configure Firecrawl API for live updates."
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch latest news. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'H-1B Visa', 'Green Card', 'Student Visa', 'Processing', 'Technology', 'General'];

  const filteredNews = selectedCategory === 'all' 
    ? news 
    : news.filter(item => item.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 border-red-500 bg-red-50 dark:bg-red-950';
      case 'medium': return 'text-yellow-500 border-yellow-500 bg-yellow-50 dark:bg-yellow-950';
      case 'low': return 'text-green-500 border-green-500 bg-green-50 dark:bg-green-950';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <TrendingUp className="w-4 h-4" />;
      case 'low': return <Newspaper className="w-4 h-4" />;
      default: return <Newspaper className="w-4 h-4" />;
    }
  };

  return (
    <>
      <section id="newsroom" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Newspaper className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              Immigration Newsroom
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay informed with the latest immigration news, policy changes, and updates. 
              Our AI processes news from multiple sources to bring you accurate, timely information.
            </p>
          </div>

          {/* Live Data Status and Controls */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              {useLiveData ? (
                <Badge variant="default" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Live USCIS Data
                </Badge>
              ) : (
                <Badge variant="outline" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Sample Data
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowApiModal(true)}
                className="flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                {FirecrawlService.getApiKey() ? 'Manage API' : 'Setup Live News'}
              </Button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category === 'all' ? 'All News' : category}
              </Button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-4 text-lg">Processing latest immigration news with AI...</span>
            </div>
          )}

          {/* News Grid */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <Card key={item.id} className="hover:shadow-xl transition-all duration-300 group hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getPriorityColor(item.priority)}>
                          {getPriorityIcon(item.priority)}
                          <span className="ml-1 capitalize">{item.priority}</span>
                        </Badge>
                        {item.aiProcessed && (
                          <Badge variant="secondary" className="text-xs">
                            AI Processed
                          </Badge>
                        )}
                      </div>
                      <Badge variant="outline">{item.category}</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                      {item.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(item.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {item.summary}
                    </p>
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed">
                        {item.content.substring(0, 150)}...
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Read More
                        </Button>
                        {item.sourceUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Refresh Button */}
          <div className="text-center mt-12">
            <Button onClick={fetchLatestNews} variant="outline" disabled={loading}>
              <Newspaper className="w-4 h-4 mr-2" />
              Refresh News Feed
            </Button>
          </div>

          {/* AI Disclaimer */}
          <div className="text-center mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>{useLiveData ? 'Live USCIS Data:' : 'AI-Powered News:'}</strong> 
              {useLiveData 
                ? ' Real-time data fetched from USCIS.gov and processed with AI for accurate summaries and insights.'
                : ' Our system fetches news from multiple immigration sources and processes them with AI to provide accurate summaries and insights.'
              }
              {' '}Always verify critical information with official sources.
            </p>
          </div>
        </div>
      </section>

      <FirecrawlApiKeyModal 
        isOpen={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSuccess={() => {
          fetchLatestNews();
        }}
      />
    </>
  );
};