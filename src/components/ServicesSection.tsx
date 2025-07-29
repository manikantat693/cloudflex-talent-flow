import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, Users, FileSearch, Cloud, Shield, Zap, Code, Database, BarChart3, Eye } from 'lucide-react';
import { ResumeReviewModal } from './ResumeReviewModal';
import { ServiceDetailModal } from './ServiceDetailModal';

export const ServicesSection = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [activeServiceCategory, setActiveServiceCategory] = useState<string>('');
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

  const filteredServices = selectedCategory === 'All' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const handleCategoryClick = (category: string) => {
    if (category === 'All') {
      setSelectedCategory(category);
    } else {
      setActiveServiceCategory(category);
      setServiceModalOpen(true);
    }
  };

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
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => (
            <Badge 
              key={category} 
              variant={selectedCategory === category ? "default" : "outline"}
              className="px-3 sm:px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs sm:text-sm"
              onClick={() => {
                if (category === 'All') {
                  setSelectedCategory(category);
                } else {
                  handleCategoryClick(category);
                }
              }}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 sm:p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-xs text-muted-foreground">
                        <Zap className="w-3 h-3 mr-2 text-accent flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs"
                    onClick={() => {
                      setActiveServiceCategory(service.category);
                      setServiceModalOpen(true);
                    }}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Process to Industries CTA */}
        <div className="text-center">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-primary to-accent rounded-full">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Our Process-Driven Approach
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              We follow a systematic process to deliver exceptional results across multiple industries. 
              Discover how our expertise spans various sectors to meet your specific business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                variant="gradient" 
                size="lg" 
                className="group text-sm sm:text-base"
                onClick={() => {
                  const industriesSection = document.getElementById('industries');
                  industriesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Explore Industries We Serve</span>
                <span className="sm:hidden">Explore Industries</span>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-sm sm:text-base"
                onClick={() => setIsResumeModalOpen(true)}
              >
                <FileSearch className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Get AI Resume Review</span>
                <span className="sm:hidden">AI Resume Review</span>
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

      {/* Service Detail Modal */}
      <ServiceDetailModal
        isOpen={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        category={activeServiceCategory}
      />
    </section>
  );
};