import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Calendar, AlertCircle, TrendingUp, FileText, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImmigrationNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  url?: string;
}

export const ImmigrationNewsModal = ({ isOpen, onClose }: ImmigrationNewsModalProps) => {
  const { toast } = useToast();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('latest');

  useEffect(() => {
    if (isOpen) {
      fetchLatestNews();
    }
  }, [isOpen]);

  const fetchLatestNews = async () => {
    setLoading(true);
    try {
      // Simulate USCIS API call (in real implementation, this would be a backend call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in real implementation, this would come from USCIS API
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'USCIS Updates H-1B Registration Process for FY 2025',
          description: 'New changes to the H-1B lottery system including beneficiary-centric selection and updated filing procedures.',
          date: '2024-01-15',
          category: 'H-1B',
          priority: 'high',
          url: 'https://uscis.gov/h1b-updates'
        },
        {
          id: '2',
          title: 'Employment-Based Green Card Priority Dates Updated',
          description: 'Latest visa bulletin shows movement in EB-2 and EB-3 categories for India and China.',
          date: '2024-01-10',
          category: 'Green Card',
          priority: 'high'
        },
        {
          id: '3',
          title: 'New I-94 Electronic Records Available',
          description: 'USCIS has enhanced the I-94 electronic records system for better tracking of entries and exits.',
          date: '2024-01-08',
          category: 'General',
          priority: 'medium'
        },
        {
          id: '4',
          title: 'STEM OPT Extension Process Simplified',
          description: 'Streamlined application process for STEM students seeking Optional Practical Training extensions.',
          date: '2024-01-05',
          category: 'OPT',
          priority: 'medium'
        },
        {
          id: '5',
          title: 'Premium Processing Updates for I-140 Petitions',
          description: 'USCIS expands premium processing service for employment-based immigrant petitions.',
          date: '2024-01-03',
          category: 'I-140',
          priority: 'low'
        }
      ];

      setNews(mockNews);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch latest immigration news. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 border-red-500';
      case 'medium': return 'text-yellow-500 border-yellow-500';
      case 'low': return 'text-green-500 border-green-500';
      default: return 'text-gray-500 border-gray-500';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle className="w-4 h-4" />;
      case 'medium': return <TrendingUp className="w-4 h-4" />;
      case 'low': return <FileText className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const filteredNews = activeTab === 'latest' 
    ? news 
    : news.filter(item => item.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            Latest Immigration News & Updates
          </DialogTitle>
          <p className="text-muted-foreground">
            Stay informed with the latest USCIS updates and immigration policy changes
          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="h-1b">H-1B</TabsTrigger>
            <TabsTrigger value="green card">Green Card</TabsTrigger>
            <TabsTrigger value="opt">OPT</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2">Loading latest updates...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNews.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No updates available for this category.
                  </div>
                ) : (
                  filteredNews.map((item) => (
                    <Card key={item.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className={getPriorityColor(item.priority)}>
                                {getPriorityIcon(item.priority)}
                                <span className="ml-1 capitalize">{item.priority}</span>
                              </Badge>
                              <Badge variant="secondary">{item.category}</Badge>
                            </div>
                            <CardTitle className="text-lg leading-tight">
                              {item.title}
                            </CardTitle>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground ml-4">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(item.date).toLocaleDateString()}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        {item.url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Read Full Update
                            </a>
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-1" />
            Last updated: {new Date().toLocaleDateString()}
          </div>
          <Button onClick={fetchLatestNews} variant="outline" size="sm">
            Refresh Updates
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};