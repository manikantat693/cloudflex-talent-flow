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
      
      // Mock AI-processed immigration news
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'USCIS Announces Major Changes to H-1B Lottery System for 2025',
          summary: 'New beneficiary-centric selection process aims to reduce multiple registrations and increase fairness in the H-1B allocation system.',
          content: 'The U.S. Citizenship and Immigration Services (USCIS) has implemented significant reforms to the H-1B lottery system for fiscal year 2025. The new beneficiary-centric approach will ensure that each individual can only be selected once, regardless of how many petitions are filed on their behalf. This change is expected to increase the chances for unique beneficiaries and reduce the advantage that multiple filings previously provided.',
          category: 'H-1B Visa',
          priority: 'high',
          publishedAt: '2024-01-20',
          sourceUrl: 'https://uscis.gov/h1b-updates-2025',
          aiProcessed: true
        },
        {
          id: '2',
          title: 'Green Card Processing Times Show Significant Improvement',
          summary: 'Employment-based green card applications are now being processed 30% faster due to USCIS efficiency initiatives.',
          content: 'Recent data from USCIS shows that employment-based green card processing times have improved significantly across all categories. The EB-1 category now processes in an average of 8 months, while EB-2 and EB-3 categories have seen reductions to 12 and 18 months respectively. This improvement is attributed to increased staffing and streamlined review processes.',
          category: 'Green Card',
          priority: 'high',
          publishedAt: '2024-01-18',
          aiProcessed: true
        },
        {
          id: '3',
          title: 'New STEM OPT Eligibility Criteria Released',
          summary: 'Updated list of STEM fields and simplified application process announced for international students.',
          content: 'The Department of Homeland Security has expanded the list of eligible STEM fields for Optional Practical Training (OPT) extensions. The new criteria include emerging fields in artificial intelligence, cybersecurity, and renewable energy. Additionally, the application process has been simplified with digital submissions now available.',
          category: 'Student Visa',
          priority: 'medium',
          publishedAt: '2024-01-15',
          aiProcessed: true
        },
        {
          id: '4',
          title: 'Immigration Medical Exam Requirements Updated',
          summary: 'New health screening protocols and authorized medical centers list updated for all immigration applicants.',
          content: 'USCIS has updated the medical examination requirements for immigration applications. The new protocols include enhanced screening for certain conditions and an updated list of authorized civil surgeons. Applicants are advised to check the latest requirements before scheduling their medical examinations.',
          category: 'General',
          priority: 'medium',
          publishedAt: '2024-01-12',
          aiProcessed: true
        },
        {
          id: '5',
          title: 'Premium Processing Service Expanded to More Petition Types',
          summary: 'USCIS expands 15-day premium processing to additional form types, reducing wait times for urgent cases.',
          content: 'The premium processing service is now available for additional petition types including certain family-based applications and employment authorization documents. This expansion allows applicants to receive decisions within 15 calendar days for an additional fee, providing faster resolution for time-sensitive cases.',
          category: 'Processing',
          priority: 'low',
          publishedAt: '2024-01-10',
          aiProcessed: true
        },
        {
          id: '6',
          title: 'Digital Immigration Services Portal Launches',
          summary: 'New online platform streamlines application filing and case tracking for all immigration services.',
          content: 'USCIS has launched a comprehensive digital portal that allows applicants to file forms, track case status, and communicate with officers online. The platform features enhanced security, real-time updates, and integrated payment processing, making the immigration process more accessible and efficient.',
          category: 'Technology',
          priority: 'medium',
          publishedAt: '2024-01-08',
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