import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Users, FileSearch, Cloud, Shield, Zap, Code, Database, BarChart3 } from 'lucide-react';
import { ResumeReviewModal } from './ResumeReviewModal';

export const ServicesSection = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const services = [
    {
      icon: Brain,
      title: 'AI-Powered Talent Matching',
      description: 'Our advanced AI algorithms analyze resumes, job requirements, and cultural fit to find the perfect candidates.',
      features: ['Resume Analysis', 'Skill Assessment', 'Cultural Fit Analysis', 'Automated Screening'],
      category: 'AI Services'
    },
    {
      icon: FileSearch,
      title: 'Smart Resume Review',
      description: 'AI-driven resume analysis that provides detailed insights and recommendations for both candidates and employers.',
      features: ['Keyword Optimization', 'ATS Compatibility', 'Skills Gap Analysis', 'Career Recommendations'],
      category: 'AI Services'
    },
    {
      icon: Users,
      title: 'Talent Acquisition',
      description: 'End-to-end recruitment solutions from sourcing to onboarding with AI-enhanced processes.',
      features: ['Global Sourcing', 'Interview Coordination', 'Background Verification', 'Onboarding Support'],
      category: 'Recruitment'
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Comprehensive cloud migration, architecture, and optimization services for modern enterprises.',
      features: ['AWS/Azure Migration', 'DevOps Implementation', 'Cloud Security', 'Cost Optimization'],
      category: 'Technology'
    },
    {
      icon: Shield,
      title: 'Cybersecurity Services',
      description: 'Protect your organization with our comprehensive cybersecurity solutions and expert consultants.',
      features: ['Security Audits', 'Penetration Testing', 'Compliance Management', 'Incident Response'],
      category: 'Security'
    },
    {
      icon: Code,
      title: 'Software Development',
      description: 'Custom software solutions with cutting-edge technologies and agile methodologies.',
      features: ['Full-Stack Development', 'Mobile Applications', 'API Integration', 'Legacy Modernization'],
      category: 'Development'
    },
    {
      icon: Database,
      title: 'Data Analytics',
      description: 'Transform your data into actionable insights with our advanced analytics and AI capabilities.',
      features: ['Business Intelligence', 'Machine Learning', 'Data Visualization', 'Predictive Analytics'],
      category: 'Analytics'
    },
    {
      icon: BarChart3,
      title: 'Immigration Support',
      description: 'Complete immigration assistance for international talent placement and visa processing.',
      features: ['H1B Processing', 'Green Card Support', 'Visa Documentation', 'Legal Compliance'],
      category: 'Immigration'
    }
  ];

  const categories = ['All', 'AI Services', 'Recruitment', 'Technology', 'Security', 'Development', 'Analytics', 'Immigration'];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-space font-bold mb-6">
            <span className="text-gradient">AI-Powered</span> Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive IT consulting and recruitment solutions enhanced by artificial intelligence
            to deliver exceptional results for businesses and professionals.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant="outline" 
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-2 hover:border-primary/20">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-muted-foreground">
                        <Zap className="w-3 h-3 mr-2 text-accent" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Resume Review CTA */}
        <div className="text-center">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-primary to-accent rounded-full">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              AI-Powered Resume Review
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              Upload your resume and get instant AI analysis with personalized recommendations, 
              ATS optimization tips, and industry-specific insights to boost your career prospects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="gradient" 
                size="lg" 
                className="group"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FileSearch className="w-5 h-5 mr-2" />
                Get AI Resume Review
              </Button>
              <Button variant="outline" size="lg">
                Learn More About Our AI
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Review Modal */}
      <ResumeReviewModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </section>
  );
};