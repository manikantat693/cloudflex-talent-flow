import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, Users, Clock, DollarSign, Target, Award,
  Building2, Smartphone, Globe, Shield, Code, Database
} from 'lucide-react';

interface CaseStudiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudiesModal = ({ isOpen, onClose }: CaseStudiesModalProps) => {
  const caseStudies = [
    {
      id: 'fintech',
      title: 'FinTech Startup Scaling',
      client: 'PayFlow Technologies',
      industry: 'Financial Services',
      icon: Building2,
      challenge: 'A rapidly growing fintech startup needed to scale their engineering team from 15 to 75 developers within 8 months while maintaining code quality and company culture.',
      solution: 'Implemented a comprehensive recruitment strategy combining AI-powered screening, technical assessments, and cultural fit evaluations. Created a structured onboarding program and mentorship system.',
      results: [
        { metric: 'Team Growth', value: '400%', description: 'From 15 to 75 developers' },
        { metric: 'Time to Hire', value: '18 days', description: 'Average from application to offer' },
        { metric: 'Retention Rate', value: '96%', description: 'After 12 months' },
        { metric: 'Cultural Fit Score', value: '9.2/10', description: 'Based on team feedback' }
      ],
      technologies: ['React', 'Node.js', 'Python', 'AWS', 'Kubernetes'],
      timeline: '8 months',
      testimonial: "CloudFlex didn't just help us hire developers, they helped us build a world-class engineering culture. Their understanding of both technical skills and cultural fit was exceptional.",
      testimonialAuthor: 'Sarah Chen, CTO at PayFlow Technologies'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Platform Migration',
      client: 'ShopGlobal Inc.',
      industry: 'E-commerce',
      icon: Smartphone,
      challenge: 'A large e-commerce platform was struggling with legacy infrastructure causing frequent outages during peak sales periods, resulting in millions in lost revenue.',
      solution: 'Complete cloud migration to AWS with microservices architecture, implementation of auto-scaling, CDN optimization, and 24/7 monitoring. Also recruited specialized DevOps and cloud engineers.',
      results: [
        { metric: 'Uptime Improvement', value: '99.99%', description: 'From 97.5% to 99.99%' },
        { metric: 'Cost Reduction', value: '45%', description: 'Infrastructure costs' },
        { metric: 'Page Load Speed', value: '3x faster', description: 'Average load time improvement' },
        { metric: 'Revenue Recovery', value: '$12M', description: 'Prevented losses during Black Friday' }
      ],
      technologies: ['AWS', 'Docker', 'Kubernetes', 'Redis', 'MongoDB'],
      timeline: '6 months',
      testimonial: "The migration was seamless, and our Black Friday was our most successful ever. CloudFlex's team worked around the clock to ensure everything went perfectly.",
      testimonialAuthor: 'Michael Rodriguez, VP Engineering at ShopGlobal'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Data Security',
      client: 'MedSecure Networks',
      industry: 'Healthcare',
      icon: Shield,
      challenge: 'A healthcare data management company needed to achieve HIPAA compliance and SOC 2 certification while scaling their security team and implementing robust data protection measures.',
      solution: 'Comprehensive security audit, implementation of zero-trust architecture, encryption protocols, and recruitment of specialized cybersecurity professionals. Created incident response procedures and staff training programs.',
      results: [
        { metric: 'Compliance Achievement', value: '100%', description: 'HIPAA & SOC 2 certified' },
        { metric: 'Security Incidents', value: '0', description: 'Zero breaches post-implementation' },
        { metric: 'Team Growth', value: '200%', description: 'Security team expansion' },
        { metric: 'Audit Score', value: '98%', description: 'Independent security assessment' }
      ],
      technologies: ['Azure', 'Security Tools', 'Encryption', 'Monitoring', 'Compliance'],
      timeline: '12 months',
      testimonial: "CloudFlex transformed our security posture completely. We went from being concerned about compliance to being industry leaders in healthcare data security.",
      testimonialAuthor: 'Dr. Patricia Williams, CISO at MedSecure Networks'
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Award className="w-6 h-6 text-accent" />
            Success Stories & Case Studies
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="fintech" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {caseStudies.map((study) => {
              const Icon = study.icon;
              return (
                <TabsTrigger key={study.id} value={study.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{study.industry}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {caseStudies.map((study) => {
            const Icon = study.icon;
            return (
              <TabsContent key={study.id} value={study.id} className="space-y-6">
                {/* Header */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{study.title}</h3>
                      <p className="text-muted-foreground">{study.client}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="mb-4">{study.industry}</Badge>
                </div>

                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <Target className="w-5 h-5" />
                        Challenge
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-blue-600">
                        <Code className="w-5 h-5" />
                        Solution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{study.solution}</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Results Grid */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Key Results
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {study.results.map((result, index) => (
                      <Card key={index} className="text-center">
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {result.value}
                          </div>
                          <div className="font-medium text-sm mb-1">
                            {result.metric}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result.description}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Technologies & Timeline */}
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="w-5 h-5" />
                        Technologies Used
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {study.technologies.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Project Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary">
                        {study.timeline}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        From initiation to completion
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Testimonial */}
                <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
                  <CardContent className="p-6">
                    <blockquote className="text-lg italic mb-4">
                      "{study.testimonial}"
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold">{study.testimonialAuthor}</div>
                        <div className="text-sm text-muted-foreground">{study.client}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <Button variant="gradient" size="lg" className="flex-1">
            <DollarSign className="w-4 h-4 mr-2" />
            Start Your Success Story
          </Button>
          <Button variant="outline" size="lg" className="flex-1">
            <Globe className="w-4 h-4 mr-2" />
            View More Case Studies
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};