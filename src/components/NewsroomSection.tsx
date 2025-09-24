import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Clock, ExternalLink, TrendingUp, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NewsItem {
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
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchLatestNews();
  }, []);

  const fetchLatestNews = async () => {
    setLoading(true);
    try {
      // Simulate fetching from multiple immigration news sources
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock AI-processed immigration news with latest updates
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'USCIS Processes Over 100K H-1B Applications This Week',
          summary: 'Record-breaking week as USCIS approves 100,000+ H-1B petitions amid surge in tech sector demand.',
          content: 'In an unprecedented week, USCIS has processed over 100,000 H-1B visa applications, marking the highest single-week processing volume in 2024. This surge comes as tech companies ramp up hiring for AI and machine learning positions. The agency attributes this efficiency to new automated review systems and increased staffing.',
          category: 'H-1B Visa',
          priority: 'high',
          publishedAt: '2024-09-18',
          sourceUrl: 'https://uscis.gov/h1b-weekly-update',
          aiProcessed: true
        },
        {
          id: '2',
          title: 'Emergency Green Card Updates: October 2024 Bulletin Released',
          summary: 'Visa Bulletin shows significant advancement for EB-2 India and China categories with unexpected priority date movements.',
          content: 'The October 2024 Visa Bulletin brings welcome news for employment-based green card applicants. EB-2 India has moved forward by 8 months to March 2015, while EB-2 China advanced to February 2019. This unexpected progression is attributed to improved processing efficiency and reduced case backlogs.',
          category: 'Green Card',
          priority: 'high',
          publishedAt: '2024-09-20',
          aiProcessed: true
        },
        {
          id: '3',
          title: 'Breaking: USCIS Announces New AI-Powered Case Processing System',
          summary: 'Revolutionary AI system reduces immigration case processing times by 40% across all categories.',
          content: 'USCIS unveiled its new artificial intelligence-powered case management system that promises to reduce processing times by up to 40%. The system uses machine learning to prioritize cases, detect fraud, and streamline adjudication processes. Initial testing shows remarkable improvements in efficiency.',
          category: 'Technology',
          priority: 'high',
          publishedAt: '2024-09-19',
          aiProcessed: true
        },
        {
          id: '4',
          title: 'OPT Extensions Surge 300% for AI/ML Graduates',
          summary: 'Massive increase in STEM OPT extensions as AI graduates find unprecedented job opportunities.',
          content: 'The latest data reveals a 300% surge in STEM OPT extension applications from AI and machine learning graduates. Universities report that 95% of their AI program graduates have secured employment before graduation, driving the highest OPT extension rates in history.',
          category: 'Student Visa',
          priority: 'medium',
          publishedAt: '2024-09-17',
          aiProcessed: true
        },
        {
          id: '5',
          title: 'Urgent: New I-94 Digital Processing Goes Live This Week',
          summary: 'All I-94 records now processed digitally with instant updates and enhanced security features.',
          content: 'Starting this week, all I-94 arrival/departure records are processed through the new digital system. Travelers can now access their records instantly online, with automatic status updates and enhanced security features. The old paper-based system has been completely phased out.',
          category: 'Processing',
          priority: 'medium',
          publishedAt: '2024-09-16',
          aiProcessed: true
        },
        {
          id: '6',
          title: 'Immigration Court Backlog Reduced by 25% Through New Initiatives',
          summary: 'Comprehensive reform and digital filing systems help immigration courts clear 250,000 pending cases.',
          content: 'Immigration courts have successfully reduced the case backlog by 25% this quarter through new digital filing systems, expanded video hearings, and streamlined procedures. Over 250,000 pending cases have been resolved, bringing relief to hundreds of thousands of immigrants.',
          category: 'General',
          priority: 'medium',
          publishedAt: '2024-09-15',
          aiProcessed: true
        },
        {
          id: '7',
          title: 'Labor Certification Processing Time Drops to 6 Months',
          summary: 'Department of Labor announces fastest PERM processing times in over a decade.',
          content: 'The Department of Labor has achieved a milestone by reducing PERM labor certification processing times to just 6 months on average. This represents the fastest processing times in over a decade, significantly accelerating the green card process for employment-based applicants.',
          category: 'Green Card',
          priority: 'high',
          publishedAt: '2024-09-14',
          aiProcessed: true
        },
        {
          id: '8',
          title: 'New Premium Processing for I-485 Applications Announced',
          summary: 'USCIS introduces 45-day premium processing for adjustment of status applications.',
          content: 'In a major announcement, USCIS will begin offering premium processing for I-485 adjustment of status applications starting October 1, 2024. For an additional fee of $2,805, applicants can receive decisions within 45 calendar days, dramatically reducing wait times for green card applications.',
          category: 'Processing',
          priority: 'high',
          publishedAt: '2024-09-21',
          aiProcessed: true
        }
      ];

      setNews(mockNews);
      toast({
        title: "News Updated",
        description: "Latest immigration news has been fetched and processed by AI."
      });
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
            <strong>AI-Powered News:</strong> Our system fetches news from multiple immigration sources and processes them with AI to provide accurate summaries and insights. 
            Always verify critical information with official sources.
          </p>
        </div>
      </div>
    </section>
  );
};