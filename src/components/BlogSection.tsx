import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User } from 'lucide-react';

export const BlogSection = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-card to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Latest Insights
            </Badge>
            <h2 className="text-3xl md:text-4xl font-space font-bold mb-6">
              Understanding <span className="text-gradient">CloudFlex</span> Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover how our AI-driven platform revolutionizes IT staffing and talent acquisition
            </p>
          </div>

          {/* Blog Post */}
          <Card className="glass-card hover-glow mb-8">
            <CardHeader>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>January 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>CloudFlex Team</span>
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-4">
                What is CloudFlex Talent Flow?
              </CardTitle>
              <CardDescription className="text-lg">
                Understanding how AI-based hiring platforms are transforming tech staffing automation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  <strong>CloudFlex Talent Flow</strong> represents the next generation of IT staffing solutions, 
                  combining artificial intelligence with deep industry expertise to create seamless connections 
                  between top-tier technology professionals and leading companies.
                </p>
                
                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  The Power of AI-Based Hiring Platforms
                </h3>
                <p>
                  Our <strong>AI-based hiring platform</strong> utilizes advanced machine learning algorithms to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analyze candidate profiles and match them with optimal job opportunities</li>
                  <li>Predict hiring success rates based on historical data and performance metrics</li>
                  <li>Streamline the recruitment process through intelligent automation</li>
                  <li>Reduce time-to-hire by up to 60% compared to traditional methods</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  Tech Staffing Automation Revolution
                </h3>
                <p>
                  <strong>Tech staffing automation</strong> through CloudFlexIT eliminates manual bottlenecks 
                  and human bias from the recruitment process. Our platform automatically:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sources and screens candidates from multiple channels</li>
                  <li>Conducts preliminary technical assessments</li>
                  <li>Schedules interviews and manages candidate communications</li>
                  <li>Provides real-time analytics and hiring insights</li>
                </ul>

                <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
                  Why Choose CloudFlex for Your Talent Needs?
                </h3>
                <p>
                  CloudFlex combines the efficiency of automation with the personal touch of experienced 
                  recruiters. Our hybrid approach ensures that while technology handles the heavy lifting, 
                  human expertise guides strategic decisions and relationship building.
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-8">
                  <h4 className="font-semibold text-foreground mb-3">Ready to Experience CloudFlex Talent Flow?</h4>
                  <p className="text-sm mb-4">
                    Join hundreds of companies that have transformed their hiring process with our AI-driven platform.
                  </p>
                  <Button onClick={scrollToContact} className="group">
                    Get Started Today
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-6 border-t">
                <Badge variant="secondary">cloudflexit</Badge>
                <Badge variant="secondary">AI hiring</Badge>
                <Badge variant="secondary">tech staffing</Badge>
                <Badge variant="secondary">automation</Badge>
                <Badge variant="secondary">talent flow</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};