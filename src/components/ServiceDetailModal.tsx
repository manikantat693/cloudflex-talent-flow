import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, Users, FileSearch, Cloud, Shield, Code, Database, BarChart3,
  CheckCircle, Star, ArrowRight, Zap, Target, Clock, Award
} from 'lucide-react';
import { ContactFormModal } from './ContactFormModal';
import { ImmigrationNewsModal } from './ImmigrationNewsModal';
import { AITrainingModal } from './AITrainingModal';

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const ServiceDetailModal = ({ isOpen, onClose, category }: ServiceDetailModalProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactType, setContactType] = useState<'get-started' | 'consultation'>('get-started');
  const [immigrationNewsOpen, setImmigrationNewsOpen] = useState(false);
  const [aiTrainingOpen, setAiTrainingOpen] = useState(false);

  const serviceDetails = {
    'AI Services': {
      icon: Brain,
      title: 'AI-Powered Solutions',
      description: 'Cutting-edge artificial intelligence services that transform how you hire and manage talent.',
      color: 'text-blue-500',
      services: [
        {
          name: 'AI Talent Matching',
          description: 'Advanced algorithms match candidates to roles with 95% accuracy',
          features: ['Resume Analysis', 'Skill Assessment', 'Cultural Fit Prediction', 'Automated Screening'],
          price: 'Starting at $299/month'
        },
        {
          name: 'Smart Resume Review',
          description: 'AI-driven resume optimization and analysis',
          features: ['ATS Optimization', 'Keyword Enhancement', 'Skills Gap Analysis', 'Career Recommendations'],
          price: 'Starting at $49/review'
        }
      ],
      benefits: ['90% faster candidate screening', '85% improvement in hire quality', '60% reduction in time-to-hire'],
      caseStudy: {
        client: 'Tech Startup Inc.',
        challenge: 'Needed to hire 50 developers in 3 months',
        solution: 'Implemented AI talent matching system',
        result: '48 hires completed in 2.5 months with 95% retention rate'
      }
    },
    'Recruitment': {
      icon: Users,
      title: 'End-to-End Recruitment',
      description: 'Comprehensive recruitment solutions from sourcing to onboarding.',
      color: 'text-green-500',
      services: [
        {
          name: 'Executive Search',
          description: 'High-level executive placement with guaranteed results',
          features: ['C-Level Placement', 'Board Advisory', 'Leadership Assessment', 'Succession Planning'],
          price: 'Custom pricing'
        },
        {
          name: 'Volume Hiring',
          description: 'Scalable hiring solutions for large teams',
          features: ['Mass Recruitment', 'Campus Hiring', 'Contract Staffing', 'RPO Services'],
          price: 'Starting at $2,500/hire'
        }
      ],
      benefits: ['50+ enterprise clients', '98% placement success rate', '30-day replacement guarantee'],
      caseStudy: {
        client: 'Fortune 500 Company',
        challenge: 'Scale development team from 10 to 100 engineers',
        solution: 'Custom recruitment pipeline with AI screening',
        result: '90 engineers hired in 6 months, 95% still with company'
      }
    },
    'Technology': {
      icon: Cloud,
      title: 'Cloud & Technology Solutions',
      description: 'Modern cloud infrastructure and technology consulting services.',
      color: 'text-purple-500',
      services: [
        {
          name: 'Cloud Migration',
          description: 'Seamless migration to AWS, Azure, or Google Cloud',
          features: ['Migration Planning', 'Security Implementation', 'Cost Optimization', '24/7 Support'],
          price: 'Starting at $25,000'
        },
        {
          name: 'DevOps Implementation',
          description: 'Complete DevOps transformation and automation',
          features: ['CI/CD Pipelines', 'Infrastructure as Code', 'Monitoring & Alerting', 'Team Training'],
          price: 'Starting at $15,000'
        }
      ],
      benefits: ['70% reduction in deployment time', '50% cost savings on infrastructure', '99.9% uptime guarantee'],
      caseStudy: {
        client: 'E-commerce Platform',
        challenge: 'Legacy infrastructure causing frequent downtime',
        solution: 'Complete cloud migration and DevOps implementation',
        result: '99.99% uptime achieved, 40% cost reduction'
      }
    },
    'Security': {
      icon: Shield,
      title: 'Cybersecurity Services',
      description: 'Comprehensive security solutions to protect your digital assets.',
      color: 'text-red-500',
      services: [
        {
          name: 'Security Assessment',
          description: 'Complete security audit and vulnerability assessment',
          features: ['Penetration Testing', 'Vulnerability Scanning', 'Compliance Review', 'Risk Assessment'],
          price: 'Starting at $5,000'
        },
        {
          name: 'Security Consulting',
          description: 'Ongoing security consulting and monitoring',
          features: ['24/7 SOC', 'Incident Response', 'Security Training', 'Policy Development'],
          price: 'Starting at $3,000/month'
        }
      ],
      benefits: ['ISO 27001 certified team', '24/7 incident response', 'Zero successful breaches for clients'],
      caseStudy: {
        client: 'Financial Services Firm',
        challenge: 'Required SOC 2 compliance and enhanced security',
        solution: 'Complete security overhaul and ongoing monitoring',
        result: 'SOC 2 certification achieved, zero security incidents'
      }
    },
    'Development': {
      icon: Code,
      title: 'Software Development',
      description: 'Custom software solutions with modern technologies and best practices.',
      color: 'text-cyan-500',
      services: [
        {
          name: 'Full-Stack Development',
          description: 'End-to-end web and mobile application development',
          features: ['React/Node.js', 'Mobile Apps', 'API Development', 'Database Design'],
          price: 'Starting at $100/hour'
        },
        {
          name: 'Legacy Modernization',
          description: 'Transform legacy systems to modern architectures',
          features: ['Code Migration', 'Architecture Redesign', 'Performance Optimization', 'Cloud Integration'],
          price: 'Custom pricing'
        }
      ],
      benefits: ['Agile methodology', '100+ successful projects', '6-month warranty on all work'],
      caseStudy: {
        client: 'Healthcare Provider',
        challenge: 'Modernize 20-year-old patient management system',
        solution: 'Complete system rewrite with modern stack',
        result: '300% performance improvement, improved user satisfaction'
      }
    },
    'Analytics': {
      icon: Database,
      title: 'Data Analytics & BI',
      description: 'Transform your data into actionable business insights.',
      color: 'text-orange-500',
      services: [
        {
          name: 'Business Intelligence',
          description: 'Comprehensive BI solutions and dashboard development',
          features: ['Data Warehousing', 'ETL Processes', 'Interactive Dashboards', 'Real-time Analytics'],
          price: 'Starting at $20,000'
        },
        {
          name: 'Machine Learning',
          description: 'Custom ML models for predictive analytics',
          features: ['Predictive Modeling', 'Natural Language Processing', 'Computer Vision', 'MLOps'],
          price: 'Starting at $30,000'
        }
      ],
      benefits: ['500% ROI on average', 'Real-time insights', 'Scalable solutions'],
      caseStudy: {
        client: 'Retail Chain',
        challenge: 'Optimize inventory and predict customer behavior',
        solution: 'ML-powered analytics platform',
        result: '25% reduction in inventory costs, 15% increase in sales'
      }
    },
    'Immigration': {
      icon: BarChart3,
      title: 'Immigration Support',
      description: 'Complete immigration assistance for international professionals.',
      color: 'text-indigo-500',
      services: [
        {
          name: 'H1B Processing',
          description: 'Complete H1B visa application and processing support',
          features: ['Document Preparation', 'Legal Consultation', 'Application Filing', 'Status Tracking'],
          price: 'Starting at $2,500'
        },
        {
          name: 'Green Card Support',
          description: 'Permanent residency application assistance',
          features: ['EB-1/EB-2/EB-3 Processing', 'Priority Date Tracking', 'Document Review', 'Interview Prep'],
          price: 'Starting at $5,000'
        }
      ],
      benefits: ['95% approval rate', 'Experienced immigration attorneys', 'End-to-end support'],
      caseStudy: {
        client: 'Software Engineer from India',
        challenge: 'H1B to Green Card transition',
        solution: 'Complete immigration strategy and execution',
        result: 'Green Card approved in 18 months'
      }
    },
    'AI Training': {
      icon: Zap,
      title: 'AI Training & Certification',
      description: 'Comprehensive AI training programs for future-ready professionals.',
      color: 'text-violet-500',
      services: [
        {
          name: 'LangChain Mastery Program',
          description: 'Complete LangChain training with hands-on projects',
          features: ['LangChain Fundamentals', 'Advanced Chains', 'Agent Development', 'Production Deployment'],
          price: 'Starting at $299'
        },
        {
          name: 'OpenAI API Certification',
          description: 'Master OpenAI APIs and GPT integration',
          features: ['API Integration', 'Fine-tuning', 'Function Calling', 'Best Practices'],
          price: 'Starting at $199'
        }
      ],
      benefits: ['Industry-recognized certification', 'Hands-on learning with real projects', 'Job placement assistance'],
      caseStudy: {
        client: 'Software Developer',
        challenge: 'Transition from traditional development to AI engineering',
        solution: 'Complete AI training bootcamp with mentorship',
        result: 'Landed AI Engineer role with 40% salary increase'
      }
    }
  };

  const currentService = serviceDetails[category as keyof typeof serviceDetails];

  if (!currentService) return null;

  const Icon = currentService.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon className={`w-6 h-6 ${currentService.color}`} />
            </div>
            {currentService.title}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="case-study">Case Study</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="text-center">
              <p className="text-lg text-muted-foreground mb-6">
                {currentService.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Target className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold">Targeted Solutions</h4>
                    <p className="text-sm text-muted-foreground">Customized for your needs</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h4 className="font-semibold">Fast Delivery</h4>
                    <p className="text-sm text-muted-foreground">Quick turnaround time</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold">Quality Assured</h4>
                    <p className="text-sm text-muted-foreground">100% satisfaction guarantee</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid gap-6">
              {currentService.services.map((service, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{service.name}</CardTitle>
                        <p className="text-muted-foreground mt-2">{service.description}</p>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary">
                        {service.price}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-6">
            <div className="space-y-4">
              {currentService.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg">
                  <Star className="w-5 h-5 text-accent" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4">Client Satisfaction</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Satisfaction</span>
                  <span>98%</span>
                </div>
                <Progress value={98} className="h-2" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="case-study" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Success Story: {currentService.caseStudy.client}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h5 className="font-semibold text-red-600 mb-2">Challenge</h5>
                  <p className="text-muted-foreground">{currentService.caseStudy.challenge}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-blue-600 mb-2">Solution</h5>
                  <p className="text-muted-foreground">{currentService.caseStudy.solution}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-green-600 mb-2">Result</h5>
                  <p className="text-muted-foreground">{currentService.caseStudy.result}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
          <Button 
            variant="gradient" 
            size="lg" 
            className="flex-1"
            onClick={() => {
              if (category === 'Immigration') {
                setImmigrationNewsOpen(true);
              } else if (category === 'AI Training') {
                setAiTrainingOpen(true);
              } else {
                setContactType('get-started');
                setContactModalOpen(true);
              }
            }}
          >
            <Zap className="w-4 h-4 mr-2" />
            {category === 'Immigration' ? 'View Latest News' : 
             category === 'AI Training' ? 'Start Learning' : 'Get Started Today'}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="flex-1"
            onClick={() => {
              setContactType('consultation');
              setContactModalOpen(true);
            }}
          >
            Schedule Consultation
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Contact Form Modal */}
        <ContactFormModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          type={contactType}
        />

        {/* Immigration News Modal */}
        <ImmigrationNewsModal
          isOpen={immigrationNewsOpen}
          onClose={() => setImmigrationNewsOpen(false)}
        />

        {/* AI Training Modal */}
        <AITrainingModal
          isOpen={aiTrainingOpen}
          onClose={() => setAiTrainingOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};